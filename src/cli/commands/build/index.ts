import path from "path";
import prettier from "prettier";
import type { BasicFileType, StyleFileType, StyleBuildDefinition, FileConfig } from "../../../types";

import { logger } from "../../../utils/logger";

import { FILES } from "../../../constants";
import * as utils from "./utils";

type BuildCommandArgs = {
    config: string;
    output: string;
    prettier: string;
    debug: boolean;
};

async function generateFiles<T extends string, TFileBuildDefinition>(options: {
    files: Record<string, TFileBuildDefinition>;
    fileConfigs: Record<string, FileConfig>;
    outputDir: string;
    configPath: string;
    prettierConfig: prettier.Config | null;
    contentTransformer?: (content: TFileBuildDefinition) => string;
}) {
    const { files, fileConfigs, outputDir, configPath, prettierConfig, contentTransformer = (content) => String(content) } = options;

    for (const [fileType, content] of Object.entries(files) as [T, TFileBuildDefinition][]) {
        const fileConfig = fileConfigs[fileType];

        if (!fileConfig) {
            logger.warn(`No file name defined for type: ${fileType}`);
            continue;
        }

        const transformedContent = contentTransformer(content);

        await utils.generateFile({
            fileConfig,
            content: transformedContent,
            configPath,
            outputDir,
            prettierConfig,
        });
    }
}

async function buildCommand(args: BuildCommandArgs) {
    const { config: configPath, output, prettier: prettierArg, debug } = args;
    let prettierConfig: prettier.Config | null = null;

    if (debug) {
        process.env.DEBUG = "true";
        logger.debug("Debug mode enabled");
    }

    try {
        logger.info(`Starting build process...`);

        const prettierPath = prettierArg === "false" ? null : prettierArg;
        if (prettierPath) {
            logger.info(`Preparing Prettier config: ${logger.color.cyan(prettierPath)}`);
            prettierConfig = await prettier.resolveConfig(prettierPath);
        } else {
            logger.info("Prettier not enabled, skipping formatting");
        }

        const designConfig = await utils.loadConfigFile(configPath);
        console.log("");
        const result = await designConfig.build();

        logger.debug("Build values before converting to scss:", JSON.stringify(result, null, 2));

        // Build styles
        if (result.styles) {
            const stylesOutputPath = path.join(output, "styles");
            await generateFiles<StyleFileType, StyleBuildDefinition>({
                files: result.styles,
                fileConfigs: FILES.styles,
                outputDir: stylesOutputPath,
                configPath,
                prettierConfig,
                contentTransformer: utils.convertStyleBuildDefinitionToScss,
            });
        }

        // Build basic
        if (result.basic) {
            await generateFiles<BasicFileType, string>({
                files: result.basic,
                fileConfigs: FILES.basic,
                outputDir: output,
                configPath,
                prettierConfig,
            });
        }

        // Copy static folder to build
        await utils.copyStaticFiles(output);

        logger.success("Build completed successfully! 🎉");
    } catch (error) {
        if (error instanceof Error) {
            logger.error("Build failed:", error);
        } else {
            logger.error("Build failed:", String(error));
        }
        process.exit(1);
    }
}

export default buildCommand;
