"use client";

import { pieceChar, type Board as BoardModel, type Side, type Square } from './chess-logic';

const CELL = 64;
const MARGIN = 36;
const W = 8 * CELL + 2 * MARGIN;
const H = 9 * CELL + 2 * MARGIN;
const R = 26; // 棋子半徑

// 棋盤座標 → SVG 像素（依我方顏色翻轉，己方永遠在下；見 spec §7）
function project(col: number, row: number, myColor: Side): [number, number] {
    if (myColor === 'red') {
        return [MARGIN + col * CELL, MARGIN + (9 - row) * CELL];
    }
    // 黑方視角：兩軸翻轉
    return [MARGIN + (8 - col) * CELL, MARGIN + row * CELL];
}

export function Board({
    board, myColor, selected, lastMove, checkSide, interactive, onPoint,
}: {
    board: BoardModel;
    myColor: Side;
    selected: Square | null;
    lastMove: { from: Square; to: Square } | null;
    checkSide: Side | null;
    interactive: boolean;
    onPoint: (col: number, row: number) => void;
}) {
    const lines: React.ReactNode[] = [];

    // 橫線 10 條（每條整寬）
    for (let r = 0; r < 10; r++) {
        const [x1, y1] = project(0, r, myColor);
        const [x2, y2] = project(8, r, myColor);
        lines.push(<line key={`h${r}`} x1={x1} y1={y1} x2={x2} y2={y2} />);
    }
    // 直線：外側兩條整高；內側 7 條於河界（row4/5）斷開
    for (let c = 0; c < 9; c++) {
        if (c === 0 || c === 8) {
            const [x1, y1] = project(c, 0, myColor);
            const [x2, y2] = project(c, 9, myColor);
            lines.push(<line key={`v${c}`} x1={x1} y1={y1} x2={x2} y2={y2} />);
        } else {
            const [ax1, ay1] = project(c, 0, myColor);
            const [ax2, ay2] = project(c, 4, myColor);
            const [bx1, by1] = project(c, 5, myColor);
            const [bx2, by2] = project(c, 9, myColor);
            lines.push(<line key={`v${c}a`} x1={ax1} y1={ay1} x2={ax2} y2={ay2} />);
            lines.push(<line key={`v${c}b`} x1={bx1} y1={by1} x2={bx2} y2={by2} />);
        }
    }
    // 九宮斜線
    const palace: [Square, Square][] = [
        [[3, 0], [5, 2]], [[5, 0], [3, 2]], // 紅
        [[3, 9], [5, 7]], [[5, 9], [3, 7]], // 黑
    ];
    palace.forEach(([a, b], i) => {
        const [x1, y1] = project(a[0], a[1], myColor);
        const [x2, y2] = project(b[0], b[1], myColor);
        lines.push(<line key={`p${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />);
    });

    // 河界文字位置（row4/5 之間中央）
    const [riverX, riverY] = project(4, 4, myColor);

    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            className="max-h-full max-w-full select-none rounded-lg bg-amber-50 dark:bg-neutral-900 shadow"
            role="img"
        >
            {/* 棋盤線 */}
            <g className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth={1.5} fill="none">
                {lines}
            </g>

            {/* 河界字 */}
            <text
                x={riverX} y={riverY + CELL / 2}
                textAnchor="middle" dominantBaseline="middle"
                className="fill-neutral-400 dark:fill-neutral-600"
                style={{ fontSize: 22, letterSpacing: 8 }}
            >
                楚河　漢界
            </text>

            {/* lastMove 標記 */}
            {lastMove && [lastMove.from, lastMove.to].map((sq, i) => {
                const [x, y] = project(sq[0], sq[1], myColor);
                return (
                    <circle key={`lm${i}`} cx={x} cy={y} r={R + 3}
                        className="fill-none stroke-primary-400/70" strokeWidth={2} strokeDasharray="4 3" />
                );
            })}

            {/* 棋子 */}
            {Array.from(board.entries()).map(([k, piece]) => {
                const [c, r] = k.split(',').map(Number);
                const [x, y] = project(c, r, myColor);
                const isSel = !!selected && selected[0] === c && selected[1] === r;
                const inCheck = checkSide === piece.side && piece.type === 'general';
                return (
                    <g key={k} className={inCheck ? 'animate-pulse' : undefined}>
                        <circle cx={x} cy={y} r={R}
                            className="fill-neutral-50 dark:fill-neutral-800" />
                        <circle cx={x} cy={y} r={R}
                            className={
                                isSel
                                    ? 'fill-none stroke-primary-500'
                                    : inCheck
                                        ? 'fill-none stroke-red-500'
                                        : piece.side === 'red'
                                            ? 'fill-none stroke-red-600/70'
                                            : 'fill-none stroke-neutral-700 dark:stroke-neutral-300'
                            }
                            strokeWidth={isSel || inCheck ? 3 : 1.5} />
                        <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
                            className={piece.side === 'red'
                                ? 'fill-red-700 dark:fill-red-400'
                                : 'fill-neutral-900 dark:fill-neutral-100'}
                            style={{ fontSize: 30, fontWeight: 700 }}>
                            {pieceChar(piece)}
                        </text>
                    </g>
                );
            })}

            {/* 點擊命中層（涵蓋所有 90 個交叉點，透明，置頂） */}
            {interactive && Array.from({ length: 90 }, (_, idx) => {
                const c = idx % 9;
                const r = Math.floor(idx / 9);
                const [x, y] = project(c, r, myColor);
                return (
                    <circle key={`hit${idx}`} cx={x} cy={y} r={CELL / 2 - 2}
                        fill="transparent" className="cursor-pointer"
                        onClick={() => onPoint(c, r)} />
                );
            })}
        </svg>
    );
}
