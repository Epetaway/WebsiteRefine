import { useState, useEffect, useRef, useCallback } from 'react';

interface TypewriterCodeProps {
  children: React.ReactNode;
  /** Delay before typing starts (ms) */
  startDelay?: number;
  /** Speed per character (ms) - lower = faster */
  charDelay?: number;
  /** Show cursor while typing */
  showCursor?: boolean;
  /** Callback when typing is complete */
  onComplete?: () => void;
  /** Threshold for triggering animation (0-1) */
  threshold?: number;
}

/**
 * TypewriterCode component - renders children with a typing animation effect
 * Used for code editor blocks in the hero section
 * Animation triggers when the element enters the viewport
 */
export default function TypewriterCode({
  children,
  startDelay = 500,
  charDelay = 35,
  showCursor = true,
  onComplete,
  threshold = 0.2
}: TypewriterCodeProps) {
  const [displayedContent, setDisplayedContent] = useState<React.ReactNode>(null);
  const [isTyping, setIsTyping] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  // Get the text content from children for character-by-character animation
  const getTextContent = useCallback((node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (!node) return '';
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (typeof node === 'object' && 'props' in node) {
      return getTextContent((node as React.ReactElement).props.children);
    }
    return '';
  }, []);

  // Clone element with partial text content
  const cloneWithPartialText = useCallback((
    node: React.ReactNode,
    remainingChars: number
  ): { node: React.ReactNode; charsUsed: number } => {
    if (remainingChars <= 0) {
      return { node: null, charsUsed: 0 };
    }

    if (typeof node === 'string') {
      const chars = Math.min(node.length, remainingChars);
      return { node: node.slice(0, chars), charsUsed: chars };
    }

    if (typeof node === 'number') {
      const str = String(node);
      const chars = Math.min(str.length, remainingChars);
      return { node: str.slice(0, chars), charsUsed: chars };
    }

    if (!node) return { node: null, charsUsed: 0 };

    if (Array.isArray(node)) {
      const result: React.ReactNode[] = [];
      let totalCharsUsed = 0;
      let remaining = remainingChars;

      for (const child of node) {
        if (remaining <= 0) break;
        const { node: partialNode, charsUsed } = cloneWithPartialText(child, remaining);
        if (partialNode !== null) {
          result.push(partialNode);
        }
        totalCharsUsed += charsUsed;
        remaining -= charsUsed;
      }

      return { node: result, charsUsed: totalCharsUsed };
    }

    if (typeof node === 'object' && 'props' in node) {
      const element = node as React.ReactElement;
      const { node: partialChildren, charsUsed } = cloneWithPartialText(
        element.props.children,
        remainingChars
      );

      if (charsUsed === 0) {
        return { node: null, charsUsed: 0 };
      }

      const cloned = {
        ...element,
        props: {
          ...element.props,
          children: partialChildren
        }
      };

      return { node: cloned, charsUsed };
    }

    return { node: null, charsUsed: 0 };
  }, []);

  // IntersectionObserver to detect when element is in viewport
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            setIsInView(true);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  // Start typing animation when element is in view
  useEffect(() => {
    if (!isInView) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || hasAnimatedRef.current) {
      setDisplayedContent(children);
      setIsTyping(false);
      return;
    }

    const totalChars = getTextContent(children).length;
    let currentCharCount = 0;

    const startTimer = setTimeout(() => {
      setHasStarted(true);
      hasAnimatedRef.current = true;

      const typeInterval = setInterval(() => {
        currentCharCount++;
        const { node } = cloneWithPartialText(children, currentCharCount);
        setDisplayedContent(node);

        if (currentCharCount >= totalChars) {
          clearInterval(typeInterval);
          setIsTyping(false);
          onComplete?.();
        }
      }, charDelay);

      return () => clearInterval(typeInterval);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [isInView, children, startDelay, charDelay, onComplete, getTextContent, cloneWithPartialText]);

  // If animation hasn't started, show nothing (or placeholder)
  if (!hasStarted && !displayedContent) {
    return (
      <div ref={containerRef} className="relative">
        <div className="invisible">{children}</div>
        {showCursor && <span className="animate-pulse">|</span>}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {displayedContent}
      {isTyping && showCursor && (
        <span className="inline-block w-[2px] h-[1em] bg-current ml-0.5 animate-pulse align-middle" />
      )}
    </div>
  );
}
