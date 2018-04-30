import express from "express";
import session from "express-session";
import path from "path"; //node module
import redis from "redis";
import dotenv from "dotenv";
import { SESSION_SECRET } from "./config/secret";


var client = redis.createClient(Number(process.env.SESSION_STORE_PORT), process.env.SESSION_STORE_HOST);

var app = express();

app.use(session({
  secret: SESSION_SECRET,
  cookie: { maxAge: 2628000000 },
  store: new (require('express-sessions'))({
      storage: 'redis',
      instance: client, // optional 
      host: process.env.SESSION_STORE_HOST, // optional 
      port: process.env.SESSION_STORE_PORT, // optional 
      collection: 'sessions', // optional 
      expire: 86400 // optional 
  })
}));

app.get("/", function(req,res){
  // res.sendFile()
  if (req.session.views) {
    req.session.views++;
    // res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + req.session.views + '</p>');
    res.write('<p>Test_Env_Variable : ' + process.env.Test_Env_Variable + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
    // res.send(req.sessionID);
});

app.set("port",process.env.APP_PORT);
console.log(__dirname);
app.set("views", path.join(__dirname, "../views"));
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
export default server;