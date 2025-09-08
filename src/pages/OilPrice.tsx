import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { RiskBadge } from "@/components/ui/risk-badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react";

// Mock volatility data
const volatilityData = Array.from({ length: 90 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (89 - i));
  
  return {
    date: date.toISOString().split('T')[0],
    volatility: Math.abs(Math.sin(i * 0.1) * 20 + Math.random() * 15 + 10),
    day: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  };
});

// Mock price correlation data
const correlationData = [
  { metric: 'Company Revenue', correlation: 0.87, risk: 'high' as const },
  { metric: 'Operating Costs', correlation: -0.62, risk: 'medium' as const },
  { metric: 'Refining Margins', correlation: 0.71, risk: 'high' as const },
  { metric: 'Transportation Costs', correlation: 0.45, risk: 'low' as const },
];

export default function OilPrice() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <p className="text-sm text-primary">
            Volatility: {payload[0]?.value?.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Current Brent Price"
          value="$84.50"
          change={{ value: "-2.1% today", type: "decrease" }}
          description="Per barrel"
        />
        <MetricCard
          title="30-Day Volatility"
          value="18.7%"
          change={{ value: "+3.2% vs last month", type: "increase" }}
          description="Annualized"
        />
        <MetricCard
          title="VaR (95%, 1-day)"
          value="$2.4M"
          change={{ value: "+12% vs yesterday", type: "increase" }}
          description="Potential loss"
        />
        <MetricCard
          title="Correlation with Revenue"
          value="87%"
          change={{ value: "Stable", type: "neutral" }}
          description="Strong positive"
        />
      </div>

      {/* Volatility Analysis */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Oil Price Volatility (90 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volatilityData}>
                <defs>
                  <linearGradient id="volatilityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `${value.toFixed(0)}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="volatility"
                  stroke="hsl(var(--primary))"
                  fill="url(#volatilityGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Risk Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Correlations */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Price Impact Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {correlationData.map((item) => (
              <div key={item.metric} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.metric}</p>
                  <p className="text-xs text-muted-foreground">
                    Correlation: {item.correlation > 0 ? '+' : ''}{item.correlation.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {item.correlation > 0 ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                  <RiskBadge risk={item.risk}>
                    {item.risk.charAt(0).toUpperCase() + item.risk.slice(1)}
                  </RiskBadge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Risk Scenarios */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Risk Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-destructive" />
                <h4 className="text-sm font-semibold text-foreground">Geopolitical Crisis</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Oil price spike of 15-25% within 48 hours
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Probability:</span>
                <span className="text-xs font-medium text-destructive">12%</span>
              </div>
            </div>

            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-warning" />
                <h4 className="text-sm font-semibold text-foreground">Supply Disruption</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Temporary supply shortage causing 8-12% price increase
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Probability:</span>
                <span className="text-xs font-medium text-warning">28%</span>
              </div>
            </div>

            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-success" />
                <h4 className="text-sm font-semibold text-foreground">Market Stabilization</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Reduced volatility, prices within 5% of current levels
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Probability:</span>
                <span className="text-xs font-medium text-success">45%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}