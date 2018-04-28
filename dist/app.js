"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path")); //node module
const redis_1 = __importDefault(require("redis"));
// import RedisStore from "connect-redis";
// var rediStore = RedisStore(session);
// var redisClient = redis.createClient();
// new redis.RedisClient({
//   host: '127.0.0.1',
//   port: 6379  
// })
// redis.RedisClient = {}
// var redisClient = redis.createClient(6379,'127.0.0.1');
// var redisStoreOptions : Partial<RedisStore.RedisStoreOptions> = {
//   client: redisClient,
//   host: '127.0.0.1',
//   port: 6379
// }
var client = redis_1.default.createClient(6379, '127.0.0.1');
var sessionConfigObj = {
    secret: 'test',
    cookie: {
        secure: false
    }
};
var app = express_1.default();
// app.use(session(sessionConfigObj))
app.use(express_session_1.default({
    secret: 'a4f8071f-c873-4447-8ee2',
    cookie: { maxAge: 2628000000 },
    store: new (require('express-sessions'))({
        storage: 'redis',
        instance: client,
        host: 'localhost',
        port: 6379,
        collection: 'sessions',
        expire: 86400 // optional 
    })
}));
app.get("/", function (req, res) {
    // res.sendFile()
    if (req.session.views) {
        req.session.views++;
        // res.setHeader('Content-Type', 'text/html');
        res.write('<p>views: ' + req.session.views + '</p>');
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
        res.end();
    }
    else {
        req.session.views = 1;
        res.end('welcome to the session demo. refresh!');
    }
    // res.send(req.sessionID);
});
app.set("port", 3000);
console.log(__dirname);
app.set("views", path_1.default.join(__dirname, "../views"));
// app.set("view engine", "pug");
var server = app.listen(app.get("port")
// , () => {
//     console.log(
//       "  App is running at http://localhost:%d in %s mode",
//       app.get("port"),
//       "development"
//     );
//     console.log("  Press CTRL-C to stop\n");
//   }
);
exports.default = server;
//# sourceMappingURL=app.js.map