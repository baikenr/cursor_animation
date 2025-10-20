import React, { useEffect, useRef } from "react";
import Cursor from "../assets/cursor.svg"; // проверь путь к svg

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
  const distanceMultiplierRef = useRef(1); // множитель расстояния

  useEffect(() => {
    // Инициализация курсоров
    followersRef.current = Array.from({ length: NUM_FOLLOWERS }, (_, i) => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      rotation: 0,
      id: i,
      angleOffset: (i / NUM_FOLLOWERS) * Math.PI * 2,
      baseRadius: 28 + Math.random() * 4,
      offsetX: (Math.random() - 0.5) * 40,
      offsetY: (Math.random() - 0.5) * 40,
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

    // Наведение на текст
    const textElements = document.querySelectorAll(".container p, .container p strong");
    // добавляем в useEffect после инициализации текстовых элементов
    textElements.forEach(el => {
      el.addEventListener("mouseenter", () => {
        distanceMultiplierRef.current = 8; // увеличить расстояние
      });
      el.addEventListener("mouseleave", () => {
        distanceMultiplierRef.current = 1; // вернуть обычное расстояние
      });
    });

    // Анимация курсоров
    const animate = () => {
      const container = containerRef.current;
      if (!container) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const dxMouse = mousePos.current.x - prevMousePos.current.x;
      const dyMouse = mousePos.current.y - prevMousePos.current.y;
      const moving = Math.hypot(dxMouse, dyMouse) > 0.8;

      if (moving) {
        followersRef.current.forEach((f: FollowerCursor) => {
          f.stopX = undefined;
          f.stopY = undefined;
        });
      } else {
        followersRef.current.forEach((f: FollowerCursor) => {
          if (f.stopX === undefined || f.stopY === undefined) {
            const radius = f.baseRadius + 20 * distanceMultiplierRef.current; // <-- умножаем на multiplier
            const angle = Math.random() * Math.PI * 2;
            const offset = (Math.random() - 0.5) * 30;
            f.stopX = mousePos.current.x + Math.cos(angle) * radius + offset;
            f.stopY = mousePos.current.y + Math.sin(angle) * radius + offset;
          }
        });
      }


      followersRef.current.forEach((f: FollowerCursor, idx: number) => {
        const lag = moving ? 0.005 + idx * 0.01 : 0.02;
        const distanceMul = distanceMultiplierRef.current;

        f.x = lerp(
          f.x,
          moving
            ? mousePos.current.x + f.offsetX * distanceMul
            : f.stopX ?? mousePos.current.x,
          lag
        );
        f.y = lerp(
          f.y,
          moving
            ? mousePos.current.y + f.offsetY * distanceMul
            : f.stopY ?? mousePos.current.y,
          lag
        );

        const rot =
          (Math.atan2(mousePos.current.y - f.y, mousePos.current.x - f.x) *
            180) /
            Math.PI +
          90;

        const el = container.children[idx] as HTMLElement | undefined;

        if (el) {
          el.style.left = `${f.x}px`;
          el.style.top = `${f.y}px`;
          el.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
          el.style.opacity = visibleRef.current ? "0.45" : "0";
        }
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
            width: 24,
            height: 24,
            transform: "translate(-50%, -50%) rotate(0deg)",
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
