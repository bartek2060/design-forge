import type { Buildable, BuildDefinition } from "../../types";
import { isBuildable } from "../../types";
import type { DesignConfigInput, DesignTokens, DesignUtilities } from "./types";

import { FILE_TYPES } from "../../constants";

import { logger } from "../../utils/logger";
import deepExtract from "../utils/deepExtract";
import buildCollection from "../utils/buildCollection";

import buildTypes from "./buildHelpers/buildTypes";
import buildClasses from "./buildHelpers/json/buildClasses";
import buildTokens from "./buildHelpers/json/buildTokens";

import UtilityConfig from "../UtilityConfig";

import { createPresetTokens, createPresetUtilities } from "./presets";

export default class DesignConfig implements Buildable {
    tokens: DesignTokens;
    utilities: DesignUtilities;

    constructor(config: DesignConfigInput) {
        UtilityConfig.clearCache();

        this.tokens = createPresetTokens(config.tokens);
        this.utilities = createPresetUtilities(config.utilities ?? {}, this.tokens);

        logger.debug("Design config tokens:", JSON.stringify(this.tokens, null, 2));
        logger.debug("Design config utilities:", JSON.stringify(this.utilities, null, 2));
    }

    build(): BuildDefinition {
        logger.info("Building design tokens...");

        const toBuild: Buildable[] = deepExtract([this.tokens, this.utilities], isBuildable);

        logger.debug("Items to build:", toBuild);

        const buildBasic: BuildDefinition["basic"] = {
            // ? Not used for anything yet
            // [FILE_TYPES.BASIC.CONFIG_JSON]: JSON.stringify(this, null, 4),

            [FILE_TYPES.BASIC.CLASSES_JSON]: buildClasses(this.tokens.breakpoint, this.utilities),
            [FILE_TYPES.BASIC.TOKENS_JSON]: buildTokens(this.tokens),
            [FILE_TYPES.BASIC.TYPES]: buildTypes(this.tokens, this.utilities),
        };

        return {
            ...buildCollection(toBuild),
            basic: buildBasic,
        };
    }
}
