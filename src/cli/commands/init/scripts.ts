import { BUILD_FOLDER_NAME } from "../../../constants";

const generateScripts = (designDir: string) => ({
    "design-forge": `design-forge`,
    "design-forge:build": `npm run design-forge build -c ${designDir}/config.ts`,
    "design-forge:watch": `nodemon --watch ${designDir} --ignore '${designDir}/${BUILD_FOLDER_NAME}' -e js,jsx,ts,tsx,css,scss,json --exec "npm run design-forge:build"`,
});

export default generateScripts;
