//import * as React from 'react';
import React, { useState } from "react";
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

    /*
    const [lst, setLst] = useState([]);

    function submitData() 
    {
        lst.push(document.getElementById("message_input").value);
        setLst(() => lst.map((x) => x));
        //const map1 = lst.map((x) => x);
        //console.log(map1);
        return lst;
        
        <span>
              <ul>
                {lst.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </span>
            onClick={submitData}
    }
    */
    
    return (
        <form onSubmit={handleSubmit}>
            <input id="message_input" placeholder="Enter a message"></input>
            <button>Send</button>
        </form>
    );
}
