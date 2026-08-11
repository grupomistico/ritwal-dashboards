export type SourceStatus = "fresh" | "warning" | "stale" | "error";

export type SourceFreshness = {
  name: string;
  detail: string;
  status: SourceStatus;
};

export type KpiTone = "neutral" | "positive" | "warning";

export type ExecutiveKpi = {
  id: string;
  label: string;
  value: string;
  comparison: string;
  delta: string;
  tone: KpiTone;
  sparkline: number[];
};

export type PriorityItem = {
  id: string;
  priority: "Alta" | "Media" | "Seguimiento";
  signal: string;
  context: string;
  owner: string;
  due: string;
};

export type ExecutiveDemoData = {
  sources: SourceFreshness[];
  kpis: ExecutiveKpi[];
  trend: {
    labels: string[];
    actual: number[];
    goal: number[];
  };
  drivers: Array<{
    label: string;
    value: number;
    kind: "positive" | "negative";
  }>;
  heatmap: {
    days: string[];
    hours: string[];
    values: Array<[number, number, number]>;
  };
  priorities: PriorityItem[];
};
