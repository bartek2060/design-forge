import fs from "fs";
import { mkdir, cp } from "fs/promises";
import path from "path";

import prettier from "prettier";

import type { StyleBuildDefinition, FileConfig } from "../../../types/build";

import { logger } from "../../../utils/logger";

import { DEFAULT_FILE_HEADER } from "./constants";
import DesignConfig from "../../../core/DesignConfig";

import { STATIC_PATH } from "../../../constants";

export async function copyStaticFiles(outputPath: string) {
    try {
        if (fs.existsSync(STATIC_PATH.build)) {
            await mkdir(outputPath, { recursive: true });

            // Instead of direct copy, we'll read and process each file
            const processStaticFiles = async (sourcePath: string, targetPath: string) => {
                const files = fs.readdirSync(sourcePath);

                for (const file of files) {
                    const sourceFilePath = path.join(sourcePath, file);
                    const targetFilePath = path.join(targetPath, file);

                    if (fs.statSync(sourceFilePath).isDirectory()) {
                        await mkdir(targetFilePath, { recursive: true });
                        await processStaticFiles(sourceFilePath, targetFilePath);
                    } else {
                        let content = fs.readFileSync(sourceFilePath, "utf-8");
                        content = `${DEFAULT_FILE_HEADER("static")}\n${content}`;

                        await mkdir(path.dirname(targetFilePath), { recursive: true });
                        fs.writeFileSync(targetFilePath, content);
                    }
                }
            };

            await processStaticFiles(STATIC_PATH.build, outputPath);
            logger.success(`Static files copied to: ${logger.color.cyan(outputPath)}\n`);
        } else {
            logger.info("No static folder found, skipping...");
        }
    } catch (error) {
        logger.warn(`Failed to copy static files: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export async function loadConfigFile(configPath: string): Promise<DesignConfig> {
    const absoluteConfigPath = path.resolve(process.cwd(), configPath);
    logger.info(`Loading design config at: ${logger.color.cyan(absoluteConfigPath)}`);

    try {
        // Register ts-node for TypeScript support
        require('ts-node/register');

        // Now we can directly import the TypeScript file
        const configUrl = new URL(`file://${absoluteConfigPath}`).href;
        const config = await import(configUrl);

        if (!config.default) {
            throw new Error(`Config file must have a default export.\nFile: ${absoluteConfigPath}`);
        }

        if (!(config.default instanceof DesignConfig)) {
            throw new Error(`Config file must default export a class that extends DesignSystem.\nFile: ${absoluteConfigPath}`);
        }

        logger.success("Design configuration loaded successfully");
        return config.default;
    } catch (error) {
        logger.error(error);
        if (error instanceof Error && error.message.includes("Cannot find module")) {
            throw new Error(
                `Could not find or load config file at: ${absoluteConfigPath}\n` +
                `Make sure the file exists and its default export is a DesignSystem.`
            );
        }
        throw error;
    }
}
/**
 * Writes SCSS content to a file in the specified output directory
 * @param fileName Name of the file to write
 * @param content SCSS content to write
 * @param outputDir Directory where the file should be written
 * @returns Promise resolving to the complete file path
 * @example writeFile('config.json', '{"color": "blue"}', './')
 */
export async function writeFile(fileName: string, content: string, outputDir: string): Promise<string> {
    try {
        // Ensure output directory exists
        fs.mkdirSync(outputDir, { recursive: true });

        const filePath = path.join(outputDir, fileName);
        fs.writeFileSync(filePath, content);

        return filePath;
    } catch (error) {
        throw new Error(`Failed to write SCSS file ${fileName}: ${error}`);
    }
}

/**
 * Converts a StyleBuildDefinition object into SCSS content
 * @param styleBuildDefinition Object containing style rules and selectors
 * @returns Formatted SCSS string
 * @example
 * convertStyleBuildDefinitionToScss({
 *   lines: ['$color: blue'],
 *   selectors: { '.button': ['color: $color'] }
 * }) => `$color: blue;
 *
 * .button {
 *   color: $color;
 * }`
 */
export function convertStyleBuildDefinitionToScss(styleBuildDefinition: StyleBuildDefinition): string {
    const parts: string[] = [];

    // Add regular lines
    if (styleBuildDefinition.lines.length > 0) {
        parts.push(styleBuildDefinition.lines.join(";\n") + ";");
    }

    // Add selectors
    Object.entries(styleBuildDefinition.selectors).forEach(([selector, rules]) => {
        if (rules.length === 0) return;

        parts.push(`${selector} {\n  ${rules.join(";\n  ")};\n}`);
    });

    return parts.join("\n\n");
}

type GenerateFileOptions = {
    fileConfig?: FileConfig;
    content: string;
    configPath: string;
    outputDir: string;
    prettierConfig: prettier.Config | null;
};

export async function generateFile({ fileConfig, content, configPath, outputDir, prettierConfig }: GenerateFileOptions) {
    if (!fileConfig) {
        logger.warn(`No file config provided for file`);
        return;
    }

    const { NAME, PRETTIER_PARSER, SKIP_DEFAULT_HEADER, HEADER } = fileConfig;
    let finalContent = ``;

    if (!SKIP_DEFAULT_HEADER) {
        finalContent += `${DEFAULT_FILE_HEADER(configPath)}\n`;
    }

    if (HEADER) {
        finalContent += `${HEADER}\n`;
    }

    finalContent += content;

    try {
        if (prettierConfig) {
            finalContent = await prettier.format(finalContent, { parser: PRETTIER_PARSER, ...prettierConfig });
        }

        const finalFilePath = await writeFile(NAME, finalContent, outputDir);
        logger.success(`Generated: ${logger.color.cyan(finalFilePath)}`);

        return finalFilePath;
    } catch (error) {
        logger.error(`Failed to generate file: ${logger.color.red(NAME)}`);
        throw error;
    }
}
