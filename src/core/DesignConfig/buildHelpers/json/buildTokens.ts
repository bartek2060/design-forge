import type { DesignTokens } from "../../types";
import { isTokenConfig } from "../../../../types";

import TokenConfig from "../../../TokenConfig";

import deepExtract from "../../../utils/deepExtract";

export default function buildTokens(tokens: DesignTokens): string {
    const tokenObject: Record<string, Record<string, string>> = {};

    deepExtract(tokens, (config): config is TokenConfig => {
        if (!isTokenConfig(config)) return false;

        tokenObject[config.name] = config.flatValues;

        return true;
    });

    return JSON.stringify(tokenObject, null, 4);
}
