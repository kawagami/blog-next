"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, Flag, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Board } from './Board';
import { Clock } from './Clock';
import { sound } from './chess-sound';
import {
    applyMove, initialBoard, key, opponent,
    type Board as BoardModel, type Side, type Square,
} from './chess-logic';
import { useChessSocket, type GameOverReason } from './useChessSocket';

type Phase = 'connecting' | 'queued' | 'playing' | 'over';

interface Result { winner: Side | null; reason: GameOverReason; }

export default function ChessGame() {
    const t = useTranslations('Chess');

    const [phase, setPhase] = useState<Phase>('connecting');
    const [myColor, setMyColor] = useState<Side>('red');
    const [board, setBoard] = useState<BoardModel>(() => initialBoard());
    const [turn, setTurn] = useState<Side>('red');
    const [clock, setClock] = useState<{ red: number; black: number }>({ red: 300000, black: 300000 });
    const [selected, setSelected] = useState<Square | null>(null);
    const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
    const [checkSide, setCheckSide] = useState<Side | null>(null);
    const [result, setResult] = useState<Result | null>(null);
    const [shake, setShake] = useState(false);
    const [muted, setMuted] = useState(false);
    // 送出走步後等 server move_made 回覆，期間鎖盤面防重送
    const [pending, setPending] = useState(false);

    // board 的鏡像 ref，供 WS callback（非 render）判斷吃子，不在 render 期讀 state-ref
    const boardRef = useRef(board);
    useEffect(() => { boardRef.current = board; }, [board]);

    const actions = useChessSocket({
        onQueued: () => setPhase('queued'),
        onMatchFound: ({ color, clock_ms }) => {
            setMyColor(color);
            setBoard(initialBoard());
            setTurn('red');
            setClock({ red: clock_ms, black: clock_ms });
            setSelected(null);
            setLastMove(null);
            setCheckSide(null);
            setResult(null);
            setPending(false);
            setPhase('playing');
        },
        onMoveMade: ({ from, to, turn: nextTurn, clock: c }) => {
            if (boardRef.current.has(key(to[0], to[1]))) sound.capture(); else sound.move();
            setBoard(prev => applyMove(prev, from, to));
            setLastMove({ from, to });
            setTurn(nextTurn);
            setClock(c);
            setCheckSide(null);
            setSelected(null);
            setPending(false);
        },
        onCheck: ({ side }) => {
            setCheckSide(side);
            sound.check();
        },
        onGameOver: (data) => {
            setResult(data);
            setPhase('over');
            setSelected(null);
            setPending(false);
            sound.gameOver();
        },
        onIllegalMove: () => {
            setShake(true);
            setSelected(null);
            setPending(false);
            setTimeout(() => setShake(false), 400);
        },
    });

    // 進頁自動配對（一次）
    const startedRef = useRef(false);
    useEffect(() => {
        if (startedRef.current) return;
        startedRef.current = true;
        actions.joinQueue();
        setPhase('queued');
    }, [actions]);

    const myTurn = phase === 'playing' && turn === myColor;
    const interactive = myTurn && !pending;

    const onPoint = useCallback((c: number, r: number) => {
        sound.warmup(); // 首個使用者手勢，解 autoplay 鎖
        if (!interactive) return;
        const piece = board.get(key(c, r));
        if (piece && piece.side === myColor) {
            setSelected([c, r]); // 選/改選己方子
            return;
        }
        if (selected) {
            // 走子：送 server 裁判，等 move_made 才落定
            setPending(true);
            actions.move(selected, [c, r]);
        }
    }, [interactive, board, myColor, selected, actions]);

    const toggleMute = () => {
        const next = !muted;
        setMuted(next);
        sound.setMuted(next);
    };

    const replay = () => {
        actions.joinQueue();
        setPhase('queued');
        setResult(null);
    };

    const resultText = (): { title: string; reason: string } => {
        if (!result) return { title: '', reason: '' };
        const reason = t(`reason_${result.reason}`);
        if (result.winner === null) return { title: t('draw'), reason };
        return { title: result.winner === myColor ? t('win') : t('lose'), reason };
    };

    return (
        <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 py-4 lg:max-w-2xl xl:max-w-3xl">
            {/* 對手時鐘（上） */}
            <div className="w-full">
                <Clock
                    key={`opp-${clock[opponent(myColor)]}`}
                    side={opponent(myColor)}
                    label={t('opponent')}
                    baseMs={clock[opponent(myColor)]}
                    running={phase === 'playing' && turn !== myColor}
                />
            </div>

            {/* 棋盤 */}
            <div className={['relative w-full', shake ? 'animate-[shake_0.4s]' : ''].join(' ')}>
                <Board
                    board={board}
                    myColor={myColor}
                    selected={selected}
                    lastMove={lastMove}
                    checkSide={checkSide}
                    interactive={interactive}
                    onPoint={onPoint}
                />

                {/* 配對中遮罩 */}
                {(phase === 'connecting' || phase === 'queued') && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-neutral-900/70 backdrop-blur-sm">
                        <Loader2 className="h-10 w-10 animate-spin text-primary-400" />
                        <p className="text-sm text-neutral-100">{t('queueing')}</p>
                    </div>
                )}

                {/* 結束遮罩 */}
                {phase === 'over' && result && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-neutral-900/80 px-6 text-center backdrop-blur-sm">
                        <p className="text-2xl font-bold text-neutral-50">{resultText().title}</p>
                        <p className="text-sm text-neutral-300">{resultText().reason}</p>
                        <button
                            onClick={replay}
                            className="mt-2 flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                        >
                            <RotateCcw className="h-4 w-4" />
                            {t('playAgain')}
                        </button>
                    </div>
                )}
            </div>

            {/* 我方時鐘（下）＋ 控制 */}
            <div className="flex w-full items-center gap-3">
                <div className="flex-1">
                    <Clock
                        key={`me-${clock[myColor]}`}
                        side={myColor}
                        label={`${t('you')}（${myColor === 'red' ? t('red') : t('black')}）`}
                        baseMs={clock[myColor]}
                        running={myTurn}
                    />
                </div>
                <button
                    onClick={toggleMute}
                    aria-label={muted ? t('soundOn') : t('soundOff')}
                    className="rounded-lg border border-neutral-200 p-2 text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                    {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                {phase === 'playing' && (
                    <button
                        onClick={actions.resign}
                        className="flex items-center gap-2 rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
                    >
                        <Flag className="h-4 w-4" />
                        {t('resign')}
                    </button>
                )}
            </div>

            {/* 狀態提示 */}
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {phase === 'playing' && (myTurn ? t('yourTurn') : t('opponentTurn'))}
                {checkSide && phase === 'playing' && <span className="ml-2 font-semibold text-red-500">{t('check')}</span>}
            </p>
        </div>
    );
}
