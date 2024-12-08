import type { DesignTokens, UtilityGeneratorInput, DesignUtilities } from "../../../../types";

import createSpacingUtilities from "./spacing";
import createTypographyUtilities from "./typography";
import createLayoutUtilities from "./layout";
import createThemeUtilities from "./theme";

export function createPresetUtilities(config: UtilityGeneratorInput, tokens: DesignTokens): DesignUtilities {
    return {
        spacing: createSpacingUtilities(config.spacing ?? {}, tokens),
        typography: createTypographyUtilities(config.typography ?? {}, tokens),
        layout: createLayoutUtilities(config.layout ?? {}, tokens),
        theme: createThemeUtilities(config.theme ?? {}, tokens),
        custom: config.custom,
    };
}
