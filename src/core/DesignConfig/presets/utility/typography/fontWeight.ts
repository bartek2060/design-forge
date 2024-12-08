import TokenConfig from "../../../../TokenConfig";
import UtilityConfig from "../../../../UtilityConfig";

const createFontWeightUtilities = (fontWeightToken: TokenConfig): Record<string, UtilityConfig> => {
    const values = {
        ...fontWeightToken.flatValues,
    };
    return {
        fontWeight: new UtilityConfig({
            properties: "font-weight",
            className: "font",
            values,
        }),
    };
};

export default createFontWeightUtilities;
