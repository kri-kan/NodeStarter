import dotenv from "dotenv";
import logger from "../util/logger";
import fs from "fs";

if(fs.existsSync(".env")){
    logger.debug("Using .env file to supply envoironment variables.");
    dotenv.config({path:".env"});
} else {
    logger.warning("No .env file found, please check if this is valid");
}

