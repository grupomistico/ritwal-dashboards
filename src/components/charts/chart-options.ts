import type { EChartsCoreOption } from "echarts/core";
import type { ExecutiveDemoData } from "@/types/dashboard";

const ink = "#27231f";
const muted = "#776f66";
const grid = "rgba(87, 72, 56, 0.12)";
const cream = "#f6f0e6";
const gold = "#b58b47";
const olive = "#656636";
const terracotta = "#993921";

const tooltip = {
  backgroundColor: "#27231f",
  borderWidth: 0,
  padding: [10, 12],
  textStyle: { color: cream, fontFamily: "system-ui", fontSize: 12 },
  extraCssText: "border-radius:12px;box-shadow:0 16px 36px rgba(32,26,19,.18)",
};

export function buildTrendOption(
  trend: ExecutiveDemoData["trend"],
): EChartsCoreOption {
  return {
    animationDuration: 700,
    animationEasing: "cubicOut",
    aria: {
      enabled: true,
      description: "Venta acumulada ilustrativa comparada con el objetivo.",
    },
    color: [terracotta, gold],
    grid: { left: 16, right: 18, top: 42, bottom: 20, containLabel: true },
    legend: {
      top: 2,
      right: 0,
      icon: "roundRect",
      itemWidth: 16,
      itemHeight: 4,
      textStyle: { color: muted, fontSize: 11 },
      data: ["Venta", "Objetivo"],
    },
    tooltip: {
      ...tooltip,
      trigger: "axis",
      valueFormatter: (value: unknown) => `$${String(value)} M`,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: trend.labels,
      axisLine: { lineStyle: { color: grid } },
      axisTick: { show: false },
      axisLabel: { color: muted, fontSize: 10, margin: 14 },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: muted, fontSize: 10, formatter: "${value} M" },
      splitLine: { lineStyle: { color: grid } },
    },
    series: [
      {
        name: "Venta",
        type: "line",
        data: trend.actual,
        smooth: 0.32,
        symbol: "circle",
        showSymbol: false,
        symbolSize: 7,
        lineStyle: { width: 3, color: terracotta },
        itemStyle: { color: terracotta, borderColor: cream, borderWidth: 2 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(153,57,33,.22)" },
              { offset: 1, color: "rgba(153,57,33,0)" },
            ],
          },
        },
      },
      {
        name: "Objetivo",
        type: "line",
        data: trend.goal,
        smooth: 0.24,
        symbol: "none",
        lineStyle: { width: 2, type: "dashed", color: gold },
      },
    ],
  };
}

export function buildDriversOption(
  drivers: ExecutiveDemoData["drivers"],
): EChartsCoreOption {
  const sorted = [...drivers].sort((a, b) => a.value - b.value);
  return {
    animationDuration: 600,
    aria: {
      enabled: true,
      description: "Factores ilustrativos que explican la desviación del objetivo.",
    },
    grid: { left: 8, right: 30, top: 8, bottom: 8, containLabel: true },
    tooltip: {
      ...tooltip,
      trigger: "axis",
      axisPointer: { type: "shadow" },
      valueFormatter: (value: unknown) => `${Number(value) > 0 ? "+" : ""}${String(value)} M`,
    },
    xAxis: {
      type: "value",
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: grid } },
    },
    yAxis: {
      type: "category",
      data: sorted.map((item) => item.label),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: ink, fontSize: 11, width: 132, overflow: "truncate" },
    },
    series: [
      {
        type: "bar",
        data: sorted.map((item) => ({
          value: item.value,
          itemStyle: {
            color: item.kind === "positive" ? olive : terracotta,
            borderRadius: item.value > 0 ? [0, 6, 6, 0] : [6, 0, 0, 6],
          },
        })),
        barWidth: 12,
        label: {
          show: true,
          position: "right",
          color: muted,
          fontSize: 10,
          formatter: (params: { value?: unknown }) => {
            const value = Number(params.value ?? 0);
            return `${value > 0 ? "+" : ""}${value.toFixed(1)} M`;
          },
        },
      },
    ],
  };
}

export function buildHeatmapOption(
  heatmap: ExecutiveDemoData["heatmap"],
): EChartsCoreOption {
  return {
    animationDuration: 550,
    aria: {
      enabled: true,
      description: "Pulso operativo ilustrativo por día y franja horaria.",
    },
    grid: { left: 30, right: 8, top: 8, bottom: 28, containLabel: true },
    tooltip: {
      ...tooltip,
      position: "top",
      formatter: (params: { value?: unknown }) => {
        const value = params.value as [number, number, number] | undefined;
        if (!value) return "";
        return `${heatmap.days[value[0]]} · ${heatmap.hours[value[1]]}<br/><strong>Índice ${value[2]}</strong>`;
      },
    },
    xAxis: {
      type: "category",
      data: heatmap.days,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: muted, fontSize: 10 },
      splitArea: { show: true, areaStyle: { color: ["transparent"] } },
    },
    yAxis: {
      type: "category",
      data: heatmap.hours,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: muted, fontSize: 10 },
      splitArea: { show: true, areaStyle: { color: ["transparent"] } },
    },
    visualMap: {
      show: false,
      min: 0,
      max: 100,
      inRange: { color: ["#eee5d6", "#c9b27d", "#656636", "#993921"] },
    },
    series: [
      {
        type: "heatmap",
        data: heatmap.values,
        label: { show: false },
        itemStyle: { borderColor: cream, borderWidth: 3, borderRadius: 7 },
        emphasis: { itemStyle: { shadowBlur: 8, shadowColor: "rgba(39,35,31,.18)" } },
      },
    ],
  };
}
