    
import * as React from 'react';


import { Button } from './Button';
import { Socket } from './Socket';

export function Content() {
    const [addresses, setAddresses] = React.useState([]);
    
    function getNewAddresses() {
        React.useEffect(() => {
            Socket.on('addresses received', updateAddresses);
            return () => {
                Socket.off('addresses received', updateAddresses);
            }
        });
    }
    //put message on correct channel
    
    function updateAddresses(data) {
        console.log("Received messages from server: " + data['allAddresses']);
        addresses.push(data['address']);
        //setAddresses(() => addresses.map((address, index) => key={index} {address}));
        setAddresses(data['allAddresses']);
        return addresses;
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
    
    getNewAddresses();

    return (
        <div className="Title">
            <h1>Chat Room!</h1>
                <ol>
                    {
                       //addresses.map((address, index) =>
                       //addresses.map((address) => <li>{address}</li>)
                        addresses.map((address, index) => <li key ={index}>{addresses}</li>)
                    }
                </ol>
            <Button />
        </div>
    );
}
