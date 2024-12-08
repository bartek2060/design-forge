import type { Buildable, BuildDefinition, NestedRecord, StyleBuildDefinition } from "../../types";
import type { TokenConfigOptions, TokenConfigParams } from "./types";

import { FILE_TYPES, STYLE_GENERATION } from "../../constants";
import * as scssUtils from "../utils/generators/scss";

const defaultOptions: TokenConfigOptions = {
    cssVariable: false,
    // SCSS
    scssVariable: true,
    scssMap: true,
    scssMapKeys: false,
};

export default class TokenConfig implements Buildable {
    readonly name: string;
    private readonly values: NestedRecord<string>;
    readonly flatValues: Record<string, string>;

    private readonly options: TokenConfigOptions;

    constructor(config: TokenConfigParams, options?: TokenConfigOptions) {
        this.options = { ...defaultOptions, ...options };

        this.name = config.name;
        this.values = config.values;
        this.flatValues = this.getFlatValues();
    }

    getMapName(): string {
        if (!this.options.scssMap) {
            throw new Error("Attempting to get map name for a token config that doesn't have SCSS map enabled");
        }

        return scssUtils.generateScssMapName(this.name);
    }

    private getFlatValues(): Record<string, string> {
        const result: Record<string, string> = {};

        function recursion(obj: NestedRecord<string>, parentKey = "") {
            if (typeof obj === "string") {
                result[parentKey] = obj;
                return;
            }

            Object.entries(obj).forEach(([key, value]) => {
                const newKey = parentKey ? `${parentKey}${STYLE_GENERATION.VARIABLE_KEY_SEPARATOR}${key}` : key;
                if (typeof value === "string") {
                    result[newKey] = value;
                } else {
                    recursion(value, newKey);
                }
            });
        }

        recursion(this.values);

        return result;
    }

    build(): BuildDefinition {
        const tokens: StyleBuildDefinition = {
            selectors: {},
            lines: [],
        };
        const global: StyleBuildDefinition = {
            selectors: {
                ":root": [],
            },
            lines: [],
        };

        // Add comment to keep different token configs separate
        tokens.lines.push(`// ${this.name}`);

        // Generate the SCSS map
        if (this.options.scssMap) {
            tokens.lines.push(this.generateTokenMap());
        }

        // Generate SCSS keys from the SCSS map
        if (this.options.scssMapKeys) {
            // Generate an SCSS array of the available keys if map isn't generated
            if (!this.options.scssMap) {
                tokens.lines.push(scssUtils.generateScssArray(this.name, Object.keys(this.flatValues)));
            } else {
                tokens.lines.push(scssUtils.generateScssMapKeysDeclaration(this.name));
            }
        }

        // Generate individual variables
        Object.entries(this.flatValues).forEach(([key, value]) => {
            let scssVarName: string | undefined;
            if (this.options.scssVariable) {
                scssVarName = scssUtils.generateScssVariableName(this.name, key);
                tokens.lines.push(scssUtils.generateVariableDeclaration(scssVarName, value));
            }

            if (this.options.cssVariable) {
                const cssVarName = scssUtils.generateCssVariableName(this.name, key);
                // If the SCSS variable is generated, use the SCSS variable name
                // If not, just use the value
                const cssVarValue = scssVarName ? `#{${scssVarName}}` : value;
                global.selectors[":root"].push(scssUtils.generateVariableDeclaration(cssVarName, cssVarValue));
            }
        });

        // New line for separation
        tokens.lines.push(`\n`);

        return {
            styles: {
                [FILE_TYPES.STYLE.TOKENS]: tokens,
                [FILE_TYPES.STYLE.GLOBAL]: global,
            },
        };
    }

    private generateTokenMap(): string {
        const isNested = Object.values(this.values).some((value) => typeof value !== "string");
        const mapValues = isNested ? this.values : this.flatValues;

        return scssUtils.generateScssMapDeclaration(this.name, mapValues, { isNested: true });
    }
}
