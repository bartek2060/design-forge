import fs from "fs";
import path from "path";
import { mkdir, writeFile, readFile } from "fs/promises";

import { STATIC_PATH } from "../../../constants";
import { logger } from "../../../utils/logger";

import generateScripts from "./scripts";

let templateFiles: Record<string, string> = {};

if (Object.keys(templateFiles).length === 0) {
    templateFiles = readDirRecursively(STATIC_PATH.init);
}

export async function validateProjectDirectory() {
    const packageJsonPath = path.join(process.cwd(), "package.json");

    if (!fs.existsSync(packageJsonPath)) {
        throw new Error("No package.json found. Please run this command in a valid project directory.");
    }

    return packageJsonPath;
}

export async function generateTemplateFiles(designDir: string) {
    for (const [templatePath, content] of Object.entries(templateFiles)) {
        const targetPath = path.join(designDir, templatePath);
        await mkdir(path.dirname(targetPath), { recursive: true });
        await writeFile(targetPath, content);
        logger.success(`Generated ${templatePath}`);
    }
}

export async function updatePackageJson(designDir: string) {
    const packageJsonPath = await validateProjectDirectory();
    const packageJson = JSON.parse(await readFile(packageJsonPath, "utf-8"));

    // Add scripts
    packageJson.scripts = {
        ...packageJson.scripts,
        ...generateScripts(designDir),
    };

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 4));
    logger.success("Updated package.json");
}

/**
 * Recursively reads all files in a directory
 */
function readDirRecursively(dir: string, baseDir: string = dir): Record<string, string> {
    const files: Record<string, string> = {};
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativePath = path.relative(baseDir, fullPath);

        if (fs.statSync(fullPath).isDirectory()) {
            const subDirFiles = readDirRecursively(fullPath, baseDir);
            Object.assign(files, subDirFiles);
        } else {
            files[relativePath] = fs.readFileSync(fullPath, "utf-8");
        }
    }

    return files;
}
