import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  targetNumber: string;
}

const AnimatedCounter = ({ targetNumber }: AnimatedCounterProps) => {
  const [displayNumbers, setDisplayNumbers] = useState<string[]>([]);
  const currentValues = useRef<number[]>([]);
  const targetValues = useRef<number[]>([]);

  useEffect(() => {
    const chars = targetNumber.split('');

    targetValues.current = chars.map((c) =>
      c === ',' || c === '.' ? NaN : parseInt(c, 10)
    );

    currentValues.current = targetValues.current.map((v) =>
      isNaN(v) ? NaN : 0
    );

    setDisplayNumbers(chars.map((c) => (c === ',' || c === '.' ? c : '0')));

    let frame: number;

    const animate = () => {
      let done = true;

      const newNumbers = currentValues.current.map((val, i) => {
        const target = targetValues.current[i];
        if (isNaN(target)) return targetNumber[i];

        if (val < target) {
          currentValues.current[i] += 0.3;
          done = false;
        }

        return Math.min(target, Math.floor(currentValues.current[i])).toString();
      });

      setDisplayNumbers(newNumbers);

      if (!done) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [targetNumber]);

  return (
    <div className="inline-flex items-center gap-0.5 font-mono text-foreground">
      {displayNumbers.map((num, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-200"
          style={{
            transform:
              num !== ',' && num !== '.' ? 'translateY(0)' : 'none',
          }}
        >
          {num}
        </span>
      ))}
    </div>
  );
};

export default AnimatedCounter;