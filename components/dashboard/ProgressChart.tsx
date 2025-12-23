'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MonthlyScore } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { TrendingUp } from 'lucide-react';

interface ProgressChartProps {
  data: MonthlyScore[];
}

export function ProgressChart({ data }: ProgressChartProps) {
  if (data.length === 0) {
    return null;
  }

  const formattedData = data.map((item) => ({
    month: item.month,
    score: item.averageScore,
    tests: item.testCount,
  }));

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <TrendingUp className="h-5 w-5" />
        Progress Over Time
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
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
            formatter={(value: number, name: string, props: any) => {
              if (name === 'score') {
                return [`${value}%`, `Average Score (${props.payload.tests} tests)`];
              }
              return [value, name];
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Average Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
