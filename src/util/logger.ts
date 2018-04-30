import dotenv from "dotenv";
import winston from "winston";
import {Logger} from "winston";


const logger = new (Logger)({
    transports:[
        new (winston.transports.Coductionsole)({level : process.env.NODE_ENV === "production" ? "error" : "debug" }),
        new (winston.transports.File)({filename:"debug.log",level:"debug"})
    ]
});

if(process.env.NODE_ENV !== "production"){
    console.log("logging initialized at debugging level.");
}

export default logger;
