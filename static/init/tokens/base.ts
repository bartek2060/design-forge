import { TokenConfig } from "@mogielski/design-forge";

// Spacing
const spacingBase = 0.5; // rem
function getSpacing(value: number) {
    return `${value * spacingBase}rem`;
}
export const spacing = {
    "0-5": getSpacing(0.5),
    "0-75": getSpacing(0.75),
    "1": getSpacing(1),
    "1-5": getSpacing(1.5),
    "2": getSpacing(2),
    "3": getSpacing(3),
    "4": getSpacing(4),
    "5": getSpacing(5),
    "6": getSpacing(6),
    "8": getSpacing(8),
    "10": getSpacing(10),
    "12": getSpacing(12),
    "14": getSpacing(14),
    "16": getSpacing(16),
} as const;

// Breakpoints
export const breakpoints = {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1400px",
} as const;

// Typography
export const typography = {
    fontFamily: {
        main: "system-ui, sans-serif",
        mono: "monospace",
    },
    fontSizes: {
        xs: "clamp(0.65rem, 0.6rem + 0.25vw, 0.75rem)",
        sm: "clamp(0.75rem, 0.7rem + 0.25vw, 0.85rem)",
        base: "clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem)",
        lg: "clamp(1.15rem, 1.1rem + 0.25vw, 1.25rem)",
        xl: "clamp(1.35rem, 1.3rem + 0.25vw, 1.45rem)",
        "2xl": "clamp(1.7rem, 1.6rem + 0.5vw, 1.9rem)",
        "3xl": "clamp(2.1rem, 1.9rem + 1vw, 2.3rem)",
        "4xl": "clamp(2.7rem, 2.5rem + 1vw, 3.1rem)",
        "5xl": "clamp(3.25rem, 3rem + 1.5vw, 3.5rem)",
    },
} as const;

// Custom tokens
export const borders = {
    width: new TokenConfig({
        name: "border-width",
        values: {
            base: "1.25px",
        },
    }),
    radius: new TokenConfig({
        name: "border-radius",
        values: {
            xs: "0.2rem",
            sm: "0.4rem",
            base: "0.85rem",
            lg: "0.3rem",
            pill: "9999px",
        },
    }),
};

export const effects = {
    transition: new TokenConfig(
        {
            name: "transition",
            values: {
                speed: "150ms",
                easing: "ease-in-out",
                base: "all 150ms ease-in-out",
            },
        },
        {
            scssMap: false,
        },
    ),
};
