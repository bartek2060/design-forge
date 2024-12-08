import type { NestedRecord } from "../../../types";
import { isTokenConfig, isUtilityConfig } from "../../../types";

import type TokenConfig from "../../TokenConfig";
import type UtilityConfig from "../../UtilityConfig";
import type { DesignTokens, DesignUtilities } from "../types";

import { generateUnionType, convertObjectToString } from "../../utils/generators/typescript";

import deepExtract from "../../utils/deepExtract";
import deepMerge from "../../utils/deepMerge";

interface InterfaceDefinition<T> {
    name: string;
    source: T;
    typeChecker: (value: unknown) => value is T;
    getValues: (config: T, path: string[], source: T) => Record<string, string>;
}

function shouldSimplifyUtility(siblings: UtilityConfig[]): boolean {
    if (siblings.length <= 1) return false;

    const referenceKeys = Object.keys(siblings[0].values).sort().join();

    return siblings.every((utility) => Object.keys(utility.values).sort().join() === referenceKeys);
}

function getUtilityValues(config: UtilityConfig, path: string[], utilities: DesignUtilities): Record<string, string> {
    const parentPath = path.slice(0, -1);
    const parent = parentPath.length ? parentPath.reduce((obj: any, key) => obj[key], utilities) : utilities;
    const siblings = Object.values(parent).filter(isUtilityConfig);

    if (shouldSimplifyUtility(siblings)) {
        return { "": generateUnionType(Array.from(new Set(Object.keys(config.values)))) };
    }

    return config.values;
}

export default function buildTypes(tokens: DesignTokens, utilities: DesignUtilities): string {
    const interfaceDefinitions: InterfaceDefinition<any>[] = [
        {
            name: "DesignTokens",
            source: Object.fromEntries(Object.entries(tokens).filter(([key]) => key !== "themes")), // Build themes separately
            typeChecker: isTokenConfig,
            getValues: (config: TokenConfig) => config.flatValues,
        },
        {
            name: "DesignTheme",
            source: tokens.themes?.themeTokens,
            typeChecker: isTokenConfig,
            getValues: (config: TokenConfig) => config.flatValues,
        },
        {
            name: "DesignUtilities",
            source: utilities,
            typeChecker: isUtilityConfig,
            getValues: getUtilityValues,
        },
    ];

    const interfaces: Record<string, NestedRecord<string>> = Object.fromEntries(interfaceDefinitions.map((def) => [def.name, {}]));

    const buildInterfaceTypes = ({ name, source, typeChecker, getValues }: InterfaceDefinition<unknown>) => {
        deepExtract(source, (config, path): config is unknown => {
            if (!typeChecker(config)) return false;

            const values = getValues(config, path, source);
            const objToMerge = path
                .slice(0, values[""] ? -1 : undefined)
                .reduceRight((value: any, key) => ({ [key]: value }), values[""] || generateUnionType(values));

            interfaces[name] = deepMerge(interfaces[name], objToMerge);
            return true;
        });
    };

    interfaceDefinitions.forEach(buildInterfaceTypes);

    return interfaceDefinitions.map(({ name }) => `export interface ${name} {\n${convertObjectToString(interfaces[name])}\n}`).join("\n\n") + "\n\n";
}
