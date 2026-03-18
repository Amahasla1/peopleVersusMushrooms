import React, { useState } from 'react';
import Server from '../services/server/Server';
import Registration from './Registration/Registration';
import Login from './Login/Login';
import Chat from './Chat/Chat'
import Lobby from './Lobby/Lobby';
import Store from '../services/Store/Store';

import Mediator from '../services/Mediator/Mediator';

export enum PAGES {
    LOGIN,
    REGISTRATION,
    CHAT,
    LOBBY
}

export interface IBasePage {
    setPage: (name: PAGES) => void;
}

export interface IPageManager {
    server: Server,
    store: Store,
    mediator: Mediator
}

const PageManager: React.FC<IPageManager> = (propsManager: IPageManager) => {
    const [page, setPage] = useState<PAGES>(PAGES.LOGIN);

    const props = {
        setPage,
        ...propsManager
    }

    return (
        <>
            {page === PAGES.REGISTRATION && <Registration {...props} />}
            {page === PAGES.LOGIN && <Login {...props} />}
            {page === PAGES.CHAT && <Chat {...props} />}
            {page === PAGES.LOBBY && <Lobby {...props} />}
        </>
    );
}

export default PageManager;