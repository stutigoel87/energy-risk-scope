import { Activity, Database, Wifi } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardHeaderProps {
  title: string;
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  const currentTime = new Date().toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short", 
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  });

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="flex items-center gap-3">
          <div className="bg-gradient-primary w-10 h-10 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">Energy Risk Analytics Platform</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{currentTime}</p>
          <p className="text-xs text-muted-foreground">Market Hours: ACTIVE</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 border border-success/20 rounded-md">
            <Wifi className="w-4 h-4 text-success" />
            <span className="text-xs font-medium text-success">Live Feed Active</span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-md">
            <Database className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">Last Updated: 2 mins ago</span>
          </div>
        </div>
      </div>
    </header>
  );
}