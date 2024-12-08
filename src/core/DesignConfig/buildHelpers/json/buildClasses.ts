import deepExtract from "../../../utils/deepExtract";
import type { DesignTokens, DesignUtilities } from "../../types";
import { isUtilityConfig } from "../../../../types";
import UtilityConfig from "../../../UtilityConfig";
import { STYLE_GENERATION, BUILD_CLASSES_BREAKPOINT_KEY } from "../../../../constants";
import { logger } from "../../../../utils/logger";

type ClassReturnObject = {
    [key: string]: Record<string, string> | Record<string, Record<string, string>>;
};

export default function buildClasses(breakpoints: DesignTokens["breakpoint"], utilities: DesignUtilities): string {
    const classes: ClassReturnObject = buildClassesWithPrefix(utilities);
    const breakpointClasses: ClassReturnObject = {};

    if (breakpoints) {
        Object.entries(breakpoints.flatValues).forEach(([breakpoint]) => {
            const prefix = `${breakpoint}:`;
            const responsiveClasses = buildClassesWithPrefix(utilities, prefix);

            if (classes[breakpoint]) {
                logger.warn(`There is a utility with the same name as the breakpoint: '${breakpoint}'`);
            }

            breakpointClasses[breakpoint] = responsiveClasses;
        });
    }

    if (classes[BUILD_CLASSES_BREAKPOINT_KEY]) {
        logger.warn(`There is a utility with the same name as the reserved key for breakpoint classes: '${BUILD_CLASSES_BREAKPOINT_KEY}'`);
    }

    return JSON.stringify({ ...classes, [BUILD_CLASSES_BREAKPOINT_KEY]: breakpointClasses }, null, 4);
}

function buildClassesWithPrefix(utilities: DesignUtilities, breakpointPrefix: string = ""): Record<string, Record<string, string>> {
    const classObject: Record<string, Record<string, string>> = {};

    deepExtract(utilities, (config): config is UtilityConfig => {
        if (!isUtilityConfig(config)) return false;

        const utilityName = config.className;

        Object.entries(config.values).forEach(([key]) => {
            if (!classObject[utilityName]) classObject[utilityName] = {};

            // "m['1']" -> "m-1"
            // "bg['primary']" -> "bg-primary"
            classObject[utilityName][key] = [`${breakpointPrefix}${utilityName}`, key].join(STYLE_GENERATION.VARIABLE_KEY_SEPARATOR);
        });

        return true;
    });

    return classObject;
}
