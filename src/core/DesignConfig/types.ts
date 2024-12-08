import type { NestedRecord, Themes, ThemeTokens, UtilityPropertyConfig } from "../../types";

import TokenConfig from "../TokenConfig";
import ThemeConfig from "../ThemeConfig";
import UtilityConfig from "../UtilityConfig";
import { THEME_PRESET_PROPERTIES } from "./presets/constants";

export * from "./presets/utility/types";

export interface DesignTokenStructure<TDefault, TThemeValue = TDefault, TCustomValue = NestedRecord<TDefault>> {
    spacing?: TDefault;
    breakpoint?: TDefault;
    baseColors?: TDefault;
    typography?: {
        fontFamily?: TDefault;
        fontWeight?: TDefault;
        fontSizes?: TDefault;
    };

    themes?: TThemeValue;

    custom?: TCustomValue;
}

// After initial creation of the design/utility config.
// What we actually build.
export type DesignTokens = DesignTokenStructure<TokenConfig, ThemeConfig, NestedRecord<TokenConfig>>;

export interface DesignUtilities {
    spacing?: {
        margin?: Record<string, UtilityConfig>;
        padding?: Record<string, UtilityConfig>;
        gap?: Record<string, UtilityConfig>;
    };
    typography?: {
        fontSize?: UtilityConfig;
        fontWeight?: UtilityConfig;
        fontFamily?: UtilityConfig;
        textAlignment?: UtilityConfig;
    };
    layout?: {
        display?: UtilityConfig;
        position?: UtilityConfig;
        zIndex?: UtilityConfig;
        flex?: Record<string, UtilityConfig>;
        alignment?: Record<string, UtilityConfig>;
        sizing?: Record<string, UtilityConfig>;
    };
    theme?: {
        [K in keyof ThemeTokens]?: UtilityConfig;
    };
    custom?: NestedRecord<UtilityConfig>;
}

// What the user provides to the design config to configure the utilities.
export type TokenGeneratorInput = DesignTokenStructure<TokenConfig["values"], Themes, NestedRecord<TokenConfig>>;

export interface UtilityGeneratorInput {
    spacing?: {
        margin?: boolean;
        padding?: boolean;
        gap?: boolean;
    };
    typography?: {
        fontSize?: boolean;
        fontWeight?: boolean;
        fontFamily?: boolean;
        textAlignment?: boolean;
    };
    layout?: {
        display?: boolean;
        position?: boolean;
        zIndex?: boolean;
        flex?: boolean;
        alignment?: boolean;
        sizing?: boolean;
    };

    theme?: {
        presets?: {
            [K in keyof typeof THEME_PRESET_PROPERTIES]?: boolean;
        };
        custom?: Partial<{
            [key: string]: UtilityPropertyConfig;
        }>;
    };

    custom?: NestedRecord<UtilityConfig>;
}

export interface DesignConfigInput {
    tokens: TokenGeneratorInput;
    utilities?: UtilityGeneratorInput;
}
