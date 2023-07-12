import React, { useState } from 'react';
import './ServerCard.css'
import OptionsMenu from './OptionsMenu';

// pass in 'server' as a json object w/ properties name, type, version
// server json objects obtained by fetch(/servers).servers
const ServerCard = ({ server }) => {

    let timer
    let checkDelay = 2 // seconds

    const [online, setOnline] = useState(false);
    const [starting, setStarting] = useState(false);
    const [stopping, setStopping] = useState(false);

    function checkOnline() {
        console.log("checking online")
        fetch("/online?name=" + server.name).then(res => res.json()).then(data => {
            if (data.online) {
                setOnline(data.online);
                setStarting(false);
                clearInterval(timer);
                console.log("finished starting!");
            }
        });
    }

    function checkOffline() {
        console.log("checking offline")
        fetch("/online?name=" + server.name).then(res => res.json()).then(data => {
            if (!data.online) {
                setOnline(data.online);
                setStopping(false);
                clearInterval(timer);
                console.log("finished stopping");
            }
        });
    }

    return (
        <div className='ServerCard'>
            <p className='BiggerText'>{server.name}</p>
            <p>{server.type} {server.version}</p>
            <div>
                {
                    online ? ( // server is online
                        <button className='Button StopButton' onClick={() => {
                            setStopping(true);
                            // send message to run stop script
                            const url = "/stop-server?name=" + server.name
                            fetch(url).then(res => res.json()).then(data => {
                                console.log(data.message)
                            });
                            timer = setInterval(checkOffline, checkDelay * 1000);
                        }}>{stopping ? (<>stopping</>) : (<>stop</>)}</button>
                    ) : ( // server is offline
                        <button className='Button StartButton' onClick={() => {
                            setStarting(true);
                            // send message to run start script
                            fetch("/start-server?name=" + server.name).then(res => res.json()).then(data => {
                                console.log(data.message)
                            });
                            timer = setInterval(checkOnline, checkDelay * 1000);
                        }}>{starting ? (<>starting...</>) : (<>start</>)}</button>
                    )
                }
                <OptionsMenu serverName={server.name} />
            </div>
        </div>
    )
}

export default ServerCard