import { generateScssMapName } from "../../../../utils/generators/scss";
import type { UtilityPropertyConfig } from "../../../../../types";

import TokenConfig from "../../../../TokenConfig";
import UtilityConfig from "../../../../UtilityConfig";

const paddingUtilityConfigs: {
    properties: UtilityPropertyConfig;
    className: string;
}[] = [
    { properties: "padding", className: "p" },
    { properties: "padding-left", className: "pl" },
    { properties: "padding-right", className: "pr" },
    { properties: "padding-top", className: "pt" },
    { properties: "padding-bottom", className: "pb" },
    {
        properties: { "padding-left": "value", "padding-right": "value" },
        className: "px",
    },
    {
        properties: { "padding-top": "value", "padding-bottom": "value" },
        className: "py",
    },
];

const createPaddingUtilities = (spacingToken: TokenConfig) => {
    const values = {
        ...spacingToken.flatValues,
    };

    return paddingUtilityConfigs.reduce<Record<string, UtilityConfig>>((acc, utility) => {
        acc[utility.className] = new UtilityConfig({
            properties: utility.properties,
            className: utility.className,
            values,
        });
        return acc;
    }, {});
};

export default createPaddingUtilities;
