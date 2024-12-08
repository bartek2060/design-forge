import type { UtilityCreatorFunction } from "../../../../../types";
import { logger } from "../../../../../utils/logger";

import displayUtilities from "./display";
import positionUtilities from "./position";
import flexUtilities from "./flex";
import alignmentUtilities from "./alignment";
import sizingUtilities from "./sizing";

const createLayoutUtilities: UtilityCreatorFunction<"layout"> = (config, tokens) => {
    if (!config) {
        logger.warn("No layout config found, skipping layout utilities");
        return {};
    }

    const displayEnabled = config?.display !== false;
    const positionEnabled = config?.position !== false;
    const flexEnabled = config?.flex !== false;
    const alignmentEnabled = config?.alignment !== false;
    const sizingEnabled = config?.sizing !== false;

    return {
        ...(displayEnabled ? displayUtilities : {}),
        ...(positionEnabled ? positionUtilities : {}),
        ...(flexEnabled ? flexUtilities : {}),
        ...(alignmentEnabled ? alignmentUtilities : {}),
        ...(sizingEnabled ? sizingUtilities : {}),
    };
};

export default createLayoutUtilities;
