import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for oil prices over the last 30 days
const mockOilData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  
  // Generate realistic oil price movements
  const basePrice = 85;
  const volatility = Math.sin(i * 0.5) * 8 + Math.random() * 6 - 3;
  
  return {
    date: date.toISOString().split('T')[0],
    brent: Math.round((basePrice + volatility) * 100) / 100,
    wti: Math.round((basePrice + volatility - 2) * 100) / 100,
    day: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  };
});

export function OilPriceChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value}/bbl
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Oil Price Trends (30 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockOilData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="brent"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                name="Brent Crude"
              />
              <Line
                type="monotone"
                dataKey="wti"
                stroke="hsl(var(--dashboard-accent))"
                strokeWidth={2}
                dot={false}
                name="WTI Crude"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-sm text-muted-foreground">Brent Crude</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-dashboard-accent"></div>
            <span className="text-sm text-muted-foreground">WTI Crude</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}