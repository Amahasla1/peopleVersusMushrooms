import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { IBasePage, PAGES } from '../PageManager';
import CONFIG from '../../config';
import './Lobby.css';

const Lobby: React.FC<IBasePage> = ({ mediator, setPage }) => {
    const [lobbyName, setLobbyName] = useState('Моё лобби');

    const guid: string | null = mediator.get(CONFIG.MEDIATOR.TRIGGERS.GET_STORE, 'guid');
    const socket: Socket | null = mediator.get(CONFIG.MEDIATOR.TRIGGERS.GET_STORE, 'socket');

    useEffect(() => {
        if (!socket) {
            console.warn('[Lobby] нет подключения к серверу — войдите снова');
            return;
        }

        const onCreateAck = (response: { result?: string; error?: string; data?: unknown }) => {
            if (response?.result === 'ok') {
                console.log('[Lobby] CREATE_LOBBY ok', response);
                return;
            }
            console.error('[Lobby] CREATE_LOBBY', response?.error ?? response);
        };

        const onLeaveAck = (response: { result?: string; error?: string }) => {
            if (response?.result === 'ok') {
                console.log('[Lobby] LEAVE_LOBBY ok', response);
                return;
            }
            console.error('[Lobby] LEAVE_LOBBY', response?.error ?? response);
        };

        const onLobbyUpdated = (response: { result?: string; data?: unknown }) => {
            if (response?.result === 'ok' && response.data != null) {
                console.log('[Lobby] LOBBY_UPDATED', response.data);
            }
        };

        socket.on(CONFIG.SOCKETS.CREATE_LOBBY, onCreateAck);
        socket.on(CONFIG.SOCKETS.LEAVE_LOBBY, onLeaveAck);
        socket.on(CONFIG.SOCKETS.LOBBY_UPDATED, onLobbyUpdated);

        return () => {
            socket.off(CONFIG.SOCKETS.CREATE_LOBBY, onCreateAck);
            socket.off(CONFIG.SOCKETS.LEAVE_LOBBY, onLeaveAck);
            socket.off(CONFIG.SOCKETS.LOBBY_UPDATED, onLobbyUpdated);
        };
    }, [socket]);

    const createLobby = () => {
        if (!socket || !guid) {
            console.warn('[Lobby] нет сокета или guid');
            return;
        }
        socket.emit(CONFIG.SOCKETS.CREATE_LOBBY, {
            guid,
            lobbyName: lobbyName.trim() || 'Лобби',
        });
    };

    const leaveLobby = () => {
        if (!socket || !guid) {
            console.warn('[Lobby] нет сокета или guid');
            return;
        }
        socket.emit(CONFIG.SOCKETS.LEAVE_LOBBY, { guid });
    };

    return (
        <div className="lobby-page">
            <div className="lobby-card">
                <h1 className="lobby-title">Лобби</h1>

                <label className="lobby-label" htmlFor="lobby-name">
                    Название
                </label>
                <input
                    id="lobby-name"
                    className="lobby-input"
                    value={lobbyName}
                    onChange={(e) => setLobbyName(e.target.value)}
                    disabled={!socket || !guid}
                />

                <div className="lobby-actions">
                    <button
                        type="button"
                        className="lobby-btn lobby-btn-primary"
                        onClick={createLobby}
                        disabled={!socket || !guid}
                    >
                        Создать лобби
                    </button>
                    <button
                        type="button"
                        className="lobby-btn lobby-btn-secondary"
                        onClick={leaveLobby}
                        disabled={!socket || !guid}
                    >
                        Выйти из лобби
                    </button>
                    <button
                        type="button"
                        className="lobby-btn lobby-btn-ghost"
                        onClick={() => setPage(PAGES.GAME)}
                    >
                        ← К игре
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Lobby;
