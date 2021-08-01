
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {View,
        Text,
        TextInput,
        StyleSheet,
        Modal,
        StatusBar,
        Button,
        TouchableOpacity,
        Keyboard,
} from 'react-native'
import React, { useState,useLayoutEffect, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { io } from "socket.io-client";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';
0
// import Video from 'react-native-video';



const socket = io("http://192.168.0.100:8080",
{transports: ['websocket',"polling","flashsocket"]});



const Example = ()=> {




  var emptymessageslist =[]
  const [Messages, setMessages] = useState(emptymessageslist);
  const [Object_Ids,SetObject] = useState(null)




  const RecievingMessages=()=>{

    socket.on("RecievingMessage",(chatmessage)=>{
      console.log("chatmessage :-",chatmessage)
      emptymessageslist.push(chatmessage);
      setMessages(emptymessageslist);
    })

  };
 

  RecievingMessages();
 const recieve = (socket) => {
  socket.on("object_clients",(object_clients)=>{
    //console.log("Object Received",object_clients);
    SetObject(object_clients)
  })
};


recieve(socket)
console.log(Object_Ids)


const leaving_rooms = () => {
  socket.emit("leaving_rooms",Object_Ids);
  
};
 


  useEffect(() => {
    RecievingMessages;
        
  }, [])

  const onSend = useCallback((Messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, Messages))
    const object_Messages = Messages[0];
    socket.emit("chatmessage",object_Messages);
    




  }, [])

  return (
     <TouchableOpacity style = {{flex:1,backgroundColor:"black"}} onPress ={Keyboard.dismiss} >
       <StatusBar
       hidden={true}
       />
       <Video source={{uri:"jngfijgggjgfjbgjgfpojgfpo"}}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onError={this.videoError}               // Callback when video cannot be loaded
       style={styles.backgroundVideo} />
      <View  style = {styles.giftedchat}>
    <GiftedChat
      messages={Messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
  
    />
      <Button
      title = "LEAVE ROOM"
      onPress={leaving_rooms}
      > 
        </Button>    
        </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  giftedchat:{
    height:"100%",
    position:"absolute",
    width:"100%",
    backgroundColor:"transparent",
    bottom:0,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})

export default Example;