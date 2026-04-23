"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mx = 0, my = 0, rx = 0, ry = 0;

        const onMouseMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
            }
        };

        const loop = () => {
            rx += (mx - rx) * 0.11;
            ry += (my - ry) * 0.11;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
            }
            requestAnimationFrame(loop);
        };

        window.addEventListener('mousemove', onMouseMove);
        const animId = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-gold2 rounded-full pointer-events-none z-[9999] hidden md:block"
            />
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-[34px] h-[34px] border border-[rgba(201,168,76,0.55)] rounded-full pointer-events-none z-[9998] transition-transform duration-[0.18s] ease hidden md:block"
            />
            <style jsx global>{`
                @media (min-width: 768px) {
                    body {
                        cursor: none;
                    }
                    a, button, [role="button"], .srv-card {
                        cursor: none;
                    }
                }
            `}</style>
        </>
    );
}
