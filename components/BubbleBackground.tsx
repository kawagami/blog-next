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
                    0%   { transform: translateY(-150px) scale(1); opacity: 0; }
                    10%  { opacity: 1; }
                    90%  { opacity: 0.6; }
                    100% { transform: translateY(100vh) scale(0.8); opacity: 0; }
                }
                .bubble {
                    position: absolute;
                    border-radius: 50%;
                    will-change: transform, opacity;
                    animation: bubble-fall linear infinite;
                    animation-fill-mode: both;
                    pointer-events: none;
                    border: 2px solid rgba(147, 197, 253, 0.6);
                    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), rgba(147, 197, 253, 0.08));
                }
                .dark .bubble {
                    border-color: rgba(99, 102, 241, 0.5);
                    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05), rgba(99, 102, 241, 0.08));
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
