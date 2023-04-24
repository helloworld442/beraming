const server = require("../app");
const port = 80;
server.listen(port,()=>{
	console.log(`${port} port is running`);
})

