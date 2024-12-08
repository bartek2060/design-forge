import type { UtilityPropertyConfig } from "../../../../../types";

import TokenConfig from "../../../../TokenConfig";
import UtilityConfig from "../../../../UtilityConfig";

import { generateScssMapName } from "../../../../utils/generators/scss";

const marginUtilityConfigs: {
    properties: UtilityPropertyConfig;
    className: string;
}[] = [
    { properties: "margin", className: "m" },
    { properties: "margin-left", className: "ml" },
    { properties: "margin-right", className: "mr" },
    { properties: "margin-top", className: "mt" },
    { properties: "margin-bottom", className: "mb" },
    {
        properties: { "margin-left": "value", "margin-right": "value" },
        className: "mx",
    },
    { properties: { "margin-top": "value", "margin-bottom": "value" }, className: "my" },
];

const createMarginUtilities = (spacingToken: TokenConfig): Record<string, UtilityConfig> => {
    const values = {
        ...spacingToken.flatValues,
        auto: "auto",
    };

    return marginUtilityConfigs.reduce<Record<string, UtilityConfig>>((acc, utility) => {
        acc[utility.className] = new UtilityConfig({
            properties: utility.properties,
            className: utility.className,
            values,
        });
        return acc;
    }, {});
};

export default createMarginUtilities;
