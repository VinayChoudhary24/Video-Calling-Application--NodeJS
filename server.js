//1. first initialize nodeJS i.e npm init(IT WILL CREATE PACKAGE>JSON FILE) and install Express i.e npm install Express(CONNECTS TO THE SERVER, HELPS IN BUILDING API, ADD DEPENDENCIES IN .JOSN and CREATES PACKAGE-LOCK.JSON)

//2.1 initialize EXPRESS(web application framework)
const express = require('express')

//2.2 Create a APP
const app = express()
// const cors = require('cors')
// app.use(cors())

//2.3create our Server
const server = require('http').Server(app)

//6.1 Import socket.io here
const io = require('socket.io')(server)

//6.7 add peerJS  here
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});

//4.1 Import uuid Library in server.js
const { v4: uuidV4 } = require('uuid') //v4 is  the version 

//6.7 Add URL to use, INstall peerJS npm install peer
app.use('/peerjs', peerServer);

//3.2 set view engine to ejs file
app.set('view engine', 'ejs') //after this we will see the ejs body(html) content on the web-page i.e localhost:3030

//5.1 Set PUBLIC URL
app.use(express.static('public'))

//2.5  create a URL i.e '/' with arrow function, INSTALL NODEMON To RUN NODEJS SERVER i.e npm install -g nodemon
app.get('/', (req, res) => {
  //res.status(200).send("hello nodeJS");

 //3.1 Here, for Room .js we change the line from res.status to res.render
 //res.render('room'); //room is the name of the file to render, NOW INSTALL EJS i.e npm install ejs,EJS(embedded JS) WILL HELP US IN GETTING VARIABLES FROM BACKEND TO THE FRONT END.
 
 //4.3
 res.redirect(`/${uuidV4()}`)
}) //after this the URL will change from localhost:3030 to http://localhost:3030/f6f01f3f-2369-469c-936e-baabf1235e76, this is UUID. Now PASS roomId in .EJS

//4.2 Now, we want  to change (URL)HTML link(localhost:3030) to A specific room id LINK(new URl), Here we render the room and delete from above and put this(res.redirect(`/${uuidv4()}`))
app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

//6.2 Create a connection
io.on('connection', socket => {

  //here the other user joins the room
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)

   //6.6 add this for the message USER CONNECTED 
    socket.to(roomId).broadcast.emit('user-connected', userId);
    // messages, This Line Will Listen to the Messages
    socket.on('message', (message) => {
      //send message to the same room
      io.to(roomId).emit('createMessage', message)
  }); 

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

//2.4 adding .listen to the server and giving ports 3030 i.e localhost
server.listen(process.env.PORT||3030)
