"use client";

import { Users, Briefcase, TrendingUp, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { useAdminStats } from "@/hooks/queries/useAdminStats";

const mockChartData = [
  { name: "W1", leads: 12 },
  { name: "W2", leads: 18 },
  { name: "W3", leads: 15 },
  { name: "W4", leads: 22 },
  { name: "W5", leads: 25 },
  { name: "W6", leads: 30 },
  { name: "W7", leads: 28 },
  { name: "W8", leads: 35 },
  { name: "W9", leads: 40 },
  { name: "W10", leads: 38 },
  { name: "W11", leads: 45 },
  { name: "W12", leads: 52 },
];

const mockFunnelData = [
  { name: 'Visits', value: 12500, fill: '#333333' },
  { name: 'Demo Requests', value: 850, fill: '#4E85BF' },
  { name: 'Leads', value: 240, fill: '#84cc16' },
  { name: 'Qualified', value: 110, fill: '#65a30d' },
  { name: 'Closed', value: 45, fill: '#a3e635' },
];

export default function AdminDashboard() {
  const { data: stats, isLoading, isError } = useAdminStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-400">
        Failed to load dashboard statistics.
      </div>
    );
  }

  const statCards = [
    { 
      title: "Total Leads", 
      value: stats.totalLeads, 
      icon: <Users className="w-6 h-6 text-brand-accent" />,
      desc: "All time inquiries"
    },
    { 
      title: "New Leads (This Week)", 
      value: stats.newLeadsThisWeek, 
      icon: <TrendingUp className="w-6 h-6 text-brand-accent" />,
      desc: "Recent inquiries"
    },
    { 
      title: "Total Products", 
      value: stats.totalProducts || 0, 
      icon: <Briefcase className="w-6 h-6 text-brand-accent" />,
      desc: "Published products"
    },
  ];

  const engagementData = stats.weeklyLeadCounts && stats.weeklyLeadCounts.length > 0 ? stats.weeklyLeadCounts : mockChartData;
  const funnelData = stats.funnel ? [
    { name: 'Visits', value: stats.funnel.visits, fill: '#333333' },
    { name: 'Demo Requests', value: stats.funnel.demoRequests, fill: '#4E85BF' },
    { name: 'Leads', value: stats.funnel.leads, fill: '#84cc16' },
    { name: 'Qualified', value: stats.funnel.qualified, fill: '#65a30d' },
    { name: 'Closed', value: stats.funnel.closed, fill: '#a3e635' }
  ] : mockFunnelData;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">Welcome Back</h1>
        <p className="text-foreground/60 mt-2">Here&apos;s what&apos;s happening across your platform today.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {statCards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
              {card.icon}
            </div>
            <p className="text-sm font-medium text-foreground/60 mb-2">{card.title}</p>
            <div className="text-4xl font-bold text-foreground mb-4 font-mono">{card.value}</div>
            <p className="text-xs text-foreground/50">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-surface border border-border rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-accent" />
              Lead Engagement (12 Weeks)
            </h2>
            <p className="text-sm text-foreground/50 mt-1">Total incoming inquiries over the past 12 weeks.</p>
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a3e635" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a3e635" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="name" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#141414', borderColor: '#333', borderRadius: '8px' }}
                itemStyle={{ color: '#a3e635' }}
              />
              <Area 
                type="monotone" 
                dataKey="leads" 
                stroke="#a3e635" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorLeads)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Conversion Funnel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-surface border border-border rounded-xl p-6 mt-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-accent" />
              Conversion Funnel
            </h2>
            <p className="text-sm text-foreground/50 mt-1">Lead scoring and conversion tracking from visits to closed deals.</p>
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={funnelData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
              <XAxis type="number" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" stroke="#ccc" tick={{ fill: '#ccc', fontSize: 13, fontWeight: 'bold' }} axisLine={false} tickLine={false} width={120} />
              <Tooltip 
                cursor={{ fill: '#ffffff0a' }}
                contentStyle={{ backgroundColor: '#141414', borderColor: '#333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={2000} barSize={40}>
                {funnelData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
