import dotenv from "dotenv";
import logger from "../util/logger";
import fs from "fs";
import _ from "lodash";

if(fs.existsSync(".env")){
    logger.debug("Using .env file to supply envoironment variables.");
    dotenv.config({path:".env"});
} else {
    logger.warning("No .env file found, please check if this is valid");
}

export const SESSION_SECRET  = _.toString(process.env["SESSION_SECRET"]);


if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}