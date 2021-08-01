import React,{useState}  from "react";
import {Text,View, Modal} from 'react-native';
import { Example } from "./chatScreen";
import { GiftedChat } from "react-native-gifted-chat";

const [ModalVisible,setModalVisible] = useState(false);






const Modals = ()=>{
 



    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={()=>{setModalVisible(!ModalVisible)}}
        >
    
        <View style = {{
            position:'absolute',
            bottom:"12%",
            height:"35%",
            backgroundColor:"white",
        }}>
            <Example/>
        </View>
    
    
        </Modal>
        );
}; 

export default Modals;