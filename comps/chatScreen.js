import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {View,
        Text,
        TextInput,
        StyleSheet,
        Modal,
        Button,
} from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { io } from "socket.io-client";



const socket = io("http://192.168.43.142:8080",
{transports: ['websocket',"polling","flashsocket"]});



const Example = ()=> {



  var listobjectrecievingmessagesobject=[


    


  ]


  const [messages, setMessages] = useState(listobjectrecievingmessagesobject);
  const [Object_Ids,SetObject] = useState(null)




  const RecievingMessages=()=>{

    socket.on("RecievingMessage",(chatmessage)=>{

      // setMessages.append(chatmessage);
    })

  };
 RecievingMessages();


 const recieve = (socket) => {
  socket.on("object_clients",(object_clients)=>{
    //console.log("Object Received",object_clients);
    SetObject(object_clients)
  })
};

// cr

recieve(socket)
console.log("fykjhuhkjh",Object_Ids)


const leaving_rooms = () => {
  socket.emit("leaving_rooms",Object_Ids);
  
};

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello Bhai',
        createdAt: new Date(),  
        user: {
          _id: 2,
          name: 'React Native',
          avatar: '',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  
    socket.emit("chatmessage",messages);
    




  }, [])

  return (
    <View style= {{

      flex:1,
      justifyContent:"space-between"

    }}>
    <GiftedChat
      messages={messages}
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
  )
}
export default Example;