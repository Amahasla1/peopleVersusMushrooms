// pages/Game/Game.tsx
import React, { useEffect, useRef, useState, useContext } from 'react';
import { MediatorContext } from '../../App';
import CONFIG from '../../config';
import { drawGame } from './renderer';
import { GameState } from './types';
import './Game.css';

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameStateRef = useRef<GameState | null>(null);
  const mediator = useContext(MediatorContext);
  const [isGameOver, setIsGameOver] = useState(false);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const widthCSS = canvas.clientWidth;
    const heightCSS = canvas.clientHeight;
    if (widthCSS === 0 || heightCSS === 0) return;

    drawGame(ctx, gameStateRef.current, widthCSS, heightCSS);
  };

  // Настройка canvas и ресайза
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (displayWidth === 0 || displayHeight === 0) return;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        redrawCanvas();
      }
    };

    resizeCanvas();

    let rafId: number | null = null;
    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        resizeCanvas();
        rafId = null;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Подписка на обновления игрового состояния
  useEffect(() => {
    if (!mediator) return;

    const EVENT_NAME = CONFIG.MEDIATOR.EVENTS.GAME_STATE_UPDATED;
    const handler = (newState: GameState) => {
      console.log('[Game] State updated', newState);
      gameStateRef.current = newState;
      redrawCanvas();
    };

    mediator.subscribe(EVENT_NAME, handler);

    // Тестовая эмуляция (через 1 секунду)
    const timeoutId = setTimeout(() => {
      const fakeState: GameState = {
        map: Array(50).fill(null).map((_, y) =>
          Array(50).fill(null).map((_, x) => {
            if (y > 40) return 1;
            if (x > 45 && y < 10) return 2;
            return 0;
          })
        ),
        units: [
          { id: 'u1', x: 10, y: 10, type: 'sporomet', hp: 80, maxHp: 100 },
          { id: 'u2', x: 30, y: 20, type: 'shampigneb', hp: 45, maxHp: 100 },
          { id: 'u3', x: 40, y: 40, type: 'sporomet', hp: 0, maxHp: 100 },
        ],
        slimePuddles: [
          { x: 25, y: 25, radius: 0.4 },
          { x: 15, y: 35, radius: 0.3 },
        ],
      };
      mediator.call(EVENT_NAME, fakeState);
    }, 1000);

    return () => {
      mediator.unsubscribe(EVENT_NAME, handler);
      clearTimeout(timeoutId);
    };
  }, [mediator]);

  // Подписка на окончание игры
  useEffect(() => {
    if (!mediator) return;
    const GAME_OVER_EVENT = CONFIG.MEDIATOR.EVENTS.GAME_OVER;
    const handler = () => setIsGameOver(true);
    mediator.subscribe(GAME_OVER_EVENT, handler);
    return () => mediator.unsubscribe(GAME_OVER_EVENT, handler);
  }, [mediator]);

  const handleExitToLobby = () => {
    // Здесь будет логика перехода в лобби
    console.log('Выход в лобби');
  };

  const handleGoToLobby = () => {
    setIsGameOver(false);
    handleExitToLobby();
  };

  return (
    <div className="game-page">
      <header className="game-header">
        <div className="game-user">
          Имя пользователя: <strong>Player</strong>
        </div>
        <button type="button" className="game-exit" onClick={handleExitToLobby}>
          Выход в лобби
        </button>
      </header>

      <div className="game-canvas-wrapper">
        <canvas ref={canvasRef} className="game-canvas" />
      </div>

      {isGameOver && (
        <div className="game-overlay">
          <div className="game-overlay-content">
            <h2>Игра окончена</h2>
            <button onClick={handleGoToLobby}>В лобби</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;