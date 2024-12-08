type LogType = "info" | "success" | "warn" | "error" | "debug";

const ICONS: Record<LogType, string> = {
    info: "ℹ️ ",
    success: "✅",
    warn: "🚨",
    error: "❌",
    debug: "🤖",
} as const;

type LogFunction = (...messages: LogMessage) => void;
const LOG_METHODS: Record<LogType, LogFunction> = {
    info: console.info,
    success: console.log,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
} as const;

let lastLogType: LogType | null = null;

type LogMessage = any[];
const createLogMessage = (type: LogType, messages: LogMessage) => {
    // Process messages to handle Error objects
    const processedMessages = messages.map((msg) => {
        if (msg instanceof Error) {
            // If in debug mode and it's an error, include the stack trace
            if (process.env.DEBUG && msg.stack) {
                return msg.stack;
            }
            return msg.message;
        }
        return msg;
    });

    // Add spacing if transitioning from debug
    if (lastLogType === "debug") {
        console.debug("");
    }

    // Special handling for debug messages
    if (type === "debug") {
        if (lastLogType !== "debug") {
            console.debug(`\n${ICONS.debug} Debug:`);
        }
        console.debug(...processedMessages);
        lastLogType = "debug";
        return;
    }

    // Standard logging
    lastLogType = type;
    const icon = ICONS[type];
    const logMethod = LOG_METHODS[type];
    logMethod(icon, ...processedMessages);
};

const underline = (text: string) => `\x1b[4m${text}\x1b[0m`;

// Add color codes
const COLORS = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    reset: "\x1b[0m",
} as const;

// Create color utility functions
const createColorFunction = (colorCode: string) => (text?: any) => (text ? `${colorCode}${String(text)}${COLORS.reset}` : "");

const color = {
    black: createColorFunction(COLORS.black),
    red: createColorFunction(COLORS.red),
    green: createColorFunction(COLORS.green),
    yellow: createColorFunction(COLORS.yellow),
    blue: createColorFunction(COLORS.blue),
    magenta: createColorFunction(COLORS.magenta),
    cyan: createColorFunction(COLORS.cyan),
    white: createColorFunction(COLORS.white),
};

// Update Logger type to include color
type Logger = Record<LogType, LogFunction> & {
    underline: (text: string) => string;
    color: typeof color;
};

export const logger: Logger = {
    info: (...messages) => createLogMessage("info", messages),
    success: (...messages) => createLogMessage("success", messages),
    warn: (...messages) => createLogMessage("warn", messages),
    error: (...messages) => createLogMessage("error", messages),
    debug: (...messages) => (process.env.DEBUG ? createLogMessage("debug", messages) : undefined),
    underline,
    color,
};
