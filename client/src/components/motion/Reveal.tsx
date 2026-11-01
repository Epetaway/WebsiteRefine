import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export function Reveal({ children, className, delay = 0 }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      data-motion-owned
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.46,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
