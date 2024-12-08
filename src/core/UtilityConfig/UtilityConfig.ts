import type { BuildDefinition, StyleBuildDefinition, Buildable } from "../../types";
import type { UtilityConfigInput, UtilityPropertyConfig } from "./types";
import { FILE_TYPES } from "../../constants";

import { generateIncludeMixin, generateScssMapDeclaration, generateScssMapName } from "../utils/generators/scss";

export default class UtilityConfig implements Buildable {
    private static variableCache = new Map<string, string>();

    readonly className: string;
    readonly values: Record<string, string>;
    readonly properties: UtilityPropertyConfig;

    private readonly options?: {
        important?: boolean;
        responsive?: boolean;
    };

    constructor(config: UtilityConfigInput) {
        this.properties = config.properties;
        this.className = config.className;
        this.values = config.values;
        this.options = config.options;
    }

    build(): BuildDefinition {
        const utilitiesStyle: StyleBuildDefinition = {
            selectors: {},
            lines: [],
        };

        const valuesString = JSON.stringify(this.values);

        let variableName = UtilityConfig.variableCache.get(valuesString);
        if (!variableName) {
            variableName = generateScssMapName("util", this.className);
            utilitiesStyle.lines.push(generateScssMapDeclaration(variableName, this.values, { generateMapName: false }));
            UtilityConfig.variableCache.set(valuesString, variableName);
        }

        utilitiesStyle.lines.push(generateIncludeMixin("create-utility", [this.properties, this.className, variableName, this.options]));

        return {
            styles: {
                [FILE_TYPES.STYLE.UTILITIES]: utilitiesStyle,
            },
        };
    }

    static clearCache(): void {
        UtilityConfig.variableCache.clear();
    }
}
