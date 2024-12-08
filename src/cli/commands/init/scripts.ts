import { BUILD_FOLDER_NAME } from "../../../constants";

const generateScripts = (designDir: string) => ({
    "design-forge": "ts-node ./packages/design-forge/src/cli/index.ts",
    "design-forge:watch": `nodemon --watch ${designDir} --ignore '${designDir}/${BUILD_FOLDER_NAME}' -e js,jsx,ts,tsx,css,scss,json --exec "npm run design-forge:build"`,
    "design-forge:build": `npm run design-forge build ${designDir}/config.ts`,
});

export default generateScripts;
