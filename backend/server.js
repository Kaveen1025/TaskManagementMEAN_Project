const mongoose = require("mongoose");
require("dotenv").config();
 


const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server,{
    cors:{
        origin:'*',
    }
})
io.on('connection', socket =>{
    console.log('connection made successfully')
    socket.on('message',payload => {
        console.log('Message received on server: ', payload)
        socket.broadcast.emit('message',payload)
    })
    socket.on('send-message',payload => {
        console.log('Message received on server: ', payload)
        socket.broadcast.emit('receive-message',payload)
    })

    socket.on('workIsDone',payload=>{
        //socket.broadcast.emit("notifyTaskDone",payload)
        io.emit("notifyTaskDone",payload)
    })

    

})



const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });


  const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection successful");
});

server.listen(8080,()=>{
    console.log('I am listening at port: 8080');
})






