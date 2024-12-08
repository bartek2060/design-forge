export const baseColors = {
    primary: "#3b82f6",
    secondary: "#6b7280",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
} as const;

export const lightTheme = {
    bg: {
        base: "#ffffff",
        muted: "#f3f4f6",
        // 100, 200, 300, etc.
        ...baseColors,
    },
    text: {
        base: "#000000",
        muted: "#6b7280",
    },
} as const;

export const darkTheme = {
    bg: {
        base: "#18181b",
        muted: "#27272a",
        ...baseColors,
    },
    text: {
        base: "#ffffff",
        muted: "#a1a1aa",
    },
} as const;
