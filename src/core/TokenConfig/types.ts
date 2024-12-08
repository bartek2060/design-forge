import { isBuildable, NestedRecord } from "../../types";
import TokenConfig from "./TokenConfig";

export interface TokenConfigOptions {
    cssVariable?: boolean;
    scssVariable?: boolean;
    scssMap?: boolean;
    scssMapKeys?: boolean;
}

export interface TokenConfigParams {
    name: string;
    values: NestedRecord<string>;
}

export function isTokenConfig(toCheck: any): toCheck is TokenConfig {
    const buildable = isBuildable(toCheck);
    const hasValues = typeof toCheck === "object" && "values" in toCheck;
    const hasFlatValues = typeof toCheck.getFlatValues === "function";

    return buildable && hasValues && hasFlatValues;
}
