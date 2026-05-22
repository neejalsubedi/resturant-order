import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import {OrderStatus} from "@/lib/mockData.ts";

const styles: Record<OrderStatus, string> = {
  pending: "bg-warning/15 text-warning border-warning/30",
  preparing: "bg-accent/15 text-accent border-accent/30",
  served: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  paid: "bg-success/15 text-success border-success/30",
  cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge variant="outline" className={cn("capitalize border", styles[status])}>
      {status}
    </Badge>
  );
}
