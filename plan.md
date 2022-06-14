# plan of action

STEP1-2:- initialize our nodejs project.[Always Initialize Setup/Environment in BASH Terminal, not in Node, Powershell, cmd]

STEP3:- initialize our first view from JS to EJS(for rooms create HTML FILE i.e ROOM.EJS in FOLDER VIEWS) 

STEP4:- initialize a room id(INSTALL UUID LIBRARY FOR SPECIFIC ROOMS i.e npm install uuid, IT WILL RANDOM UNIQUE ID FOR ROOMS i.e every person has its own uuid for joining the rooms) 

STEP5:- add the ability to view our own video(Create a FOLDER PUBLIC and Create a file script.JS(this JS file contains the code for the FRONT-END)), then import the file to room.EJS ie src=""

STEP6:- add ability to allow othersto stream their video(install socket.io library for Real-Time Commmunication, it  is async communication, with socket.io even server can send request to the user i.e npm install socket.io). (peerJS)

-add styling(Create style.css in public folder)
-add the ability to create messages
-add mute and stop video button, leave meeeting
(using webrtc, peerJS, socket.io, uuid library)
