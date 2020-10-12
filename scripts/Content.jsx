    
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
    
    function updateAddresses(data) {
        console.log("Received messages from server: " + data['allAddresses']);
        setAddresses(data['allAddresses']);
    }
    /*
    function getNewAddresses() 
    {
        React.useEffect(() => {
            Socket.on('address received', (data) => {
                console.log("Received addresses from server: " + data['allAddresses']);
                setAddresses(data['allAddresses']);
            })
        });
    }
    */
    
    getNewAddresses();

    return (
        <div class="Title">
            <h1>Chat Room!</h1>
                <ol>
                    {
                       addresses.map((address, index) =>
                       <li>{address}</li>)
                        //addresses.map((address, index) => <li key ={index}>{addresses}</li>)
                    }
                </ol>
            <Button />
        </div>
    );
}
