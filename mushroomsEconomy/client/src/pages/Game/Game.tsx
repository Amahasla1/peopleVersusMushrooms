import React from 'react';
import { IBasePage } from '../PageManager';
import GameCanvas from './GameCanvas';

import "./Game.css"

const GAME_FIELD = 'game-field';

const Village: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage, store, mediator, server } = props;
    
    return (
    <div className='game'>
        <div>
            <GameCanvas />
        </div>
    </div>
);
};

export default Village;