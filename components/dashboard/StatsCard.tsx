import React from 'react';
import { Card } from '@/components/ui/Card';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  icon?: LucideIcon;
  color?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  color = 'text-primary-600',
}: StatsCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;

    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={cn('text-3xl font-bold mt-2', color)}>{value}</p>
          {subtitle && (
            <div className="flex items-center gap-2 mt-2">
              {getTrendIcon()}
              <p className="text-sm text-gray-600">{subtitle}</p>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn('p-3 rounded-lg bg-opacity-10', color)}>
            <Icon className={cn('h-6 w-6', color)} />
          </div>
        )}
      </div>
    </Card>
  );
}
