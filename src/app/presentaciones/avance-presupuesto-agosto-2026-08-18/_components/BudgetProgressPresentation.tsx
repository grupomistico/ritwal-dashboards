import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Check, Clock3, Database, Minus } from "lucide-react";
import type { BudgetProgressViewModel } from "@/data/certified/budget-progress-2026-08-18";
import { BudgetTrendChart } from "./BudgetTrendChart";
import styles from "../page.module.css";

type BudgetProgressPresentationProps = {
  model: BudgetProgressViewModel;
};

const number = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });

function money(value: number) {
  return `$${number.format(Math.round(value))}`;
}

function compactMoney(value: number) {
  const absolute = Math.abs(value);
  const sign = value < 0 ? "−" : "";
  const divisor = absolute >= 1_000_000_000 ? 1_000_000_000 : 1_000_000;
  const suffix = absolute >= 1_000_000_000 ? "B" : "M";
  return `${sign}$${(absolute / divisor).toFixed(1).replace(".", ",")} ${suffix}`;
}

function percent(basisPoints: number, digits = 1) {
  return `${(basisPoints / 100).toFixed(digits).replace(".", ",")}%`;
}

function signedPercent(basisPoints: number) {
  if (basisPoints === 0) return "0,0%";
  return `${basisPoints > 0 ? "+" : "−"}${percent(Math.abs(basisPoints))}`;
}

function comparisonIcon(value: number) {
  if (value > 0) return <ArrowUpRight size={15} aria-hidden="true" />;
  if (value < 0) return <ArrowDownRight size={15} aria-hidden="true" />;
  return <Minus size={15} aria-hidden="true" />;
}

