import { ReactNode } from "react";

type CaseGridProps = {
  children: ReactNode;
  columns?: 2 | 3;
};

export function CaseGrid({ children, columns = 3 }: CaseGridProps) {
  const colsClass = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return <div className={`grid grid-cols-1 gap-4 ${colsClass}`}>{children}</div>;
}
