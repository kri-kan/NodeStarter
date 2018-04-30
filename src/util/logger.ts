import dotenv from "dotenv";
import winston, { FileTransportOptions } from "winston";
import {Logger,Transports,FileTransportInstance} from "winston";

// var p : FileTransportInstance;
// var x : FileTransportOptions;

// x = {filename:"debug.log",level:"debug"};
// p = {json: true,logstash: true, colorize: true,  maxsize: null,
//     rotationFormat: false,   zippedArchive: false,   maxFiles: null,
//     prettyPrint: true,  label: null,   timestamp: true,
//     eol: false,    tailable: true,    depth: null,
//     showLevel: true,    maxRetries: 1 , new{x:""}   
//     };

const logger = new (Logger)({
    transports:[
        // new (winston.transports.File)({filename:"debug.log",level:"debug"}),
        new (winston.transports.Coductionsole)({level : process.env.NODE_ENV === "production" ? "error" : "debug" }),
        new (winston.transports.File)({filename:"debug.log",level:"debug"})
    ]
});

if(process.env.NODE_ENV !== "production"){
    console.log("logging initialized at debugging level.");
}

export default logger;
