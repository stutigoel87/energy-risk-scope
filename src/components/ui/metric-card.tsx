import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
  description?: string;
  className?: string;
}

export function MetricCard({ title, value, change, description, className }: MetricCardProps) {
  const getTrendIcon = () => {
    if (!change) return <Activity className="w-4 h-4 text-muted-foreground" />;
    
    switch (change.type) {
      case "increase":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "decrease":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getChangeColor = () => {
    if (!change) return "text-muted-foreground";
    
    switch (change.type) {
      case "increase":
        return "text-success";
      case "decrease":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={cn("bg-gradient-card border-border", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {getTrendIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
        {change && (
          <p className={cn("text-xs flex items-center gap-1", getChangeColor())}>
            {change.value}
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}