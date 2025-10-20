import { useEffect, useCallback, useRef } from "react";
import type { RefObject } from "react";

export function useFitText<T extends HTMLElement>(minSize = 20, maxSize = 512) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<T>(null);

  // Detecta se é mobile (ajuste o breakpoint se quiser)
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  // Cálculo de fonte para 1 linha
  const calculateFontSizeSingleLine = (
    textElement: HTMLElement,
    containerWidth: number
  ) => {
    let min = 1;
    let max = 512;
    let size = 0;

    while (max - min > 1) {
      size = Math.floor((min + max) / 2);
      textElement.style.fontSize = `${size}px`;

      if (textElement.scrollWidth > containerWidth) {
        max = size;
      } else {
        min = size;
      }
    }

    return min;
  };

  // Cálculo de fonte para múltiplas linhas
  const calculateFontSizeMultiLine = (
    textElement: HTMLElement,
    containerWidth: number,
    containerHeight: number
  ) => {
    let min = 1;
    let max = 512;
    let size = 0;

    while (max - min > 1) {
      size = Math.floor((min + max) / 2);
      textElement.style.fontSize = `${size}px`;

      if (
        textElement.scrollWidth > containerWidth ||
        textElement.scrollHeight > containerHeight
      ) {
        max = size;
      } else {
        min = size;
      }
    }

    return min;
  };

  const fit = useCallback(() => {
    const container = containerRef.current;
    const text = textRef.current as HTMLElement | null;

    if (!container || !text) return;

    text.style.fontSize = `${maxSize}px`;
    text.style.display = "inline-block";
    text.style.whiteSpace = isMobile ? "normal" : "nowrap";

    const containerWidth = container.clientWidth;

    if (!isMobile) {
      // Desktop: 1 linha
      const currentTextWidth = text.scrollWidth;
      if (currentTextWidth <= containerWidth) {
        text.style.fontSize = `${maxSize}px`;
        return;
      }

      const optimalSize = calculateFontSizeSingleLine(text, containerWidth);
      const finalSize = Math.max(minSize, Math.min(maxSize, optimalSize));
      text.style.fontSize = `${finalSize}px`;
    } else {
      // Mobile: múltiplas linhas (até 2 linhas se o container for pequeno)
      const containerHeight = container.clientHeight;
      const optimalSize = calculateFontSizeMultiLine(
        text,
        containerWidth,
        containerHeight
      );
      const finalSize = Math.max(minSize, Math.min(maxSize, optimalSize));
      text.style.fontSize = `${finalSize}px`;
    }
  }, [minSize, maxSize, isMobile]);

  useEffect(() => {
    fit();

    const observer = new ResizeObserver((entries) => {
      if (entries.some((entry) => entry.contentRect.width !== 0)) {
        fit();
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [fit]);

  return {
    containerRef: containerRef as RefObject<HTMLDivElement>,
    textRef: textRef as RefObject<T>,
  };
}
