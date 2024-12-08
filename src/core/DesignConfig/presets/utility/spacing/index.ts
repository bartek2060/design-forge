import type { UtilityCreatorFunction } from "../../../../../types";
import { logger } from "../../../../../utils/logger";

import createMarginUtilities from "./margin";
import createGapUtilities from "./gap";
import createPaddingUtilities from "./padding";

const createSpacingUtilities: UtilityCreatorFunction<"spacing"> = (config, tokens) => {
    const spacingToken = tokens.spacing;
    if (!spacingToken) {
        logger.warn("No spacing token found, skipping spacing utilities");
        return {};
    }

    const marginEnabled = config?.margin !== false;
    const paddingEnabled = config?.padding !== false;
    const gapEnabled = config?.gap !== false;

    return {
        margin: marginEnabled ? createMarginUtilities(spacingToken) : undefined,
        padding: paddingEnabled ? createPaddingUtilities(spacingToken) : undefined,
        gap: gapEnabled ? createGapUtilities(spacingToken) : undefined,
    };
};

export default createSpacingUtilities;
