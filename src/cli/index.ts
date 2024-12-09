#!/usr/bin/env node

import { cli } from "./cli";
import { logger } from "../utils/logger";

cli(process.argv).catch((error: Error) => {
    logger.error("An unexpected error occurred:");
    logger.error(error);
    process.exit(1);
});
