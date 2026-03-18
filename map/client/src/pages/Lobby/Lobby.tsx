import React from "react";
import { IBasePage, IPageManager, PAGES } from '../PageManager';
import Button from "../../components/Button/Button";
import './Lobby.scss';

const Lobby: React.FC<IBasePage & IPageManager> = (props) => {
    const { setPage, server } = props;

    const logoutClickHandler = async () => {
        server.logout();
        setPage(PAGES.LOGIN);
    }

    return (<div className='lobby'>
        <Button
            onClick={logoutClickHandler}
            text='выйти'
            className='button-logout'
            id='test-button-logout'
        />
    </div>)
}

export default Lobby;