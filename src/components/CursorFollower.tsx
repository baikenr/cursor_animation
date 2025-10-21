import React, { useEffect, useRef } from "react";
import Cursor from "../assets/cursor.svg";

interface CursorPosition {
  x: number;
  y: number;
}

interface FollowerCursor extends CursorPosition {
  rotation: number;
  id: number;
  angleOffset: number;
  baseRadius: number;
  offsetX: number;
  offsetY: number;
  stopX?: number;
  stopY?: number;
  angle?: number;
  noisePhase?: number;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const CursorFollower: React.FC = () => {
  const NUM_FOLLOWERS = 13;
  const followersRef = useRef<FollowerCursor[]>([]);
  const mousePos = useRef<CursorPosition>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const prevMousePos = useRef<CursorPosition>({ ...mousePos.current });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const visibleRef = useRef(false);
  const rotateModeRef = useRef(false);
  const rotationPhaseRef = useRef(0);

  useEffect(() => {
    followersRef.current = Array.from({ length: NUM_FOLLOWERS }, (_, i) => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      rotation: 0,
      id: i,
      angleOffset: (i / NUM_FOLLOWERS) * Math.PI * 2,
      baseRadius: 28 + Math.random() * 4,
      offsetX: (Math.random() - 0.5) * 40,
      offsetY: (Math.random() - 0.5) * 40,
      angle: Math.random() * Math.PI * 2,
      noisePhase: Math.random() * Math.PI * 2,
    }));

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      visibleRef.current = true;
    };

    const onLeave = () => {
      visibleRef.current = false;
    };

    const onEnter = (e: MouseEvent) => {
      visibleRef.current = true;
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const textElements = document.querySelectorAll(
      ".container p, .container p strong, .container span"
    );
    textElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        rotateModeRef.current = true;
      });
      el.addEventListener("mouseleave", () => {
        rotateModeRef.current = false;
      });
    });

    const animate = () => {
      const container = containerRef.current;
      if (!container) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const dxMouse = mousePos.current.x - prevMousePos.current.x;
      const dyMouse = mousePos.current.y - prevMousePos.current.y;
      const moving = Math.hypot(dxMouse, dyMouse) > 0.8;
      rotationPhaseRef.current += 0.01;

      followersRef.current.forEach((f, idx) => {
        f.noisePhase! += 0.015 + Math.random() * 0.005;

        if (rotateModeRef.current) {
          const noiseX = Math.sin(f.noisePhase! * 1.3 + idx) * 15;
          const noiseY = Math.cos(f.noisePhase! * 0.9 + idx) * 15;
          f.angle! += 0.004 + Math.sin(rotationPhaseRef.current + idx * 0.1) * 0.001;
          const targetRadius = f.baseRadius * (6 + Math.sin(f.noisePhase! + idx) * 0.3);
          if (!f.stopX) f.stopX = targetRadius;
          f.stopX = lerp(f.stopX, targetRadius, 0.05);
          const radius = f.stopX;
          f.x = lerp(f.x, mousePos.current.x + Math.cos(f.angle!) * radius + noiseX, 0.1);
          f.y = lerp(f.y, mousePos.current.y + Math.sin(f.angle!) * radius + noiseY, 0.1);
        } else if (moving) {
          f.stopX = undefined;
          f.stopY = undefined;
          const lag = 0.05 + idx * 0.008;
          f.x = lerp(f.x, mousePos.current.x + f.offsetX, lag);
          f.y = lerp(f.y, mousePos.current.y + f.offsetY, lag);
        } else {
          if (f.stopX === undefined || f.stopY === undefined) {
            const radius = f.baseRadius * 1.5 + Math.random() * 15;
            const angle = Math.random() * Math.PI * 2;
            f.stopX = mousePos.current.x + Math.cos(angle) * radius;
            f.stopY = mousePos.current.y + Math.sin(angle) * radius;
          }
          f.x = lerp(f.x, f.stopX, 0.05);
          f.y = lerp(f.y, f.stopY, 0.05);
        }
      });

      for (let i = 0; i < followersRef.current.length; i++) {
        for (let j = i + 1; j < followersRef.current.length; j++) {
          const a = followersRef.current[i];
          const b = followersRef.current[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const minDist = 18;
          if (dist < minDist && dist > 0.001) {
            const push = (minDist - dist) * 0.15; 
            const nx = dx / dist;
            const ny = dy / dist;
            a.x -= nx * push;
            a.y -= ny * push;
            b.x += nx * push;
            b.y += ny * push;
          }
        }
      }

      followersRef.current.forEach((f, idx) => {
        const el = container.children[idx] as HTMLElement | undefined;
        if (!el) return;
        const rot =
          (Math.atan2(mousePos.current.y - f.y, mousePos.current.x - f.x) * 180) / Math.PI +
          90;
        el.style.left = `${f.x}px`;
        el.style.top = `${f.y}px`;
        el.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
        el.style.opacity = visibleRef.current ? "0.9" : "0";
      });

      prevMousePos.current = { ...mousePos.current };
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: NUM_FOLLOWERS }).map((_, i) => (
        <img
          key={i}
          src={Cursor}
          alt="cursor"
          style={{
            position: "absolute",
            width: 21,
            height: 21,
            transform: "translate(-50%, -50%) rotate(0deg)",
            filter: "drop-shadow(0 0 1px rgba(0,0,0,0.3))",
            opacity: 0,
            transition: "opacity 0.3s linear",
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
};

export default CursorFollower;
