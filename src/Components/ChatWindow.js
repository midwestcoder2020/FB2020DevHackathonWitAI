
import React,{useState,useEffect} from 'react';
import Chat from './Chat';
import axios from 'axios';
import Client from './Wit';

function ChatWindow() {

    axios.defaults.headers.common['User-Agent'] = "FBWitAIComp";
    axios.defaults.headers.common['Accept'] = "application/json";

const [messages,setMessages] = useState([]);
  const [text,setText] = useState("");
  const [action,setAction] = useState("");

  const handleInput =(e) =>{
    e.preventDefault(); 
    const s = e.target.value;
    // console.log(s);
    setText(s);
  }

  const goWit = (e)=> {
    console.log(e.target.value);
  }

  const addMsg = (e)=>{

    // console.log("message to add "+e);
    let inputs = Object.assign([], messages);
    inputs.push(e);
    // console.log("add msg function "+ inputs);
    setMessages(inputs);
  }

  const addUserMsg = (e)=>{
    document.getElementById("chatDiv").innerHTML += `<div class="chat"><div id="AISent" class="userPhoto"></div><p class="chat-message">${e}</p></div>`; 
  }

  const testMessage =()=>{

    if(text!==""){

     addMsg(text);

      Client.message(text,{}).then((data)=>{
        if(data['intents'].length <=0){
          const defResp=["Sorry, I didn't get that","Whoops! Sorry! I wasnt able to get that","I apologize. I dont know what you need."];
          const val = Math.floor(Math.random() * 2);
          const resp = defResp[val];
          console.log(resp);
          // addMsg(resp);
          addUserMsg(resp);
          setText("");
        }
        else{
        var act = data["intents"][0]['name'];
        switch(act){
          case "getRandomFact":
            axios.get('https://uselessfacts.jsph.pl/random.json?language=en', {
                  headers: {
                    'Accept':'application/json'
                  }}).then((data)=>{
                    console.log(data['data']['text']);
                    // addMsg(data['data']['text']);
                    addUserMsg(data['data']['text']);
                  });
                  setText("");

          break;
          case "getRandomJoke":
            axios.get('https://icanhazdadjoke.com/', {
              headers: {
                'Accept':'application/json'
              }}).then((data)=>{
                console.log(data['data']['joke']);
                addUserMsg(data['data']['joke']);
              });
              setText("");

          break;
          case "Tutorial_Intent":
            const defRespTut=["Ok, so you are looking for a Wit AI tutorial. Check this one out","Here, this should help","Here is a great starting place!"];
            const valTut = Math.floor(Math.random() * 2);
            const respTut = defRespTut[valTut];
              addUserMsg(respTut+" https://wit.ai/docs/")
              setText("");

          break;
          default:
            const defResp=["Sorry, I didn't get that","Whoops! Sorry! I wasnt able to get that","I apologize. I dont know what you need."];
            const resp = defResp[Math.random() * 2]+ 1;
            console.log(resp);
            addUserMsg(resp);
            // addMsg(resp);
            setText("");
          break;
          }          
        }
      });

      setText("");
    }
  }
    if(messages.length>=1){

    return (
        <div className="chatbox">
        <div id="chatDiv" className="chatlogs">
            {
              messages.map((msg,index) =>
               <div key={index}>
              <Chat  msg={msg}/>
               </div>
               )}

        </div>
        <div className="chatSend">
            <textarea id="textForm" value={text} onChange={handleInput}></textarea>
            <button onClick={testMessage}>Send</button>
        </div>
    </div> 

        );
    }else{
        return (
            <div className="chatbox">
            <div id="chatDiv" className="chatlogs">
            </div>
            <div className="chatSend">
                <textarea id="textForm" value={text} onChange={handleInput}></textarea>
                <button onClick={testMessage}>Send</button>
            </div>
        </div> 
            );
    }
}

export default ChatWindow
