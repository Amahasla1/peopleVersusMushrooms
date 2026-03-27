import React, { createContext, useEffect, useMemo, useState } from 'react';
import PageManager, { PAGES } from './pages/PageManager';
import { authStorage } from './utils/authStorage';
import Mediator from './services/Mediator/Mediator';
import Server from './services/server/Server';
import CONFIG from './config'

//import PageManager from './pages/PageManager';

import './App.css';

export const MediatorContext = createContext<any>(null!);
export const ServerContext = createContext<any>(null!);

function App() {
  const [page, setPage] = useState<PAGES>(PAGES.LOGIN);

  const mediator = useMemo(() => new Mediator(CONFIG.MEDIATOR), []);
  const server = useMemo(() => new Server(mediator), [mediator]);


useEffect(() => {
    const { token } = authStorage.getAuth();

    if (!token) {
        setPage(PAGES.LOGIN);
        return;
    }



    //привожу к any,тк метода в Server.ts еще нет
    const serverAny = server as any;
    const mediatorAny = mediator as any;

    
    serverAny.authValidate(token).then((response: any) => {
        if (response?.result === 'ok') {
            mediatorAny.call('USER_LOGGED_IN', response.user); 
            setPage(PAGES.LOBBY);
        } 
        else {
            authStorage.clearAuth();
            setPage(PAGES.LOGIN);
        }
    });
}, [server, mediator]);


return (
    <div className="App">
        <div className='app'>
          <PageManager 
            page={page} 
            setPage={setPage} 
            mediator={mediator} 
            server={server} 
          />
        </div>
    </div>
  );
}

export default App;
