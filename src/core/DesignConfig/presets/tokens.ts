import { logger } from "../../../utils/logger";
import ThemeConfig from "../../ThemeConfig";
import TokenConfig from "../../TokenConfig";
import type { DesignTokens, DesignConfigInput } from "../types";

export function createPresetTokens(tokens: DesignConfigInput["tokens"]): DesignTokens {
    return {
        spacing: spacingToken(tokens.spacing),
        breakpoint: breakpointToken(tokens.breakpoint),
        baseColors: basicToken("base-color", tokens.baseColors),
        typography: {
            fontFamily: basicToken("font-family", tokens.typography?.fontFamily),
            fontSizes: basicToken("font-size", tokens.typography?.fontSizes),
            fontWeight: fontWeight(),
        },
        themes: tokens.themes ? new ThemeConfig(tokens.themes) : undefined,

        custom: tokens.custom,
    };
}

function spacingToken(values?: TokenConfig["values"]) {
    if (!values) {
        logger.warn("Spacing token is not defined.");
        return undefined;
    }

    return new TokenConfig(
        {
            name: "spacing",
            values,
        },
        {
            cssVariable: true,
        },
    );
}

function breakpointToken(values?: TokenConfig["values"]) {
    if (!values) {
        logger.warn("Breakpoint token is not defined.");
        return undefined;
    }

    return new TokenConfig(
        {
            name: "breakpoint",
            values,
        },
        {},
    );
}

function basicToken(name: string, values?: TokenConfig["values"]) {
    if (!values) {
        logger.warn(`[${name}] Attempting to create a basic token without values.`);
        return undefined;
    }

    return new TokenConfig({
        name,
        values,
    });
}

function fontWeight() {
    return new TokenConfig({
        name: "font-weight",
        values: {
            light: "300",
            regular: "400",
            medium: "500",
            semibold: "600",
            bold: "700",
        },
    });
}
