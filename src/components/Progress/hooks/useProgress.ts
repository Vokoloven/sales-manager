import { useEffect, useEffectEvent, useRef, useState } from 'react';
import type { TNullable } from '@/core/models/utility.model';

const useProgress = () => {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<TNullable<number>>(null);

  const animation = useEffectEvent(() => {
    let lastTime = 0;
    const speed = 20;
    const step = 1;

    const animate = (time: number) => {
      if (time - lastTime >= speed) {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + step;
        });
        lastTime = time;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  });

  useEffect(() => {
    animation();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return { progress } as const;
};

export { useProgress };
