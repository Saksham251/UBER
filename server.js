const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = require("./app");
const http = require("http");

const server = http.createServer(app);

server.listen(PORT,(req,res)=>{
    console.log(`Server is listening on PORT ${PORT}`);
});