import type { ExecutiveDemoData } from "@/types/dashboard";

/**
 * Visual fixture only. These values are deliberately isolated from production
 * data so the starter can be reviewed without implying that any KPI is real.
 */
export const executiveDemoData: ExecutiveDemoData = {
  sources: [
    { name: "HioPOS", detail: "Ilustrativo · hace 18 min", status: "fresh" },
    { name: "Reservas", detail: "Ilustrativo · hace 7 min", status: "fresh" },
    { name: "Meta Ads", detail: "Ilustrativo · corte diario", status: "warning" },
  ],
  kpis: [
    {
      id: "sales",
      label: "Venta neta",
      value: "$186,4 M",
      comparison: "vs. objetivo mensual",
      delta: "+6,8%",
      tone: "positive",
      sparkline: [42, 48, 44, 56, 61, 67, 73, 79],
    },
    {
      id: "pace",
      label: "Ritmo de cierre",
      value: "103%",
      comparison: "proyección a fin de mes",
      delta: "+3 pp",
      tone: "positive",
      sparkline: [74, 77, 83, 81, 90, 94, 99, 103],
    },
    {
      id: "guests",
      label: "Comensales",
      value: "1.842",
      comparison: "acumulado ilustrativo",
      delta: "+4,2%",
      tone: "positive",
      sparkline: [55, 52, 62, 60, 66, 68, 76, 79],
    },
    {
      id: "ticket",
      label: "Ticket promedio",
      value: "$101.190",
      comparison: "por comensal",
      delta: "+1,9%",
      tone: "neutral",
      sparkline: [63, 67, 65, 68, 66, 71, 70, 72],
    },
    {
      id: "reservations",
      label: "Reservas próximas",
      value: "286",
      comparison: "siguientes 7 días",
      delta: "74% confirmadas",
      tone: "warning",
      sparkline: [58, 62, 59, 67, 69, 73, 71, 76],
    },
  ],
  trend: {
    labels: ["1 ago", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
    actual: [12, 28, 43, 61, 74, 93, 109, 126, 151, 169, 186],
    goal: [14, 29, 45, 60, 76, 92, 108, 124, 141, 159, 178],
  },
  drivers: [
    { label: "Cena fin de semana", value: 12.6, kind: "positive" },
    { label: "Eventos privados", value: 7.4, kind: "positive" },
    { label: "Almuerzos entre semana", value: -4.8, kind: "negative" },
    { label: "No-show", value: -2.1, kind: "negative" },
  ],
  heatmap: {
    days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    hours: ["12h", "14h", "16h", "18h", "20h", "22h"],
    values: [
      [0, 0, 28], [1, 0, 32], [2, 0, 35], [3, 0, 46], [4, 0, 59], [5, 0, 77], [6, 0, 63],
      [0, 1, 34], [1, 1, 37], [2, 1, 41], [3, 1, 50], [4, 1, 66], [5, 1, 84], [6, 1, 69],
      [0, 2, 12], [1, 2, 14], [2, 2, 18], [3, 2, 24], [4, 2, 31], [5, 2, 42], [6, 2, 33],
      [0, 3, 31], [1, 3, 34], [2, 3, 39], [3, 3, 52], [4, 3, 72], [5, 3, 91], [6, 3, 75],
      [0, 4, 54], [1, 4, 57], [2, 4, 62], [3, 4, 73], [4, 4, 88], [5, 4, 97], [6, 4, 83],
      [0, 5, 38], [1, 5, 41], [2, 5, 47], [3, 5, 61], [4, 5, 79], [5, 5, 93], [6, 5, 72],
    ],
  },
  priorities: [
    {
      id: "p-1",
      priority: "Alta",
      signal: "Confirmación de reservas",
      context: "26% de las reservas de los próximos 7 días aún requiere contacto.",
      owner: "Operaciones",
      due: "Hoy · 16:00",
    },
    {
      id: "p-2",
      priority: "Alta",
      signal: "Almuerzo entre semana",
      context: "La franja está 4,8% por debajo del escenario ilustrativo.",
      owner: "Comercial",
      due: "Mañana",
    },
    {
      id: "p-3",
      priority: "Media",
      signal: "Frescura de Meta Ads",
      context: "La fuente usa corte diario; la lectura intradía no está disponible.",
      owner: "Mercadeo",
      due: "Cierre diario",
    },
    {
      id: "p-4",
      priority: "Seguimiento",
      signal: "Concentración del sábado",
      context: "La demanda alcanza su pico entre las 20:00 y las 22:00.",
      owner: "Operaciones",
      due: "Plan de turno",
    },
  ],
};
