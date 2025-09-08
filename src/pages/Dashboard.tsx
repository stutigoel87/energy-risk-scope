import { MetricCard } from "@/components/ui/metric-card";
import { RiskBadge } from "@/components/ui/risk-badge";
import { RiskHeatmap } from "@/components/charts/RiskHeatmap";
import { OilPriceChart } from "@/components/charts/OilPriceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertTriangle, Shield } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Aggregate Risk Score"
          value="7.2"
          change={{ value: "+0.3 from yesterday", type: "increase" }}
          description="High volatility detected"
        />
        <MetricCard
          title="Oil Price (Brent)"
          value="$84.50"
          change={{ value: "-2.1% today", type: "decrease" }}
          description="Per barrel"
        />
        <MetricCard
          title="Charter Rates"
          value="$18,500"
          change={{ value: "+5.2% this week", type: "increase" }}
          description="VLCC daily rate"
        />
        <MetricCard
          title="USD/EUR"
          value="1.0842"
          change={{ value: "+0.15% today", type: "increase" }}
          description="Exchange rate"
        />
      </div>

      {/* Risk Overview and Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Risk Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Oil Price Volatility</span>
              <RiskBadge risk="high">High Risk</RiskBadge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Charter Rate Exposure</span>
              <RiskBadge risk="medium">Medium Risk</RiskBadge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">FX Risk (Multi-Currency)</span>
              <RiskBadge risk="low">Low Risk</RiskBadge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Geopolitical Impact</span>
              <RiskBadge risk="critical">Critical</RiskBadge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Supply Chain Risk</span>
              <RiskBadge risk="minimal">Minimal</RiskBadge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-success" />
              Risk Mitigation Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Hedges</span>
                <span className="text-sm font-medium text-success">73% Coverage</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '73%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Insurance Coverage</span>
                <span className="text-sm font-medium text-warning">45% Coverage</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Contract Flexibility</span>
                <span className="text-sm font-medium text-primary">85% Flexible</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <OilPriceChart />
        <RiskHeatmap />
      </div>

      {/* Recent Alerts */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Recent Risk Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <TrendingDown className="w-5 h-5 text-destructive flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Oil Price Alert</p>
                <p className="text-xs text-muted-foreground">Brent crude dropped 3.2% in last 2 hours</p>
              </div>
              <span className="text-xs text-muted-foreground">12:45 PM</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-warning flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Charter Rate Surge</p>
                <p className="text-xs text-muted-foreground">VLCC rates increased 8% due to Red Sea disruptions</p>
              </div>
              <span className="text-xs text-muted-foreground">11:20 AM</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">FX Volatility</p>
                <p className="text-xs text-muted-foreground">EUR/USD showing increased volatility - consider hedging</p>
              </div>
              <span className="text-xs text-muted-foreground">09:15 AM</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}