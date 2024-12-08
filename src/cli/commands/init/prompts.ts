import ICONS from "./icons";

const directoryPrompt = {
    type: "input",
    name: "dir",
    message: `${ICONS.dir} Where would you like to create the design system files?`,
    default: "src/@design",
} as const;

const updatePackageJsonPrompt = {
    type: "confirm",
    name: "updatePackageJson",
    message: `${ICONS.updatePackageJson} Would you like to update package.json with design-forge scripts?`,
    default: true,
} as const;

const confirmationPrompt = {
    type: "confirm",
    name: "confirm",
    message: "Would you like to proceed with this configuration?",
    default: true,
} as const;

const PROMPTS = {
    directoryPrompt,
    updatePackageJsonPrompt,
    confirmationPrompt,
};

export default PROMPTS;
