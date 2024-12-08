import type { UtilityCreatorFunction, UtilityPropertyConfig } from "../../../../types";

import UtilityConfig from "../../../UtilityConfig";

import { logger } from "../../../../utils/logger";

import { THEME_PRESET_PROPERTIES } from "../constants";

function isThemePresetKey(key: string): key is keyof typeof THEME_PRESET_PROPERTIES {
    return key in THEME_PRESET_PROPERTIES;
}

const createThemeUtilities: UtilityCreatorFunction<"theme"> = (utilityGenInput, tokens) => {
    const themeConfig = tokens.themes;
    if (!themeConfig) {
        logger.warn("No theme token found, skipping theme utilities");
        return {};
    }
    const toReturn: Record<string, UtilityConfig> = {};

    const themeConfigTokens = themeConfig.themeTokens;
    for (const [key, token] of Object.entries(themeConfigTokens)) {
        let utilityProperties: UtilityPropertyConfig | undefined = utilityGenInput?.custom?.[key];

        if (key === "themes") {
            // Ignore "themes" key
            continue;
        }

        if (isThemePresetKey(key)) {
            const configValue = utilityGenInput?.presets?.[key];

            if (configValue === false) {
                // specifically turned off
                continue;
            }

            const isDefault = !configValue || configValue === true;
            utilityProperties = isDefault ? THEME_PRESET_PROPERTIES[key] : configValue;
        }

        if (!utilityProperties) {
            logger.warn(`No utility config or property found for theme utility '${key}', skipping`);
            continue;
        }

        toReturn[key] = new UtilityConfig({
            className: key,
            values: {
                ...token.flatValues,
            },
            properties: utilityProperties,
        });
    }

    return toReturn;
};

export default createThemeUtilities;
