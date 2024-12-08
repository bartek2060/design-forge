import { Command } from "commander";

import buildCommand from "./commands/build";
import initCommand from "./commands/init";

import { DEFAULT_CONFIG_PATH, DEFAULT_OUTPUT_PATH, DEFAULT_PRETTIER_PATH } from "./commands/build/constants";

const createProgram = () => {
    const program = new Command();

    program.name("design-forge").description("Design system tool").version("0.0.1");

    program
        .command("init")
        .description("Set up the template for configuring the design system in your project")
        .option("-d, --debug", "Enable additional logging")
        .option("--dir <path>", 'Directory where design system files will be created (default: "src/@design")')
        .option("--skip-package-json", "Skip updating package.json with design-forge scripts", false)
        .option("-y, --yes", "Skip prompts and use default values", false)
        .action(initCommand);

    program
        .command("build")
        .description("Build the design tokens & utilities")
        .option("-c, --config <path>", `Path to config file (default: "${DEFAULT_CONFIG_PATH}")`, DEFAULT_CONFIG_PATH)
        .option("-o, --output <path>", `Path to output directory (default: "${DEFAULT_OUTPUT_PATH}")`, DEFAULT_OUTPUT_PATH)
        .option(
            "-p, --prettier <path or false>",
            `Path to prettier config file or false to disable (default: "${DEFAULT_PRETTIER_PATH}")`,
            DEFAULT_PRETTIER_PATH,
        )
        .option("-d, --debug", "Enable additional logging")
        .action(buildCommand);

    return program;
};

export async function cli(args: string[]) {
    const program = createProgram();
    await program.parseAsync(args);
}
