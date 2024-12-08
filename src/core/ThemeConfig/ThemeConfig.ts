import type { Themes } from "./types";
import { isBuildable, type Buildable, type BuildDefinition, type NestedRecord } from "../../types";

import TokenConfig from "../TokenConfig";

import { logger } from "../../utils/logger";
import deepMerge from "../utils/deepMerge";
import { generateCssVariableName } from "../utils/generators/scss";
import buildCollection from "../utils/buildCollection";
import deepExtract from "../utils/deepExtract";

export default class ThemeConfig implements Buildable {
    readonly themes: Themes;
    readonly themeTokens: Record<string, TokenConfig>;

    constructor(config: Themes) {
        this.themes = config;
        this.themeTokens = this.getThemeTokens();
    }

    build(): BuildDefinition {
        logger.info("Turning theme values into tokens...");
        logger.debug("Themes", this.themes);

        const tokenConfigs: TokenConfig[] = [
            new TokenConfig(
                {
                    name: `theme`,
                    values: this.themes,
                },
                {
                    scssVariable: false,
                },
            ),
        ];

        const tokensToBuild: Buildable[] = [...tokenConfigs, ...deepExtract(this.themeTokens, isBuildable)];

        return buildCollection(tokensToBuild);
    }

    /**
     * Creates theme tokens from the configuration
     * @returns Record of theme tokens with their CSS variable values
     */
    private getThemeTokens(): Record<string, TokenConfig> {
        const tokensToCreate: Record<string, Record<string, string>> = {};

        for (const theme of Object.values(this.themes)) {
            for (const [key, values] of Object.entries(theme)) {
                if (!values) continue;

                const valuesAsCSSVariables = Object.entries(values).reduce<Record<string, string>>((acc, [subKey, value]) => {
                    acc[subKey] = `var(${generateCssVariableName(key, subKey)})`;
                    return acc;
                }, {});

                if (!tokensToCreate[key]) {
                    tokensToCreate[key] = {};
                }
                tokensToCreate[key] = deepMerge(tokensToCreate[key], valuesAsCSSVariables);
            }
        }

        const tokenConfigs: Record<string, TokenConfig> = {
            themes: new TokenConfig(
                {
                    name: "themes",
                    values: Object.keys(this.themes).reduce<NestedRecord<string>>((acc, key) => {
                        acc[key] = key;
                        return acc;
                    }, {}),
                },
                {
                    scssMap: true,
                    scssVariable: false,
                },
            ),
        };

        for (const [key, values] of Object.entries(tokensToCreate)) {
            tokenConfigs[key] = new TokenConfig(
                {
                    name: key,
                    values: values,
                },
                {
                    scssMap: true,
                    scssVariable: true,
                },
            );
        }

        return tokenConfigs;
    }
}
