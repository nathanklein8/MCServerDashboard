import React, { useState, useEffect } from 'react';
import './ServerCard.css'
import Modal from './OptionsMenu';
import OptionsMenu from './OptionsMenu';

// pass in 'server' as a json object w/ properties name, type, version
// server json objects obtained by fetch(/servers).servers
const ServerCard = ({ server }) => {

    const [online, setOnline] = useState(false);


    return (
        <div className='ServerCard'>
            <p className='BiggerText'>{server.name}</p>
            <p>{server.type} {server.version}</p>
            <div>
                {
                    online ? ( // server is online
                        <>
                            <button className='Button StopButton' onClick={() => {
                                setOnline(false);
                                const url = "/stop-server?name=" + server.name
                                fetch(url).then(res => res.json()).then(data => {
                                    console.log(data.message)
                                });
                            }}>stop</button>
                            <button className='Button RestartButton' onClick={() => {
                                // code to restart server
                            }}>restart</button>
                        </>
                    ) : ( // server is offline
                        <button className='Button StartButton' onClick={() => {
                            setOnline(true);
                            const url = "/start-server?name=" + server.name
                            fetch(url).then(res => res.json()).then(data => {
                                console.log(data.message)
                            });
                        }}>start</button>
                    )
                }
                <OptionsMenu serverName={server.name} />
            </div>
        </div>
    )
}

export default ServerCard