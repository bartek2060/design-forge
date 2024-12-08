import TokenConfig from "../../../../TokenConfig";
import UtilityConfig from "../../../../UtilityConfig";

const createGapUtilities = (spacingToken: TokenConfig): Record<string, UtilityConfig> => {
    const values = {
        ...spacingToken.flatValues,
    };
    return {
        gap: new UtilityConfig({
            properties: "gap",
            className: "gap",
            values,
        }),
        "gap-x": new UtilityConfig({
            properties: "column-gap",
            className: "gap-x",
            values,
        }),
        "gap-y": new UtilityConfig({
            properties: "row-gap",
            className: "gap-y",
            values,
        }),
    };
};

export default createGapUtilities;
