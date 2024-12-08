import { isBuildable, NestedRecord } from "../../types";
import UtilityConfig from "./UtilityConfig";

export type UtilityPropertyConfig = string | NestedRecord<string>;

export interface UtilityConfigInput {
    // CSS properties to generate utilities for
    properties: UtilityPropertyConfig;
    // Class name prefix (e.g., 'mt' for margin-top)
    className: string;
    values: Record<string, string>;
    // Optional configuration
    options?: {
        important?: boolean;
        responsive?: boolean;
    };
}

export function isUtilityConfig(config: any): config is UtilityConfig {
    const buildable = isBuildable(config);
    const hasProperties = typeof config.properties === "string" || typeof config.properties === "object";

    return buildable && hasProperties;
}
