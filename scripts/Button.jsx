//import * as React from 'react';
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { Socket } from './Socket';

export function Button() 
{
    function handleSubmit(event) {
        let newMessage = document.getElementById("message_input");
        Socket.emit('new message input', {
            'message': newMessage.value
        });
        
        console.log('Sent the message ' + newMessage.value + ' to server!');
        newMessage.value = ''
        
        event.preventDefault();
    }
    
    
    const responseGoogle = (response) => {
        var profile = []
        //console.log(response);
        //console.log(response.profileObj);
        profile.push(response.profileObj.email)
        profile.push(response.profileObj.familyName);
        profile.push(response.profileObj.givenName);
        profile.push(response.profileObj.googleId);
        profile.push(response.profileObj.imageUrl);
        profile.push(response.profileObj.name);
        console.log(profile);
        
        Socket.emit('google user', {
            //'login': response.profileObj.name
             'login': profile
        });
        ChangeVis()
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
          out.style.visibility = "visible";
      }
      
      else 
      {
          form.style.visibility = "hidden";
          inn.style.visibility = "visible";
          out.style.visibility = "hidden";
      }
       
    }
    
    
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
                <button id="Log_out" onClick={ChangeVis} style={{  visibility: "hidden" }}>Log out</button>
                
                
                <form id="DISPLAY" onSubmit={handleSubmit} style={{  visibility: "hidden" }}>
                    <input id="message_input" placeholder="Enter a message"></input>
                    <button>send</button>
                </form>
            </div>
        );
    
}
