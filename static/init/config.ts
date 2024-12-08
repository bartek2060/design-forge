import { DesignConfig } from "@mogielski/design-forge";

import tokens from "./tokens";
import utilities from "./utilities";

// 1. Use typescript to figure out what you can configure.
// 2. Build the styles with: npm run design-forge:build.
// 3. Check out the build output (./build/styles/*) to see what SCSS variables are generated so you can use them in your project.

const config = new DesignConfig({
    tokens,
    utilities,
});

export default config;
