"use client";

import { useEffect, useRef } from 'react';
import { useWsContext } from '@/libs/ws-context';
import type { Side, Square } from './chess-logic';

// 後端 wire 格式（唯一契約來源見 docs/chess-wire-protocol.md）。
// 信封固定 { type, data }；color/side/turn/winner 全小寫 "red"/"black"。

export type GameOverReason =
    | 'checkmate' | 'stalemate' | 'timeout' | 'resign' | 'disconnect' | 'draw_60';

export type TableStatus = 'waiting' | 'playing';
export interface Table { id: number; name: string; status: TableStatus; }

export interface TableListData { tables: Table[]; }
export interface TableCreatedData { table_id: number; }
export interface MatchFoundData { color: Side; clock_ms: number; table_id: number; }
export interface MoveMadeData {
    from: Square; to: Square; turn: Side;
    clock: { red: number; black: number };
}
export interface CheckData { side: Side; }
export interface GameOverData { winner: Side | null; reason: GameOverReason; }
export interface QueuedData { position: number; }
// illegal_move.reason：引擎 PascalCase（NotYourTurn…）+ 協定 snake（bad_coord）
export interface IllegalMoveData { reason: string; }
// error.reason（snake）：already_committed / bad_table_id / table_not_found /
//   table_full / cannot_join_self / not_in_game / game_ended
export interface ErrorData { reason: string; }

export interface ChessHandlers {
    onTableList: (d: TableListData) => void;     // 回應 join_lobby / list_tables
    onLobbyUpdate: (d: TableListData) => void;   // 桌況變動推播
    onTableCreated: (d: TableCreatedData) => void;
    onQueued: (d: QueuedData) => void;
    onMatchFound: (d: MatchFoundData) => void;
    onMoveMade: (d: MoveMadeData) => void;
    onCheck: (d: CheckData) => void;
    onGameOver: (d: GameOverData) => void;
    onIllegalMove: (d: IllegalMoveData) => void;
    onError: (d: ErrorData) => void;
}

export interface ChessActions {
    joinLobby: () => void;
    listTables: () => void;
    createTable: (name?: string) => void;
    joinTable: (tableId: number) => void;
    leaveTable: () => void;
    joinQueue: () => void;
    leaveQueue: () => void;
    move: (from: Square, to: Square) => void;
    resign: () => void;
}

export function useChessSocket(handlers: ChessHandlers): ChessActions {
    const { subscribe, unsubscribe, send } = useWsContext();
    // handlers 可能每 render 變動，用 ref 取最新，避免反覆 sub/unsub。
    // ref 更新放 effect（commit 後），WS 事件為非同步，取到的恆為最新 committed handlers。
    const ref = useRef(handlers);
    useEffect(() => { ref.current = handlers; });

    useEffect(() => {
        const map: Record<string, (data: unknown) => void> = {
            table_list: d => ref.current.onTableList(d as TableListData),
            lobby_update: d => ref.current.onLobbyUpdate(d as TableListData),
            table_created: d => ref.current.onTableCreated(d as TableCreatedData),
            queued: d => ref.current.onQueued(d as QueuedData),
            match_found: d => ref.current.onMatchFound(d as MatchFoundData),
            move_made: d => ref.current.onMoveMade(d as MoveMadeData),
            check: d => ref.current.onCheck(d as CheckData),
            game_over: d => ref.current.onGameOver(d as GameOverData),
            illegal_move: d => ref.current.onIllegalMove(d as IllegalMoveData),
            error: d => ref.current.onError(d as ErrorData),
        };
        const entries = Object.entries(map);
        entries.forEach(([type, fn]) => subscribe(type, fn));
        return () => entries.forEach(([type, fn]) => unsubscribe(type, fn));
    }, [subscribe, unsubscribe]);

    return {
        joinLobby: () => send('join_lobby'),
        listTables: () => send('list_tables'),
        createTable: (name) => send('create_table', name ? { name } : {}),
        joinTable: (tableId) => send('join_table', { table_id: tableId }),
        leaveTable: () => send('leave_table'),
        joinQueue: () => send('join_queue'),
        leaveQueue: () => send('leave_queue'),
        move: (from, to) => send('move', { from, to }),
        resign: () => send('resign'),
    };
}
