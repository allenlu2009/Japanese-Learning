'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CategoryStats } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { CATEGORY_LABELS, CATEGORY_CHART_COLORS } from '@/lib/constants';
import { BarChart3 } from 'lucide-react';

interface CategoryChartProps {
  stats: CategoryStats[];
}

export function CategoryChart({ stats }: CategoryChartProps) {
  const data = stats.map((stat) => ({
    name: CATEGORY_LABELS[stat.category],
    score: stat.averageScore,
    count: stat.count,
    category: stat.category,
  }));

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BarChart3 className="h-5 w-5" />
        Average Score by Category
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            formatter={(value: number, name: string, props: any) => [
              `${value}%`,
              `Average Score (${props.payload.count} tests)`,
            ]}
          />
          <Bar dataKey="score" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CATEGORY_CHART_COLORS[entry.category]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
