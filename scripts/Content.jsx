    
import * as React from 'react';


import { Button } from './Button';
import { Socket } from './Socket';

export function Content() {
    const [addresses, setAddresses] = React.useState([]);
    
    function getNewAddresses() {
        React.useEffect(() => {
            Socket.removeAllListeners();
            Socket.on('messages received', updateAddresses);
            return () => {
                Socket.off('messages received', updateAddresses);
            }
        });
    }
    //put message on correct channel
    
    function updateAddresses(data) {
        console.log("Received messages from server: " + data['allAddresses']);
        //addresses.push(data['address']);
        //setAddresses(() => addresses.map((address, index) => key={index} {address}));
        setAddresses(data['allAddresses']);
        return addresses;
    }
    
    getNewAddresses();

    return (
        <div className="Title">
            <h1>Chat Room!</h1>
            <Button />
                <div className="List">
                    <ul>
                        {
                            //addresses.map((address, index) =>
                            //addresses.map((address) => <li>{address}</li>)
                            addresses.map((address, index) => <li key ={index}>{address}</li>)
                        }
                    </ul>
                 </div>
        </div>
    );
}


  /*
    function getNewAddresses() 
    {
        React.useEffect(() => {
            Socket.on('address received', (data) => {
                console.log("Received addresses from server: " + data['address']);
                addresses.push(data['address']);
                //setAddresses(() => addresses.map((address, index) => key={index} {address}));
            })
        });
         return addresses;
    }
    */