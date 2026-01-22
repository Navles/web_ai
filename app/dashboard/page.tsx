"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/common/Card";
import { BarChart3, FileText, Download, TrendingUp } from "lucide-react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

/* -------------------- SAMPLE JSON DATA -------------------- */

const stats = [
  { title: "Total Reports", value: "128", icon: FileText, change: "+12% from last month" },
  { title: "Data Exports", value: "45", icon: Download, change: "+5% from last month" },
  { title: "Active Analytics", value: "24", icon: BarChart3, change: "Across all projects" },
  { title: "Growth Rate", value: "18%", icon: TrendingUp, change: "+2.4% vs prev. period" },
];

const barData = [
  { month: "Jan", reports: 45 },
  { month: "Feb", reports: 52 },
  { month: "Mar", reports: 38 },
  { month: "Apr", reports: 65 },
  { month: "May", reports: 48 },
  { month: "Jun", reports: 80 },
];

const lineData = [
  { month: "Jan", growth: 10 },
  { month: "Feb", growth: 14 },
  { month: "Mar", growth: 12 },
  { month: "Apr", growth: 18 },
  { month: "May", growth: 20 },
  { month: "Jun", growth: 24 },
];

const pieData = [
  { name: "Finance", value: 35 },
  { name: "Sales", value: 25 },
  { name: "Marketing", value: 20 },
  { name: "HR", value: 20 },
];

const areaData = [
  { month: "Jan", users: 200 },
  { month: "Feb", users: 300 },
  { month: "Mar", users: 280 },
  { month: "Apr", users: 400 },
  { month: "May", users: 380 },
  { month: "Jun", users: 450 },
];

const tableData = [
  { id: 1, name: "January Report", type: "Finance", status: "Completed" },
  { id: 2, name: "Sales Q1", type: "Sales", status: "Pending" },
  { id: 3, name: "Marketing Leads", type: "Marketing", status: "Completed" },
  { id: 4, name: "HR Analytics", type: "HR", status: "In Progress" },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

/* -------------------- PAGE -------------------- */

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-6">

        <PageHeader
          title="Reports"
          description="Analyze your business performance and export data."
        />

        {/* ================= STATS ================= */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ================= CHARTS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Bar Chart */}
          <Card className="h-[320px]">
            <CardHeader>
              <CardTitle>Monthly Reports</CardTitle>
            </CardHeader>
            <CardContent className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reports" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Line Chart */}
          <Card className="h-[320px]">
            <CardHeader>
              <CardTitle>Growth Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="growth" stroke="#22c55e" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="h-[320px]">
            <CardHeader>
              <CardTitle>Report Categories</CardTitle>
            </CardHeader>
            <CardContent className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={90}>
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Area Chart */}
          <Card className="h-[320px]">
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
            </CardHeader>
            <CardContent className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area dataKey="users" stroke="#f59e0b" fill="#fde68a" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        </div>

        {/* ================= TABLE ================= */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Report Name</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id} className="border-b">
                    <td className="py-2">{row.name}</td>
                    <td>{row.type}</td>
                    <td>
                      <span className="rounded px-2 py-1 text-xs bg-muted">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}