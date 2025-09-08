import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const riskBadgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      risk: {
        critical: "bg-risk-critical/10 text-risk-critical border border-risk-critical/20",
        high: "bg-risk-high/10 text-risk-high border border-risk-high/20", 
        medium: "bg-risk-medium/10 text-risk-medium border border-risk-medium/20",
        low: "bg-risk-low/10 text-risk-low border border-risk-low/20",
        minimal: "bg-risk-minimal/10 text-risk-minimal border border-risk-minimal/20",
      },
    },
    defaultVariants: {
      risk: "medium",
    },
  }
);

export interface RiskBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof riskBadgeVariants> {}

function RiskBadge({ className, risk, ...props }: RiskBadgeProps) {
  return (
    <div className={cn(riskBadgeVariants({ risk }), className)} {...props} />
  );
}

export { RiskBadge, riskBadgeVariants };