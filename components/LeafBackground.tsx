"use client";

// size: px、left: %、delay/duration: 落下動畫（s）、swayDuration: 搖擺週期（s）
const LEAVES = [
    { size: 22, left: 5,  delay: 0,   duration: 11, swayDuration: 3.2 },
    { size: 16, left: 12, delay: 2.5, duration: 14, swayDuration: 2.6 },
    { size: 28, left: 20, delay: 5,   duration: 10, swayDuration: 3.8 },
    { size: 13, left: 30, delay: 1,   duration: 16, swayDuration: 2.4 },
    { size: 24, left: 38, delay: 3.5, duration: 12, swayDuration: 3.5 },
    { size: 18, left: 47, delay: 7,   duration: 15, swayDuration: 2.9 },
    { size: 30, left: 55, delay: 1.8, duration: 11, swayDuration: 4.1 },
    { size: 14, left: 63, delay: 6,   duration: 14, swayDuration: 2.5 },
    { size: 26, left: 71, delay: 1.2, duration: 10, swayDuration: 3.6 },
    { size: 19, left: 79, delay: 4.2, duration: 17, swayDuration: 2.8 },
    { size: 27, left: 86, delay: 2,   duration: 12, swayDuration: 3.3 },
    { size: 16, left: 92, delay: 7.5, duration: 15, swayDuration: 2.7 },
    { size: 21, left: 97, delay: 3.8, duration: 11, swayDuration: 3.0 },
    { size: 12, left: 44, delay: 8.5, duration: 18, swayDuration: 2.3 },
    { size: 24, left: 68, delay: 6.5, duration: 13, swayDuration: 3.9 },
];

export default function LeafBackground() {
    return (
        <>
            <style>{`
                @keyframes leaf-fall {
                    0%   { transform: translateY(-8vh); opacity: 0; }
                    8%   { opacity: 1; }
                    85%  { opacity: 0.7; }
                    100% { transform: translateY(105vh); opacity: 0; }
                }
                @keyframes leaf-sway {
                    0%   { transform: translateX(-14px) rotate(-24deg); }
                    50%  { transform: translateX(14px) rotate(20deg); }
                    100% { transform: translateX(-14px) rotate(-24deg); }
                }
                .leaf-wrap {
                    position: absolute;
                    top: 0;
                    will-change: transform, opacity;
                    animation: leaf-fall linear infinite;
                    animation-fill-mode: both;
                    pointer-events: none;
                }
                .leaf {
                    display: block;
                    animation: leaf-sway ease-in-out infinite;
                }
                .leaf .blade { fill: rgba(82, 183, 136, 0.45); }
                .leaf .vein  { stroke: rgba(45, 106, 79, 0.5); }
                .dark .leaf .blade { fill: rgba(116, 198, 157, 0.28); }
                .dark .leaf .vein  { stroke: rgba(216, 243, 220, 0.32); }
                @media (prefers-reduced-motion: reduce) {
                    .leaf-wrap { animation: none; opacity: 0; }
                }
            `}</style>
            <div
                aria-hidden="true"
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 0,
                    overflow: "hidden",
                    pointerEvents: "none",
                }}
            >
                {LEAVES.map((leaf, i) => (
                    <div
                        key={i}
                        className="leaf-wrap"
                        style={{
                            left: `${leaf.left}%`,
                            animationDelay: `${leaf.delay}s`,
                            animationDuration: `${leaf.duration}s`,
                        }}
                    >
                        <svg
                            className="leaf"
                            width={leaf.size}
                            height={leaf.size}
                            viewBox="0 0 32 32"
                            style={{
                                animationDuration: `${leaf.swayDuration}s`,
                                // 負延遲讓每片葉子從搖擺週期的不同相位開始
                                animationDelay: `-${(i % 5) * 0.7}s`,
                            }}
                        >
                            <path className="blade" d="M3 23 C 5 9, 18 2, 29 5 C 27 18, 13 27, 4 25 Z" />
                            <path className="vein" d="M6 22 C 13 16, 21 10, 27 7" fill="none" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                ))}
            </div>
        </>
    );
}
