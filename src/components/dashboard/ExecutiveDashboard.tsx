"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  CircleGauge,
  Clock3,
  DatabaseZap,
  LayoutDashboard,
  ListChecks,
  Sparkles,
} from "lucide-react";
import {
  buildDriversOption,
  buildHeatmapOption,
  buildTrendOption,
} from "@/components/charts/chart-options";
import { PriorityTable } from "@/components/data-table/PriorityTable";
import { GsapSequence } from "@/components/motion/GsapSequence";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { AmbientFallback } from "@/components/webgl/AmbientFallback";
import type { ExecutiveDemoData, ExecutiveKpi, SourceStatus } from "@/types/dashboard";

const AmbientCanvas = dynamic(
  () => import("@/components/webgl/AmbientCanvas").then((module) => module.AmbientCanvas),
  { ssr: false, loading: () => <AmbientFallback /> },
);

const EChart = dynamic(
  () => import("@/components/charts/EChart").then((module) => module.EChart),
  {
    ssr: false,
    loading: () => <div className="chart chart-loading" aria-hidden="true" />,
  },
);

const periods = ["Hoy", "7 días", "Mes"] as const;

const navItems = [
  { label: "Resumen", icon: LayoutDashboard, active: true },
  { label: "Operaciones", icon: CircleGauge },
  { label: "Fuentes", icon: DatabaseZap },
  { label: "Decisiones", icon: ListChecks },
];

const statusLabels: Record<SourceStatus, string> = {
  fresh: "Al día",
  warning: "Corte programado",
  stale: "Atrasada",
  error: "Sin conexión",
};

type ExecutiveDashboardProps = {
  data: ExecutiveDemoData;
};

