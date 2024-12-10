import type { BreakpointObject, BreakpointProp, DesignTokens } from "@/@design/build/types";

interface ResponsiveClassesOptions {
    includeBase?: boolean;
    cssModule?: { [key: string]: string };
}

export function getResponsiveClasses<T extends string | number>(
    responsiveProp: BreakpointProp<T>,
    classGenerator: (value: T) => string,
    options: ResponsiveClassesOptions = {},
): string {
    const { includeBase = true, cssModule } = options;

    const breakpointObject = ensureBreakpointObject(responsiveProp);

    const classes: string[] = [];

    if (includeBase && breakpointObject.base) {
        const baseClass = classGenerator(breakpointObject.base);
        classes.push(cssModule ? cssModule[baseClass] || baseClass : baseClass);
    }

    // Get breakpoint keys excluding 'base'
    const breakpoints = Object.keys(breakpointObject).filter((key): key is DesignTokens["breakpoint"] => key !== "base");

    breakpoints.forEach((breakpoint) => {
        const value = breakpointObject[breakpoint];
        if (value) {
            const generatedClass = classGenerator(value);
            const classWithBreakpoint = `${breakpoint}:${generatedClass}`;
            const processedClass = (cssModule ? cssModule[classWithBreakpoint] : undefined) || classWithBreakpoint;
            classes.push(processedClass);
        }
    });

    return classes.filter(Boolean).join(" ");
}

export function ensureBreakpointObject<T>(value: BreakpointProp<T>): BreakpointObject<T> {
    if (typeof value === "object" && value !== null && "base" in value) {
        return value;
    }

    return {
        base: value,
    };
}
