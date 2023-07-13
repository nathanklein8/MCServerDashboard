import React, { useState, useEffect } from 'react';
import './App.css';
import ServerCard from './Components/ServerCard';
import NewServerMenu from './Components/NewServerMenu'

function App() {

  // data from flask API on what servers exist
  const [numServers, setNumServers] = useState(0);
  const [serverList, setServerList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch('/servers').then(res => res.json()).then(data => {
      setNumServers(data.numServers);
      setServerList(data.servers);
    });
  }, []);

  return (
    <div className='TextFormat'>
      {
        numServers === 0
          ? (
            <div>Unable to find any servers at the current directory.</div>
          ) : (numServers === 1
            ? (
              <div>1 server installed</div>
            ) : (<div>{numServers} servers installed</div>))
      }
      <button onClick={() => {
        fetch('/servers').then(res => res.json()).then(data => {
          setNumServers(data.numServers);
          setServerList(data.servers);
        });
        setRefresh(!refresh)
      }}>
        refresh server list
      </button>
      <NewServerMenu />
      <div>
        {serverList.map((s) => (
          <ServerCard server={s} />
        ))}
      </div>
    </div>
  );
}

export default App;
