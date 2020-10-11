//import * as React from 'react';
import React, { useState } from "react";
import { Socket } from './Socket';

export function Button() 
{
    function handleSubmit(event) {
        let newAddress = document.getElementById("message_input");
        Socket.emit('new address input', {
            'address': newAddress.value
        });
        
        console.log('Sent the message ' + newAddress.value + ' to server!');
        newAddress.value = ''
        
        event.preventDefault();
    }


    const [lst, setLst] = useState([]);

    function submitData() 
    {
        lst.push(document.getElementById("message_input").value);
        setLst(() => lst.map((x) => x));
        //const map1 = lst.map((x) => x);
        //console.log(map1);
        return lst;
    }
    
    
    return (
        <form onSubmit={handleSubmit}>
            <input id="message_input" placeholder="Enter a message"></input>
            <button onClick={submitData}>Send</button>
            <div className="List">
            <span>
              <ul>
                {lst.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </span>
          </div>
        </form>
    );
}
