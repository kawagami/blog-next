'use client';

import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SnakeGame = () => {
    const [serverMessage, setServerMessage] = useState(null);
    const [connected, setConnected] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [lastDirection, setLastDirection] = useState(null);
    const [gameStarted, setGameStarted] = useState(false); // 新增遊戲開始狀態
    const wsRef = useRef(null);
    const cellSize = 20;
    const boardWidth = 20;
    const boardHeight = 20;

    useEffect(() => {
        // 連接到 WebSocket 伺服器
        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/games/snake/${uuidv4()}`);
        wsRef.current = ws;

        ws.onopen = () => {
            // console.log('Connected to WebSocket server');
            setConnected(true);
        };

        ws.onmessage = (event) => {
            try {
                // 清理可能的額外字符
                let cleanData = event.data;
                if (typeof cleanData === 'string') {
                    const jsonEndIndex = cleanData.lastIndexOf('}');
                    if (jsonEndIndex !== -1) {
                        cleanData = cleanData.substring(0, jsonEndIndex + 1);
                    }
                }

                const message = JSON.parse(cleanData);
                // console.log('Received message:', message);
                setServerMessage(message);

                // 檢查遊戲結束條件（如果後端提供了這個信息）
                if (message.game_over) {
                    setGameOver(true);
                    setGameStarted(false); // 遊戲結束時重設開始狀態
                }
            } catch (error) {
                console.error('Failed to parse server message:', error, event.data);
            }
        };

        ws.onclose = () => {
            // console.log('Disconnected from WebSocket server');
            setConnected(false);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    // 處理鍵盤事件（遊戲控制和開始遊戲）
    useEffect(() => {
        const handleKeyDown = (event) => {
            // 處理 Enter 鍵開始遊戲
            // 處理 Enter 鍵：開始或重新開始遊戲
            if (event.key === 'Enter' && connected) {
                if (!gameStarted && !gameOver) {
                    startGame();
                } else if (gameOver) {
                    restartGame();
                }
                return;
            }

            // 如果遊戲未開始，不處理方向控制
            if (!gameStarted || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

            let direction = null;

            switch (event.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    direction = 'Up';
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    direction = 'Down';
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    direction = 'Left';
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    direction = 'Right';
                    break;
                default:
                    return;
            }

            // 避免發送相同的方向
            if (direction === lastDirection) return;
            setLastDirection(direction);

            // console.log('Sending direction:', direction);
            const clientMessage = { type: "ChangeDirection", direction: direction };

            wsRef.current.send(JSON.stringify(clientMessage));
        };

        window.addEventListener('keydown', handleKeyDown);

        // 清理函數
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lastDirection, connected, gameStarted, gameOver]);

    // 添加螢幕上的控制按鈕
    const sendDirection = (direction) => {
        if (!gameStarted || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

        // console.log('Sending direction from button:', direction);
        const clientMessage = { type: "ChangeDirection", direction: direction };
        wsRef.current.send(JSON.stringify(clientMessage));
        setLastDirection(direction);
    };

    // 開始遊戲
    const startGame = () => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const startMessage = { type: 'Start' };
            wsRef.current.send(JSON.stringify(startMessage));
            setGameStarted(true);
            setLastDirection(null);
            // console.log('Game started');
        }
    };

    // 重新開始遊戲
    const restartGame = () => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const restartMessage = { type: 'Restart' };
            wsRef.current.send(JSON.stringify(restartMessage));
            setGameOver(false);
            setGameStarted(true); // 重新開始時設置遊戲為開始狀態
            setLastDirection(null);
        }
    };

    const renderGameBoard = () => {
        if (!serverMessage) return null;

        const { snake, food, score } = serverMessage;

        // 檢查必要的數據是否存在且有效
        if (!Array.isArray(snake) || !Array.isArray(food)) {
            console.error('Invalid game state data:', serverMessage);
            return <div className="text-red-500">Waiting for valid game data...</div>;
        }

        const actualBoardWidth = boardWidth * cellSize;
        const actualBoardHeight = boardHeight * cellSize;

        return (
            <div>
                <div className="mb-2 text-lg font-bold">
                    <p>Score: {score || 0}</p>
                </div>
                <div
                    className="relative bg-gray-100 border-2 border-gray-800 my-5"
                    style={{
                        width: actualBoardWidth,
                        height: actualBoardHeight
                    }}
                >
                    {/* 渲染食物 - 處理數組格式 [x, y] */}
                    <div
                        className="absolute bg-red-500 rounded-full"
                        style={{
                            left: (food[0] || 0) * cellSize,
                            top: (food[1] || 0) * cellSize,
                            width: cellSize,
                            height: cellSize,
                        }}
                    />

                    {/* 渲染蛇身 - 每個片段都是數組 [x, y] */}
                    {snake.map((segment, index) => {
                        // 確保每個片段是有效的數組
                        if (!Array.isArray(segment) || segment.length < 2) {
                            console.error('Invalid snake segment:', segment);
                            return null;
                        }

                        return (
                            <div
                                key={index}
                                className={`absolute rounded ${index === 0 ? 'bg-green-800' : 'bg-green-500'}`}
                                style={{
                                    left: segment[0] * cellSize,
                                    top: segment[1] * cellSize,
                                    width: cellSize,
                                    height: cellSize,
                                }}
                            />
                        );
                    })}
                </div>

                {/* 只在遊戲開始後顯示控制按鈕 */}
                {gameStarted && (
                    <div className="flex flex-col items-center mt-4">
                        <button
                            onClick={() => sendDirection('Up')}
                            className="bg-blue-500 text-white w-12 h-12 mb-2 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            ↑
                        </button>
                        <div className="flex justify-center">
                            <button
                                onClick={() => sendDirection('Left')}
                                className="bg-blue-500 text-white w-12 h-12 mr-2 rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                                ←
                            </button>
                            <button
                                onClick={() => sendDirection('Down')}
                                className="bg-blue-500 text-white w-12 h-12 mr-2 rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                                ↓
                            </button>
                            <button
                                onClick={() => sendDirection('Right')}
                                className="bg-blue-500 text-white w-12 h-12 rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                                →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // 渲染等待開始的畫面
    const renderWaitingScreen = () => {
        return (
            <div className="text-center my-10">
                <h2 className="text-2xl font-bold text-blue-600 mb-6">Ready to play?</h2>
                <p className="mb-8">Press Enter or click the button below to start</p>
                <button
                    onClick={startGame}
                    className="px-6 py-3 text-lg bg-green-500 text-white border-0 rounded-lg cursor-pointer hover:bg-green-600 transition"
                >
                    Start Game
                </button>
            </div>
        );
    };

    return (
        <div className="w-full h-[calc(100svh-120px)] overflow-auto flex flex-col items-center">
            <title>Snake Game</title>

            <h1 className="text-3xl font-bold mb-6">Snake Game</h1>

            {!connected && <p className="text-yellow-600">Connecting to server...</p>}

            {connected && !gameStarted && !gameOver && renderWaitingScreen()}

            {connected && gameStarted && !gameOver && renderGameBoard()}

            {gameOver && (
                <div className="text-center my-5">
                    <h2 className="text-2xl font-bold text-red-600">Game Over!</h2>
                    <p className="my-2">Your score: {serverMessage?.score || 0}</p>
                    <button
                        onClick={restartGame}
                        className="px-5 py-2 text-base bg-green-500 text-white border-0 rounded cursor-pointer hover:bg-green-600"
                    >
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default SnakeGame;