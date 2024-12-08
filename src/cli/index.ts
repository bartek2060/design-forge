#!/usr/bin/env node

import { cli } from "./cli.js";
import { logger } from "../utils/logger.js";

cli(process.argv).catch((error: Error) => {
    logger.error("An unexpected error occurred:");
    logger.error(error);
    process.exit(1);
});
