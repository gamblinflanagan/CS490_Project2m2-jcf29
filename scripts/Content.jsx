    
import * as React from 'react';

import Linkify from 'react-linkify';
import { Button } from './Button';
import { Socket } from './Socket';

export function Content() {
    const [messages, setMessages] = React.useState([]);
    
    function getNewAddresses() {
        React.useEffect(() => {
            Socket.removeAllListeners();
            Socket.on('messages received', updateMessages);
            return () => {
                Socket.off('messages received', updateMessages);
            }
        });
    }
    //put message on correct channel
    
    function updateMessages(data) {
        console.log("Received messages from server: " + data['allMessages']);
        //addresses.push(data['address']);
        //setAddresses(() => addresses.map((address, index) => key={index} {address}));
        setMessages(data['allMessages']);
        return messages;
    }
    
    getNewAddresses();

    return (
        <div className="All">
            <div className="Title">
                <Button />
            </div>
            <div className="List">
                <Linkify>
                    <ul>
                        {
                            //addresses.map((address, index) =>
                            //addresses.map((address) => <li>{address}</li>)
                            messages.map((message, index) => <li key ={index}>{message}</li>)
                        }
                    </ul>
                </Linkify>
            </div>
        </div>
    );
}