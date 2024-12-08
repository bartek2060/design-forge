import TokenConfig from "../../../../TokenConfig";
import UtilityConfig from "../../../../UtilityConfig";

const createFontFamilyUtilities = (fontFamilyToken: TokenConfig): Record<string, UtilityConfig> => {
    const values = {
        ...fontFamilyToken.flatValues,
    };
    return {
        fontFamily: new UtilityConfig({
            properties: "font-family",
            className: "font-family",
            values,
        }),
    };
};

export default createFontFamilyUtilities;
