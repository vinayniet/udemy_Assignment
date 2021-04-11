const fs = require('fs');

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Good Morning</title></head>');
        res.write('<body><form action ="/users" method = "POST"><input type = "text" name = "users"><button type = "submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === "/users" && method === "POST"){
         const body = [];
         req.on('data',(chunk)=>{
         console.log('chunk: --', chunk);
         body.push(chunk);
    
         });
         req.on('end',()=> {
             const parsebody = Buffer.concat(body).toString();
             console.log('parsebody: --', parsebody);
             const message = parsebody.split("=")[1];
             
             fs.writeFileSync('message.txt',message);
         });
         res.statusCode = 302;
         res.setHeader("Location", "/");
     
         return res.end();
    
    
    }
         res.setHeader('Content-type','text/html')
         res.write('<html>');
        res.write('<head><title>My Message Second page</title></head>');
        res.write('<body><ul><li>Vinay Yadav</li></ul></body>');
        res.write('</html>');
        res.end();
}

module.exports = requestHandler;