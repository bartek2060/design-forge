import { Buildable, BuildDefinition } from "../../types";

import deepMerge from "./deepMerge";
import { logger } from "../../utils/logger";

export default function buildCollection(buildables: Buildable[]): BuildDefinition {
    let builtValues: BuildDefinition = {};

    buildables.forEach((buildable) => {
        if (!buildable) return;

        const tokenBuild = buildable.build();
        logger.debug(`Built:`, JSON.stringify(tokenBuild, null, 2));

        builtValues = deepMerge(builtValues, tokenBuild);
    });

    return builtValues;
}
