import TokenConfig from "../../../../TokenConfig";
import UtilityConfig from "../../../../UtilityConfig";

const createFontSizeUtilities = (fontSizeToken: TokenConfig): Record<string, UtilityConfig> => {
    const values = {
        ...fontSizeToken.flatValues,
    };
    return {
        fontSize: new UtilityConfig({
            properties: "font-size",
            className: "font-size",
            values,
        }),
    };
};

export default createFontSizeUtilities;
