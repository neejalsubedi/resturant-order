interface StatProps {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  icon?: React.ReactNode;
}

export function StatCard({ label, value, delta, trend = "up", icon }: StatProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        {icon && (
          <div className="h-8 w-8 rounded-md bg-accent/15 text-accent flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      <div className="font-display text-3xl font-semibold tracking-tight">{value}</div>
      {delta && (
        <div className={trend === "up" ? "text-success text-xs" : "text-destructive text-xs"}>
          {trend === "up" ? "▲" : "▼"} {delta}
        </div>
      )}
    </div>
  );
}
