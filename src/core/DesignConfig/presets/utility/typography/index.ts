import type { UtilityCreatorFunction } from "../../../../../types";
import { logger } from "../../../../../utils/logger";
import TokenConfig from "../../../../TokenConfig";

import createFontSizeUtilities from "./fontSize";
import createFontWeightUtilities from "./fontWeight";
import createFontFamilyUtilities from "./fontFamily";
import createTextAlignmentUtilities from "./textAlignment";

const createTypographyUtilities: UtilityCreatorFunction<"typography"> = (config, tokens) => {
    const typographyTokens = tokens.typography;
    if (!typographyTokens) {
        logger.warn("No typography tokens found, skipping typography utilities");
        return {};
    }

    const { fontSizes, fontWeight, fontFamily } = typographyTokens;

    const fontSizeEnabled = config?.fontSize !== false && fontSizes instanceof TokenConfig;
    const fontWeightEnabled = config?.fontWeight !== false && fontWeight instanceof TokenConfig;
    const fontFamilyEnabled = config?.fontFamily !== false && fontFamily instanceof TokenConfig;
    const textAlignmentEnabled = config?.textAlignment !== false;

    return {
        ...(fontSizeEnabled ? createFontSizeUtilities(fontSizes) : {}),
        ...(fontWeightEnabled ? createFontWeightUtilities(fontWeight) : {}),
        ...(fontFamilyEnabled ? createFontFamilyUtilities(fontFamily) : {}),
        ...(textAlignmentEnabled ? createTextAlignmentUtilities() : {}),
    };
};

export default createTypographyUtilities;
