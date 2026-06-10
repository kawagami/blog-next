"use client";

const BUBBLES = [
    { size: 20, left: 5,  delay: 0,   duration: 8  },
    { size: 14, left: 12, delay: 1.5, duration: 10 },
    { size: 28, left: 20, delay: 3,   duration: 7  },
    { size: 10, left: 30, delay: 0.5, duration: 12 },
    { size: 22, left: 38, delay: 2,   duration: 9  },
    { size: 16, left: 47, delay: 4,   duration: 11 },
    { size: 30, left: 55, delay: 1,   duration: 8  },
    { size: 12, left: 63, delay: 3.5, duration: 10 },
    { size: 24, left: 71, delay: 0.8, duration: 7  },
    { size: 18, left: 79, delay: 2.5, duration: 13 },
    { size: 26, left: 86, delay: 1.2, duration: 9  },
    { size: 15, left: 92, delay: 4.5, duration: 11 },
    { size: 20, left: 97, delay: 2.2, duration: 8  },
    { size: 11, left: 44, delay: 5,   duration: 14 },
    { size: 23, left: 68, delay: 3.8, duration: 10 },
];

export default function BubbleBackground() {
    return (
        <>
            <style>{`
                @keyframes bubble-fall {
                    0%   { transform: translateY(-150px) translateX(0) scale(1); opacity: 0; }
                    10%  { opacity: 1; }
                    50%  { transform: translateY(50vh) translateX(24px) scale(0.95); }
                    90%  { opacity: 0.5; }
                    100% { transform: translateY(100vh) translateX(-12px) scale(0.85); opacity: 0; }
                }
                .bubble {
                    position: absolute;
                    border-radius: 50%;
                    will-change: transform, opacity;
                    animation: bubble-fall ease-in-out infinite;
                    animation-fill-mode: both;
                    pointer-events: none;
                    border: 2px solid rgba(82, 183, 136, 0.45);
                    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), rgba(116, 198, 157, 0.1));
                }
                .dark .bubble {
                    border-color: rgba(116, 198, 157, 0.35);
                    background: radial-gradient(circle at 30% 30%, rgba(216, 243, 220, 0.12), rgba(64, 145, 108, 0.08));
                    box-shadow: 0 0 12px rgba(116, 198, 157, 0.15);
                }
                @media (prefers-reduced-motion: reduce) {
                    .bubble { animation: none; opacity: 0; }
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
                {BUBBLES.map((b, i) => (
                    <div
                        key={i}
                        className="bubble"
                        style={{
                            width: b.size,
                            height: b.size,
                            left: `${b.left}%`,
                            top: 0,
                            animationDelay: `${b.delay}s`,
                            animationDuration: `${b.duration}s`,
                        }}
                    />
                ))}
            </div>
        </>
    );
}
