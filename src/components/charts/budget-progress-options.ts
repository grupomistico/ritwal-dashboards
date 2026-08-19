import type { EChartsCoreOption } from "echarts/core";

export type BudgetProgressChartData = {
  labels: string[];
  current: number[];
  previousMonth: number[];
  previousYear: number[];
  linearTarget: number[];
};

const formatCop = (value: unknown) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(value));

export function buildBudgetProgressOption(
  chart: BudgetProgressChartData,
  animate = true,
): EChartsCoreOption {
  return {
    animation: animate,
    animationDuration: 620,
    animationEasing: "cubicOut",
    aria: {
      enabled: true,
      description:
        "Venta base acumulada de los días 1 al 18. Agosto 2026 cierra en 936 millones, julio 2026 en 895 millones y agosto 2025 en 1.128 millones. La referencia lineal de la meta de agosto llega a 1.161 millones.",
    },
    color: ["#993921", "#656636", "#8b6f4b", "#b58b47"],
    grid: { left: 12, right: 16, top: 56, bottom: 14, containLabel: true },
    legend: {
      top: 2,
      left: 0,
      icon: "roundRect",
      itemWidth: 15,
      itemHeight: 4,
      itemGap: 16,
      textStyle: { color: "#675f57", fontSize: 10 },
      data: ["Ago 2026", "Jul 2026", "Ago 2025", "Ritmo meta"],
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#27231f",
      borderWidth: 0,
      padding: [10, 12],
      valueFormatter: formatCop,
      textStyle: { color: "#fffdf8", fontFamily: "system-ui", fontSize: 12 },
      extraCssText: "border-radius:12px;box-shadow:0 16px 36px rgba(32,26,19,.18)",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: chart.labels,
      name: "Día",
      nameLocation: "end",
      nameTextStyle: { color: "#776f66", fontSize: 10, padding: [18, 0, 0, 6] },
      axisLine: { lineStyle: { color: "rgba(87,72,56,.14)" } },
      axisTick: { show: false },
      axisLabel: { color: "#776f66", fontSize: 10, margin: 12 },
    },
    yAxis: {
      type: "value",
      min: 0,
      axisLabel: {
        color: "#776f66",
        fontSize: 10,
        formatter: (value: number) => `$${Math.round(value / 1_000_000)} M`,
      },
      splitLine: { lineStyle: { color: "rgba(87,72,56,.11)" } },
    },
    series: [
      {
        name: "Ago 2026",
        type: "line",
        data: chart.current,
        smooth: 0.22,
        symbol: "circle",
        showSymbol: false,
        lineStyle: { width: 3, color: "#993921" },
        itemStyle: { color: "#993921" },
        areaStyle: { color: "rgba(153,57,33,.08)" },
      },
      {
        name: "Jul 2026",
        type: "line",
        data: chart.previousMonth,
        smooth: 0.2,
        symbol: "none",
        lineStyle: { width: 2, color: "#656636" },
      },
      {
        name: "Ago 2025",
        type: "line",
        data: chart.previousYear,
        smooth: 0.2,
        symbol: "none",
        lineStyle: { width: 2, color: "#8b6f4b" },
      },
      {
        name: "Ritmo meta",
        type: "line",
        data: chart.linearTarget,
        symbol: "none",
        lineStyle: { width: 2, type: "dashed", color: "#b58b47" },
      },
    ],
  };
}
