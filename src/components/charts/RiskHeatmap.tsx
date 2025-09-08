import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HeatmapData {
  region: string;
  oilPrice: number;
  charterRate: number;
  exchangeRate: number;
}

const mockData: HeatmapData[] = [
  { region: "North Sea", oilPrice: 85, charterRate: 65, exchangeRate: 45 },
  { region: "Gulf of Mexico", oilPrice: 75, charterRate: 80, exchangeRate: 30 },
  { region: "West Africa", oilPrice: 90, charterRate: 70, exchangeRate: 85 },
  { region: "Middle East", oilPrice: 60, charterRate: 55, exchangeRate: 60 },
  { region: "North America", oilPrice: 70, charterRate: 45, exchangeRate: 25 },
  { region: "Asia Pacific", oilPrice: 80, charterRate: 85, exchangeRate: 75 },
];

const risks = [
  { key: "oilPrice", label: "Oil Price Risk" },
  { key: "charterRate", label: "Charter Rate Risk" },
  { key: "exchangeRate", label: "FX Risk" },
];

export function RiskHeatmap() {
  const getRiskColor = (value: number) => {
    if (value >= 80) return "bg-risk-critical";
    if (value >= 60) return "bg-risk-high";
    if (value >= 40) return "bg-risk-medium";
    if (value >= 20) return "bg-risk-low";
    return "bg-risk-minimal";
  };

  const getRiskIntensity = (value: number) => {
    const intensity = value / 100;
    return { opacity: Math.max(0.3, intensity) };
  };

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Risk Exposure Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Low Risk</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-risk-minimal rounded"></div>
              <div className="w-3 h-3 bg-risk-low rounded"></div>
              <div className="w-3 h-3 bg-risk-medium rounded"></div>
              <div className="w-3 h-3 bg-risk-high rounded"></div>
              <div className="w-3 h-3 bg-risk-critical rounded"></div>
            </div>
            <span>High Risk</span>
          </div>

          {/* Heatmap Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Header */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                <div className="text-sm font-medium text-muted-foreground">Region</div>
                {risks.map((risk) => (
                  <div key={risk.key} className="text-sm font-medium text-muted-foreground text-center">
                    {risk.label}
                  </div>
                ))}
              </div>

              {/* Data Rows */}
              {mockData.map((item) => (
                <div key={item.region} className="grid grid-cols-4 gap-2 mb-2">
                  <div className="text-sm font-medium text-foreground py-2">
                    {item.region}
                  </div>
                  {risks.map((risk) => {
                    const value = item[risk.key as keyof HeatmapData] as number;
                    return (
                      <div
                        key={risk.key}
                        className={`h-10 rounded-md flex items-center justify-center text-xs font-semibold ${getRiskColor(value)}`}
                        style={getRiskIntensity(value)}
                      >
                        {value}%
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}