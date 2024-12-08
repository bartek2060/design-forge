import path from "path";
import type { ConfigurationAnswers, InitCommandArgs } from "./types";
import type { DistinctQuestion } from "inquirer";

import { logger } from "../../../utils/logger";

import * as utils from "./utils";
import PROMPTS from "./prompts";
import ICONS from "./icons";
import inquirer from "inquirer";

const DEFAULT_INIT_CONFIGURATION: ConfigurationAnswers = {
    dir: "./src/@design",
    updatePackageJson: true,
};

function nextStepInstructions(configuration: ConfigurationAnswers) {
    console.log("");
    logger.success("Design Forge has been successfully initialized!");
    console.log("");

    logger.info("[Script overview]");
    logger.info(`${logger.color.blue("design-forge:build")} - Generates your design tokens`);
    logger.info(`${logger.color.blue("design-forge:watch")} - Watches for changes and automatically rebuilds your design system`);
    console.log("");

    console.log("");
    logger.warn(logger.color.red("Next steps:"));
    logger.warn("1. Run build command to generate your initial design tokens");
    console.log("");

    logger.warn(`2. Implement scripts in your ${logger.color.blue("package.json")}`);
    console.log(`   ▻ Your ${logger.color.green("build script")} eg.`);
    console.log(logger.color.cyan(`         "build": "npm run design:build && next build"`));
    console.log("");
    console.log(`   ▻ Your ${logger.color.green("watch/live dev script")} eg.`);
    console.log(logger.color.cyan(`         "dev": "concurrently -n \"DESIGN-FORGE,NEXT\" -c \"blue,green\" \"npm run design-forge:watch\" \"next dev\""`));
    console.log("");

    logger.warn(`3. Import the generated styles in your app:`);
    console.log(`   ▻ Your ${logger.color.green("styles/globals.scss")} file:`);
    console.log(logger.color.cyan(`         import '${configuration.dir}/build/styles/globals.scss'`));
    console.log("");

    console.log(`   ▻ Your ${logger.color.green("styles/tokens.scss")} file:`);
    console.log(logger.color.cyan(`         import '${configuration.dir}/build/styles/tokens.scss'`));
    console.log("");

    logger.success(`And you are ready to go!`);
    logger.success(`Go to the ${logger.color.blue(configuration.dir)} directory.`);
    logger.success(`and check out how you can tailor the build to your needs.`);
}

async function initCommand(args: InitCommandArgs) {
    const { debug } = args;

    if (debug) {
        process.env.DEBUG = "true";
        logger.debug("Debug mode enabled");
    }

    try {
        logger.info("Initializing design-forge in your project...\n");

        const configuration = await getInitConfiguration(args);

        // Ensure we're in a valid project directory
        await utils.validateProjectDirectory();

        // Create design directory structure and generate template files
        const fullDesignDir = path.join(process.cwd(), configuration.dir);
        await utils.generateTemplateFiles(fullDesignDir);

        // Update package.json if not skipped
        if (configuration.updatePackageJson) {
            await utils.updatePackageJson(configuration.dir);
        }

        nextStepInstructions(configuration);
    } catch (error) {
        if (error instanceof Error) {
            logger.error("Initialization failed:", error);
        } else {
            logger.error("Initialization failed:", String(error));
        }
        process.exit(1);
    }
}

async function getInitConfiguration(args: InitCommandArgs): Promise<ConfigurationAnswers> {
    const { dir: dirArg, updatePackageJson: updatePackageJsonArg, yes } = args;

    let configuration: Partial<ConfigurationAnswers> = {
        dir: dirArg,
        updatePackageJson: updatePackageJsonArg,
    };

    const promptsToRun: DistinctQuestion<ConfigurationAnswers>[] = [];

    if (!yes) {
        if (!configuration.dir) promptsToRun.push(PROMPTS.directoryPrompt);
        if (configuration.updatePackageJson === undefined) promptsToRun.push(PROMPTS.updatePackageJsonPrompt);
    }

    if (promptsToRun.length > 0) {
        configuration = await inquirer.prompt<ConfigurationAnswers>(promptsToRun);
    }

    // Show final configuration
    console.log("");
    logger.info(logger.color.cyan("Configuration:"));
    console.log(`${ICONS.dir} Directory: ${logger.color.blue(configuration.dir)}`);
    console.log(`${ICONS.updatePackageJson} Update package.json: ${logger.color.blue(configuration.updatePackageJson)}\n`);

    if (!yes) {
        const { confirm } = await inquirer.prompt(PROMPTS.confirmationPrompt);

        if (!confirm) {
            console.log("");
            logger.error("Initialization cancelled.");
            process.exit(0);
        }
    }

    return {
        dir: configuration.dir ?? DEFAULT_INIT_CONFIGURATION.dir,
        updatePackageJson: configuration.updatePackageJson ?? DEFAULT_INIT_CONFIGURATION.updatePackageJson,
    };
}

export default initCommand;
