//import * as React from 'react';
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { Socket } from './Socket';

export function Button() 
{
    var profile = []
    const [profName, setprofName] = useState("");
    const [profImage, setprofImage] = useState("");
    
    const responseGoogle = (response) => {
        //console.log(response);
        //console.log(response.profileObj);
        profile.push(response.profileObj.email)
        profile.push(response.profileObj.familyName);
        profile.push(response.profileObj.givenName);
        profile.push(response.profileObj.googleId);
        profile.push(response.profileObj.imageUrl);
        profile.push(response.profileObj.name);
        //console.log(profile);
        
        setprofImage(response.profileObj.imageUrl);
        setprofName(response.profileObj.name);
        
       
        Socket.emit('google user', {
            //'login': response.profileObj.name
             'login': profile
        });
        ChangeVis()
    }
    
    function handleSubmit(event) {
        
        let newMessage_actual = document.getElementById("message_input");
        let pName = profName+": "+newMessage_actual.value;
        
        let newMessage = document.getElementById("message_input");
        Socket.emit('new message input', {
            'message': pName
            //newMessage.value
        });
        
        console.log('Sent the message ' + newMessage.value + ' to server!');
        newMessage.value = ''
        
        console.log(pName);
        /*
        var final = "default";
        Socket.on('names', final);
        console.log(final);
        Socket.off('names', final);
        */
        event.preventDefault();
    }
    

    
    //<button id="Log_in" onClick={ChangeVis}>Log in</button>
    function ChangeVis() {
     var form = document.getElementById("DISPLAY");
     var inn = document.getElementById("Log_in");
     var out = document.getElementById("Log_out");
     
      if (form.style.visibility == "hidden") 
      {
          form.style.visibility = "visible";
          inn.style.visibility = "hidden";
          //out.style.visibility = "visible";
      }
      
      else 
      {
          form.style.visibility = "hidden";
          inn.style.visibility = "visible";
          //out.style.visibility = "hidden";
      }
       
    }
    // <button id="Log_out" onClick={ChangeVis} style={{  visibility: "hidden" }}>Log out</button>
    //<img src="https://lh3.google.com/u/0/ogw/ADGmqu8YHsLqEtRWmgfuel5SpJ-PKa6l4i4b9VIx_q0I=s32-c-mo" />
    
        return (
            <div id="display">
                <h1>Chit Chat Messaging</h1>
                <GoogleLogin
                    id="Log_in"
                    onClick={ChangeVis}
                    style={{  visibility: "hidden" }}
                    clientId="190844366643-nciscp4v2hcm2efpf4auuf8pkkrrct8c.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'} />
               

                <form id="DISPLAY" onSubmit={handleSubmit} style={{  visibility: "hidden" }}>
                    <input id="message_input" placeholder="Enter a message"></input>
                    <button>send</button>
                </form>
                <div className="profile">
                    <img id="ppic" src={profImage} />
                    <h1 id="pname">{profName}</h1>
                </div>   
                  
            </div>
        );
    
   
}
