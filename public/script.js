//6.4 Define socket 
const socket = io('/')

//5.7 get video grid by ID
const videoGrid = document.getElementById('video-grid')

//.6.8 Create a New Peer Connection
const myPeer = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '443'
})

//5.2 create a variable, function  and Access the media permission for Video and Audio(Through Promise)
let myVideoStream;
//5.4 Create a video Element
const myVideo = document.createElement('video')
myVideo.muted = true; //add muted to myvideo so that it dosent replay backs to me
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  myVideoStream = stream;

 //5.5 add addvideostream to add the created element 
  addVideoStream(myVideo, stream) //passing my own video and stream
  
 //6.10 Add answer call here To see the Stream of the New User 
  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

 //6.7 listen socket user connectedd here and create a function connectTonewuser 
  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
  // input value
  let text = $("input");
  // when press enter send message and //calling the HTML file
  $('html').keydown(function (e) {
    //Here, e is the Event For Typing in the Input 13 is KEYCODE for ENTER KEY on the keyboard i.e when the user type any message and presses enter, AND Text.val.length is the message typed by the user, SOCKET.EMIT is for sending the message
    if (e.which == 13 && text.val().length !== 0) {
      socket.emit('message', text.val());
      text.val('')
    }
  });
  socket.on("createMessage", message => {

    //Append the message using JQuery 
    $("ul").append(`<li class="message"><b>user</b><br/>${message}</li>`);
    scrollToBottom()
  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

//6.8 Listen to the Peer Connection here
myPeer.on('open', id => {

 // 6.3 here inside 
  socket.emit('join-room', ROOM_ID, id)
})

//create function here
function connectToNewUser(userId, stream) {
  
 //6.9 Call the  User with Peer 
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

//5.3 create a function addvideostream for the new user
function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })

 //5.8 append the video-grid with video element 
  videoGrid.append(video)
}


//Create function ScrollToBottom so when typing the messages, the box dosent goes down
const scrollToBottom = () => {
  var d = $('.main__chat_window');
  d.scrollTop(d.prop("scrollHeight"));
}


const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
}

const playStop = () => {
  console.log('object')
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo()
  } else {
    setStopVideo()
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
}

const setMuteButton = () => {
  const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
  document.querySelector('.main__mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
  document.querySelector('.main__mute_button').innerHTML = html;
}

const setStopVideo = () => {
  const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}

const setPlayVideo = () => {
  const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}
