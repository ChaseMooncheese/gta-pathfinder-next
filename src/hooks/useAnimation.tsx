"use client";
import { useRef, useEffect } from "react";

function useAnimation(
  callbackFn: (deltaT: number) => void,
  dependencies: Array<any>
) {
  const currentRequest = useRef(0);
  const oldTime = useRef(performance.now());

  const animate = (time: number) => {
    const deltaT = time - oldTime.current;
    callbackFn(deltaT);
    oldTime.current = time;
    currentRequest.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    currentRequest.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(currentRequest.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
