import type { ReactNode } from "react";

export function AdminSection({
  number,
  title,
  hint,
  children,
}: {
  number: number;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-card">
      <div className="border-b border-border bg-muted/40 px-5 py-3">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-semibold text-muted-foreground">{number}.</span>
          <h2 className="text-base font-semibold">{title}</h2>
        </div>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}
