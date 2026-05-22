import { Link } from "react-router-dom";
import {
    DollarSign,
    ShoppingBag,
    Users2,
    Utensils,
    ArrowUpRight,
} from "lucide-react";

import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import Table, { Column } from "@/components/ui/Table";

import {
    orders,
    tables,
    revenue7d,
    topItems,
} from "@/lib/mockData.ts";

import {
    LineChart,
    Line,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
} from "recharts";

type Order = (typeof orders)[number];

export default function Dashboard() {
    const active = orders.filter(
        (o) => o.status === "pending" || o.status === "preparing"
    ).length;

    const occupied = tables.filter((t) => t.status === "occupied").length;
    const todayRevenue = revenue7d[revenue7d.length - 1].revenue;

    // ✅ Table columns (using your reusable table)
    const columns: Column<Order>[] = [
        {
            header: "Order",
            accessor: (row) => (
                <span className="font-mono text-xs">{row.id}</span>
            ),
        },
        {
            header: "Table",
            accessor: (row) => `T-${row.table}`,
        },
        {
            header: "Server",
            accessor: "server",
        },
        {
            header: "Items",
            accessor: (row) => (
                <span className="text-muted-foreground">
          {row.items.reduce((s, i) => s + i.qty, 0)} items
        </span>
            ),
        },
        {
            header: "Status",
            accessor: (row) => <StatusBadge status={row.status} />,
        },
        {
            header: "Total",
            accessor: (row) => (
                <div className="text-right font-medium">
                    ${row.total.toFixed(2)}
                </div>
            ),
            className: "text-right",
        },
    ];

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex items-end justify-between flex-wrap gap-4">
                <div>
                    <h1 className=" text-xl font-semibold tracking-tight">
                        Tonight's service
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Friday · Live snapshot of orders, tables and revenue.
                    </p>
                </div>

                <button className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90">
                    New order <ArrowUpRight className="h-4 w-4" />
                </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Today revenue"
                    value={`$${todayRevenue.toLocaleString()}`}
                    delta="12.4% vs yesterday"
                    icon={<DollarSign className="h-4 w-4" />}
                />
                <StatCard
                    label="Active orders"
                    value={String(active)}
                    delta="3 in kitchen"
                    icon={<ShoppingBag className="h-4 w-4" />}
                />
                <StatCard
                    label="Tables occupied"
                    value={`${occupied}/${tables.length}`}
                    delta={`${Math.round(
                        (occupied / tables.length) * 100
                    )}% capacity`}
                    icon={<Utensils className="h-4 w-4" />}
                />
                <StatCard
                    label="Staff on shift"
                    value="6"
                    delta="2 servers, 2 kitchen"
                    icon={<Users2 className="h-4 w-4" />}
                />
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Revenue */}
                <div className="lg:col-span-2 rounded-lg border border-border bg-card p-5">
                    <div className="mb-4">
                        <h2 className="font-display text-lg font-semibold">
                            Revenue · Last 7 days
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Daily totals across all services
                        </p>
                    </div>

                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenue7d}>
                                <CartesianGrid
                                    stroke="oklch(0.30 0.008 60)"
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />
                                <XAxis dataKey="day" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="oklch(0.72 0.18 50)"
                                    strokeWidth={2.5}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top sellers */}
                <div className="rounded-lg border border-border bg-card p-5">
                    <h2 className="font-display text-lg font-semibold mb-4">
                        Top sellers
                    </h2>

                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topItems} layout="vertical">
                                <CartesianGrid
                                    stroke="oklch(0.30 0.008 60)"
                                    strokeDasharray="3 3"
                                    horizontal={false}
                                />
                                <XAxis type="number" fontSize={12} />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    fontSize={11}
                                    width={100}
                                />
                                <Tooltip />
                                <Bar
                                    dataKey="sold"
                                    fill="oklch(0.72 0.18 50)"
                                    radius={[0, 4, 4, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between p-5 border-b border-border">
                    <h2 className="font-display text-lg font-semibold">
                        Recent orders
                    </h2>

                    <Link
                        to="/orders"
                        className="text-xs text-accent hover:underline"
                    >
                        View all
                    </Link>
                </div>

                <Table
                    data={orders.slice(0, 5)}
                    columns={columns}
                    pagination={false}
                    searchable={false}
                />
            </div>
        </div>
    );
}