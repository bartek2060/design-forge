export interface ConfigurationAnswers {
    dir: string;
    updatePackageJson: boolean;
}

export type InitCommandArgs = {
    debug: boolean;
    dir?: string;
    updatePackageJson?: boolean;
    yes?: boolean; // Skip prompts and use defaults
};