export function BudgetProgressPresentation({ model }: BudgetProgressPresentationProps) {
  const { snapshot, periods, budget, comparisons, chart } = model;
  const observedShare = Math.min(budget.observedDailyCop / budget.requiredDailyCop * 100, 100);
  const progressWidth = budget.progressBasisPoints / 100;
  const linearMarker = budget.calendarBasisPoints / 100;
  const currentTax = periods.current.taxesCop;
  const currentExcluded =
    periods.current.excludedInvitationCount
    + periods.current.excludedAccountingCount
    + periods.current.excludedReturnCount;

  const cards = [
    {
      label: "Meta agosto",
      value: money(budget.targetCop),
      detail: "Presupuesto vigente",
    },
    {
      label: "Venta acumulada",
      value: money(budget.accumulatedCop),
      detail: "Base comercial",
    },
    {
      label: "Cumplimiento",
      value: percent(budget.progressBasisPoints),
      detail: "Al cierre del día 18",
    },
    {
      label: "Faltante",
      value: money(budget.remainingCop),
      detail: "Para alcanzar la meta",
      tone: "risk",
    },
    {
      label: "Promedio diario",
      value: money(budget.observedDailyCop),
      detail: "Ritmo observado",
    },
    {
      label: "Ritmo requerido",
      value: money(budget.requiredDailyCop),
      detail: "Cada día del 19 al 31",
      tone: "risk",
    },
    {
      label: "Ticket promedio",
      value: money(periods.current.averageTicketCop),
      detail: `${number.format(periods.current.ticketCount)} tickets comerciales`,
    },
  ];

  const comparisonCards = [
    {
      title: "Agosto 2026",
      eyebrow: "Periodo actual · 1–18",
      period: periods.current,
      delta: null,
      accent: "current",
    },
    {
      title: "Julio 2026",
      eyebrow: "Mes anterior · 1–18",
      period: periods.previousMonth,
      delta: comparisons.previousMonth.base.basisPoints,
      accent: "month",
    },
    {
      title: "Agosto 2025",
      eyebrow: "Año anterior · 1–18",
      period: periods.previousYear,
      delta: comparisons.previousYear.base.basisPoints,
      accent: "year",
    },
  ] as const;

  return (
    <div className={styles.pageShell}>
      <a className="skip-link" href="#budget-content">Saltar al contenido</a>

      <header className={styles.siteHeader}>
        <Link className={styles.brand} href="/" aria-label="Ir a Ritwal Intelligence">
          <Image src="/brand/ritwal-isotipo.png" alt="" width={28} height={40} priority />
          <span><strong>Ritwal</strong><small>Intelligence</small></span>
        </Link>
        <div className={styles.headerMeta}>
          <span>Presentación ejecutiva</span>
          <time dateTime={snapshot.businessAsOf}>Corte 18 · 08 · 2026</time>
        </div>
      </header>

      <main
        id="budget-content"
        className={styles.presentation}
        data-snapshot-id={snapshot.id}
      >
        <section className={styles.hero} aria-labelledby="budget-title">
          <div className={styles.heroOrbit} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <div className={styles.statusBadge}>
              <Check size={13} strokeWidth={2.2} aria-hidden="true" />
              Snapshot certificado · sin actualización automática
            </div>
            <p className={styles.slideLabel}>01 · Estado</p>
            <h1 id="budget-title">Pulso de ventas<br />Agosto 2026</h1>
            <p className={styles.heroLead}>
              Al día 18, Ritwal ha vendido <strong>{money(budget.accumulatedCop)}</strong> antes
              de impuestos y sin propina. El avance alcanza <strong>{percent(budget.progressBasisPoints)}</strong> de
              una meta de {compactMoney(budget.targetCop)}.
            </p>
          </div>

          <aside className={styles.heroFigure} aria-label="Estado principal del presupuesto">
            <span>Cumplimiento</span>
            <strong>{percent(budget.progressBasisPoints)}</strong>
            <p>Faltan {money(budget.remainingCop)}</p>
            <div className={styles.heroSignal}>
              <ArrowDownRight size={16} aria-hidden="true" />
              {money(Math.abs(budget.linearGapCop))} bajo la referencia lineal
            </div>
          </aside>

          <div className={styles.progressBlock}>
            <div className={styles.progressLabels}>
              <span>$0</span>
              <strong>Venta base {compactMoney(budget.accumulatedCop)}</strong>
              <span>{compactMoney(budget.targetCop)}</span>
            </div>
            <div className={styles.progressRail} aria-hidden="true">
              <div className={styles.progressFill} style={{ width: `${progressWidth}%` }} />
              <i className={styles.linearMarker} style={{ left: `${linearMarker}%` }} />
            </div>
            <div className={styles.progressLegend}>
              <span><i className={styles.legendActual} /> Venta acumulada · {percent(budget.progressBasisPoints)}</span>
              <span><i className={styles.legendTarget} /> Avance calendario · {percent(budget.calendarBasisPoints)}</span>
            </div>
          </div>
        </section>

        <section className={styles.kpiGrid} aria-label="Indicadores principales">
          {cards.map((card) => (
            <article className={styles.kpiCard} data-tone={card.tone} key={card.label}>
              <span>{card.label}</span>
              <strong>{card.value}</strong>
              <small>{card.detail}</small>
            </article>
          ))}
        </section>

        <section className={styles.paceSection} aria-labelledby="pace-title">
          <article className={styles.pacePanel}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.slideLabel}>02 · Ritmo de cierre</p>
                <h2 id="pace-title">La velocidad debe subir {percent(budget.accelerationBasisPoints)}</h2>
              </div>
              <span className={styles.riskPill}>13 días restantes</span>
            </div>
            <p className={styles.sectionLead}>
              Para cumplir, el promedio debe pasar de {compactMoney(budget.observedDailyCop)} a {compactMoney(budget.requiredDailyCop)} diarios entre el 19 y el 31 de agosto.
            </p>

            <div className={styles.paceBars} aria-label="Comparación entre ritmo observado y requerido">
              <div className={styles.paceRow}>
                <div><span>Observado</span><strong>{money(budget.observedDailyCop)}</strong></div>
                <div className={styles.paceTrack}><i style={{ width: `${observedShare}%` }} /></div>
              </div>
              <div className={styles.paceRow} data-required>
                <div><span>Requerido</span><strong>{money(budget.requiredDailyCop)}</strong></div>
                <div className={styles.paceTrack}><i style={{ width: "100%" }} /></div>
              </div>
            </div>
          </article>

          <aside className={styles.projectionPanel}>
            <span>Escenario lineal</span>
            <strong>{money(budget.projectedCloseCop)}</strong>
            <p>{percent(budget.projectedProgressBasisPoints)} de la meta</p>
            <div className={styles.projectionGap}>
              Brecha proyectada
              <strong>{money(Math.abs(budget.projectedGapCop))}</strong>
            </div>
            <small>Mantiene el promedio observado; no constituye pronóstico.</small>
          </aside>
        </section>

        <section className={styles.trendPanel} aria-labelledby="trend-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.slideLabel}>Trayectoria · 18 días homologados</p>
              <h2 id="trend-title">Venta base acumulada</h2>
            </div>
            <span className={styles.unitPill}>COP · antes de impuestos</span>
          </div>
          <BudgetTrendChart data={chart} className={styles.trendChart} />
          <p className={styles.chartSummary}>
            Agosto supera julio en {money(comparisons.previousMonth.base.amount)} ({signedPercent(comparisons.previousMonth.base.basisPoints)}), pero está {money(Math.abs(comparisons.previousYear.base.amount))} por debajo de agosto de 2025 ({signedPercent(comparisons.previousYear.base.basisPoints)}).
          </p>
        </section>

        <section className={styles.comparisonSection} aria-labelledby="comparison-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.slideLabel}>03 · Comparativo</p>
              <h2 id="comparison-title">Misma ventana, mismo criterio</h2>
            </div>
            <span className={styles.coveragePill}>18/18 días cubiertos</span>
          </div>

          <div className={styles.comparisonGrid}>
            {comparisonCards.map((item) => (
              <article className={styles.comparisonCard} data-accent={item.accent} key={item.title}>
                <div className={styles.comparisonTop}>
                  <div><span>{item.eyebrow}</span><h3>{item.title}</h3></div>
                  {item.delta === null ? (
                    <span className={styles.currentPill}>Actual</span>
                  ) : (
                    <span className={styles.deltaPill} data-positive={item.delta > 0 || undefined}>
                      {comparisonIcon(item.delta)}
                      Actual {signedPercent(item.delta)}
                    </span>
                  )}
                </div>
                <strong className={styles.comparisonValue}>{money(item.period.baseCop)}</strong>
                <dl className={styles.comparisonStats}>
                  <div><dt>Tickets</dt><dd>{number.format(item.period.ticketCount)}</dd></div>
                  <div><dt>Base / ticket</dt><dd>{money(item.period.averageTicketCop)}</dd></div>
                  <div><dt>Promedio diario</dt><dd>{money(item.period.averageDailyCop)}</dd></div>
                </dl>
              </article>
            ))}
          </div>

          <div className={styles.insightGrid}>
            <article>
              <span>Frente a julio</span>
              <h3>Más valor con menos tickets</h3>
              <p>
                La venta sube {signedPercent(comparisons.previousMonth.base.basisPoints)} aunque los tickets bajan {signedPercent(comparisons.previousMonth.tickets.basisPoints)}. El ticket promedio crece {signedPercent(comparisons.previousMonth.averageTicket.basisPoints)} y compensa el menor volumen.
              </p>
              <small>El avance presupuestal es 3,69 pp menor porque la meta de agosto creció 12,84%.</small>
            </article>
            <article data-risk>
              <span>Frente a agosto 2025</span>
              <h3>La brecha está en volumen</h3>
              <p>
                La venta cae {signedPercent(comparisons.previousYear.base.basisPoints)}. Los tickets bajan {signedPercent(comparisons.previousYear.tickets.basisPoints)}, aunque el valor por ticket mejora {signedPercent(comparisons.previousYear.averageTicket.basisPoints)}.
              </p>
              <small>Tickets no equivale a comensales; mezcla frecuencia, consumo y composición.</small>
            </article>
          </div>
        </section>

        <section className={styles.controlSection} aria-labelledby="control-title">
          <div>
            <p className={styles.slideLabel}>Control de lectura</p>
            <h2 id="control-title">Qué queda fuera de la cifra principal</h2>
            <p>
              El seguimiento presupuestal usa venta base. Los importes siguientes se muestran solo para conciliar el cierre comercial y no se suman al avance.
            </p>
          </div>
          <dl className={styles.controlGrid}>
            <div><dt>Impuestos excluidos</dt><dd>{money(currentTax)}</dd></div>
            <div><dt>Propina excluida</dt><dd>{money(periods.current.tipsCop)}</dd></div>
            <div><dt>Venta con impuesto</dt><dd>{money(periods.current.netCop)}</dd></div>
            <div><dt>Cobrado + propina</dt><dd>{money(periods.current.collectedCop)}</dd></div>
          </dl>
          <div className={styles.qualityStrip}>
            <span><Database size={15} aria-hidden="true" /> {number.format(periods.current.rawDocumentCount)} documentos revisados</span>
            <span><Check size={15} aria-hidden="true" /> 18/18 fechas conciliadas</span>
            <span><Minus size={15} aria-hidden="true" /> {number.format(currentExcluded)} documentos excluidos</span>
          </div>
        </section>

        <section className={styles.methodSection} aria-label="Metodología y advertencias">
          <div className={styles.methodIntro}>
            <Clock3 size={17} aria-hidden="true" />
            <div>
              <strong>Metodología certificada</strong>
              <span>HioPOS / Supabase · America/Bogota · generado 19 ago 2026, 06:00</span>
            </div>
          </div>
          <p>
            Venta base comercial antes de impuestos y sin propina. Excluye invitaciones, devoluciones y documentos compuestos solo por Contabilidad/Servicios. Los tres periodos se recalcularon con el mismo filtro y se conciliaron por dos métodos independientes.
          </p>
          <ul>
            {snapshot.warnings.map((warning) => <li key={warning.code}>{warning.message}</li>)}
          </ul>
        </section>
      </main>

      <footer className={styles.siteFooter}>
        <span>Ritwal Intelligence · {snapshot.id}</span>
        <span>Agregado interno · sin PII</span>
      </footer>
    </div>
  );
}
