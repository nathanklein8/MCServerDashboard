import React, { useState, useEffect } from 'react';
import './ServerCard.css'
import Modal from './OptionsMenu';
import OptionsMenu from './OptionsMenu';

// pass in 'server' as a json object w/ properties name, type, version
// server json objects obtained by fetch(/servers).servers
const ServerCard = ({ server }) => {
    return (
        <div className='ServerCard'>
            <p className='BiggerText'>{server.name}</p>
            <p>{server.type} {server.version}</p>
            <div>
                <button className='Button StartButton' onClick={() => {

                }}>start</button>
                <button className='Button StopButton' onClick={() => {

                }}>stop</button>
                <button className='Button' onClick={() => {

                }}>restart</button>
                <OptionsMenu serverName={server.name} />
            </div>
        </div>
    )
}

export default ServerCard