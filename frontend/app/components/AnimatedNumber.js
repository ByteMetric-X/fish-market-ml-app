"use client";
import { useEffect, useRef, useState } from "react";

// Smoothly counts from the old number to the new number
export default function AnimatedNumber({ value, decimals = 0, prefix = "" }) {
  const [display, setDisplay] = useState(0);
  const previous = useRef(0);

  useEffect(() => {
    const start = previous.current;
    const startTime = performance.now();
    const duration = 700;
    let frame;

    function tick(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out
      setDisplay(start + (value - start) * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
      else previous.current = value;
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <span>
      {prefix}
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