function Sparkline({ values, tone }: { values: number[]; tone: ExecutiveKpi["tone"] }) {
  const points = values.map((value, index, all) => {
    const width = 92;
    const height = 30;
    const min = Math.min(...all);
    const max = Math.max(...all);
    const x = (index / Math.max(all.length - 1, 1)) * width;
    const y = height - ((value - min) / Math.max(max - min, 1)) * (height - 4) - 2;
    return `${x},${y}`;
  });

  return (
    <svg className={`sparkline sparkline--${tone}`} viewBox="0 0 92 30" aria-hidden="true">
      <polyline points={points.join(" ")} fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function ExecutiveDashboard({ data }: ExecutiveDashboardProps) {
  const [period, setPeriod] = useState<(typeof periods)[number]>("Mes");
  const shouldReduceMotion = useReducedMotion();
  const trendOption = useMemo(() => buildTrendOption(data.trend), [data.trend]);
  const driversOption = useMemo(() => buildDriversOption(data.drivers), [data.drivers]);
  const heatmapOption = useMemo(() => buildHeatmapOption(data.heatmap), [data.heatmap]);

  const cardMotion = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

  return (
    <SmoothScrollProvider enabled>
    <div className="dashboard-shell">
      <a className="skip-link" href="#dashboard-content">Saltar al contenido</a>

      <aside className="sidebar" aria-label="Navegación principal">
        <div className="brand-lockup">
          <Image src="/brand/ritwal-isotipo.png" alt="" width={30} height={40} priority />
          <div>
            <span className="brand-name">Ritwal</span>
            <span className="brand-suite">Intelligence</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              type="button"
              className="nav-item"
              data-active={active || undefined}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              disabled={!active}
              title={!active ? "Módulo previsto para la siguiente iteración" : undefined}
            >
              <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-foot">
          <span className="eyebrow">Entorno</span>
          <span className="environment-dot"><i /> Base de diseño</span>
          <p>Sin conexión a datos productivos.</p>
        </div>
      </aside>

      <main id="dashboard-content" className="dashboard-main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Alta gerencia · Resumen</p>
            <h1>Ritwal en un vistazo</h1>
          </div>
          <div className="topbar-actions">
            <div className="period-selector" aria-label="Periodo de análisis">
              {periods.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="period-button"
                  data-active={period === item || undefined}
                  aria-pressed={period === item}
                  onClick={() => setPeriod(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="date-button" type="button" title="Filtro ilustrativo">
              <CalendarDays size={16} aria-hidden="true" />
              Agosto 2026
              <ChevronDown size={14} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="demo-banner" role="status">
          <Sparkles size={14} aria-hidden="true" />
          <strong>Prototipo funcional</strong>
          <span>Todos los valores visibles son demostrativos, no cifras de Ritwal.</span>
          <Link href="/presentaciones/avance-presupuesto-agosto-2026-08-18">
            Abrir snapshot certificado
          </Link>
        </div>

        <section className="executive-brief" aria-labelledby="brief-title">
          <AmbientCanvas className="ambient-brand-canvas" deferMs={850} quality="auto" />
          <div className="sacred-orbit" aria-hidden="true" />
          <GsapSequence className="brief-sequence" delay={0.08} distance={14} stagger={0.11}>
          <div className="brief-copy" data-gsap-reveal>
            <p className="eyebrow eyebrow--light">Lectura ejecutiva · {period}</p>
            <h2 id="brief-title">La operación ilustrativa avanza por encima del ritmo objetivo.</h2>
            <p>
              El impulso viene de cena y eventos. La atención de hoy está en confirmar
              reservas y recuperar el almuerzo entre semana.
            </p>
          </div>
          <div className="brief-decision" data-gsap-reveal>
            <span>Estado ilustrativo</span>
            <strong>En ruta</strong>
            <p><ArrowUpRight size={15} aria-hidden="true" /> 3,8% sobre el ritmo</p>
          </div>
          </GsapSequence>
        </section>

        <section className="source-strip" aria-label="Estado ilustrativo de las fuentes">
          <div className="source-intro">
            <Clock3 size={16} aria-hidden="true" />
            <div>
              <span>Frescura por fuente</span>
              <small>No confundir salud de la app con salud del dato</small>
            </div>
          </div>
          <div className="source-list">
            {data.sources.map((source) => (
              <div className="source-item" key={source.name}>
                <i className={`status-dot status-dot--${source.status}`} />
                <div>
                  <strong>{source.name}</strong>
                  <span>{source.detail}</span>
                </div>
                <small>{statusLabels[source.status]}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="kpi-grid" aria-label="Indicadores principales ilustrativos">
          {data.kpis.map((kpi, index) => (
            <motion.article
              key={kpi.id}
              className="kpi-card"
              {...cardMotion}
              transition={{ duration: 0.38, delay: shouldReduceMotion ? 0 : index * 0.055 }}
            >
              <div className="kpi-card__top">
                <span>{kpi.label}</span>
                <ChartNoAxesCombined size={15} aria-hidden="true" />
              </div>
              <strong>{kpi.value}</strong>
              <div className="kpi-card__bottom">
                <div>
                  <span className={`delta delta--${kpi.tone}`}>{kpi.delta}</span>
                  <small>{kpi.comparison}</small>
                </div>
                <Sparkline values={kpi.sparkline} tone={kpi.tone} />
              </div>
            </motion.article>
          ))}
        </section>

        <section className="insights-grid" aria-label="Análisis visual ilustrativo">
          <article className="panel panel--wide">
            <div className="panel-heading">
              <div><p className="eyebrow">Tendencia principal</p><h2>Venta acumulada vs. objetivo</h2></div>
              <span className="panel-kicker">COP · millones</span>
            </div>
            <EChart option={trendOption} className="chart chart--trend" ariaLabel="Gráfico de venta acumulada ilustrativa. La venta termina en 186 millones y el objetivo en 178 millones." />
            <p className="chart-summary">Resumen accesible: la serie ilustrativa se mantiene sobre el objetivo desde el día 4 y termina 8 millones por encima.</p>
          </article>

          <article className="panel">
            <div className="panel-heading"><div><p className="eyebrow">Qué explica la brecha</p><h2>Impulsores y frenos</h2></div></div>
            <EChart option={driversOption} className="chart chart--drivers" ariaLabel="Gráfico ilustrativo de impulsores positivos y negativos de la venta." />
            <p className="chart-summary">Cena de fin de semana y eventos aportan; almuerzos y no-show restan.</p>
          </article>

          <article className="panel">
            <div className="panel-heading">
              <div><p className="eyebrow">Pulso operativo</p><h2>Intensidad por franja</h2></div>
              <span className="panel-kicker">Índice 0–100</span>
            </div>
            <EChart option={heatmapOption} className="chart chart--heatmap" ariaLabel="Mapa de calor ilustrativo. El pico de operación ocurre viernes y sábado entre las 20 y 22 horas." />
            <p className="chart-summary">El pico ilustrativo se concentra viernes y sábado entre las 20:00 y las 22:00.</p>
          </article>
        </section>

        <section className="panel priorities-panel" aria-labelledby="priorities-title">
          <div className="panel-heading">
            <div><p className="eyebrow">De lectura a acción</p><h2 id="priorities-title">Prioridades accionables</h2></div>
            <span className="panel-kicker">4 señales · demo</span>
          </div>
          <div data-lenis-prevent>
            <PriorityTable data={data.priorities} />
          </div>
        </section>

        <footer className="dashboard-footer">
          <span>Ritwal Intelligence · base v0.1</span>
          <span>America/Bogota · sin datos productivos</span>
        </footer>
      </main>
    </div>
    </SmoothScrollProvider>
  );
}
