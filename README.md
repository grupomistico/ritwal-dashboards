# Ritwal Intelligence

Plataforma unificada de dashboards para alta gerencia y operaciones de Ritwal. El primer despliegue es una **base funcional con datos demostrativos**: valida arquitectura, lenguaje visual, rendimiento y despliegue sin presentar cifras ficticias como información real del negocio.

## Principios del producto

- Una sola aplicación y una sola definición de cada KPI.
- Portadas por rol, no proyectos aislados por director.
- La primera pantalla responde: estado, meta, desviación y acción.
- Entre 5 y 8 indicadores principales por portada.
- Frescura visible por fuente; una fuente atrasada nunca se presenta como actual.
- Los jobs de HioPOS, Precompro, Meta y otros canales viven fuera del frontend.
- El navegador solo consume modelos analíticos certificados en Supabase.

## Stack

- Next.js 16, React 19 y TypeScript estricto.
- Tailwind CSS 4 y componentes propios con el brandbook oficial Ritwal. La web usa Cormorant Garamond, Montserrat y DM Mono (OFL); no distribuye fuentes de prueba o de licencia no verificada.
- Apache ECharts 6 con importación modular para gráficos.
- TanStack Table 9 para drill-down operativo semántico.
- Motion para estados de interfaz; GSAP para una secuencia finita de firma.
- Lenis solo en la vista ejecutiva, con zonas operativas excluidas.
- React Three Fiber para geometría ambiental opcional; fallback SVG y movimiento reducido incluidos.
- Vitest, Playwright y axe para QA.
- Contenedor Docker standalone para Dokploy.

## Desarrollo local

Requiere Node.js 24 y npm.

```bash
npm ci
npm run dev
```

Comandos de calidad:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

La suite completa, excepto navegador:

```bash
npm run qa
```

## Contrato de datos previsto

Cada módulo recibirá un sobre común con versión, zona horaria, corte de negocio, frescura por fuente, advertencias y filtros. Los importes COP deben cruzar la frontera JSON como enteros o strings decimales; nunca como flotantes silenciosos.

```ts
type DashboardEnvelope<T> = {
  schemaVersion: 1;
  timezone: "America/Bogota";
  generatedAt: string;
  businessAsOf: string;
  freshness: Array<{
    source: string;
    asOf: string | null;
    lagSeconds: number | null;
    status: "fresh" | "warning" | "stale" | "error";
  }>;
  warnings: Array<{ code: string; message: string }>;
  filters: Record<string, string | string[]>;
  data: T;
};
```

## Reglas para nuevos dashboards

1. Andrés define primero tres decisiones que la vista debe habilitar.
2. Cada KPI se documenta con fórmula, fuente, dueño y frecuencia.
3. La consulta agregada se implementa en Supabase/RPC; el componente no calcula negocio.
4. Server Components obtienen datos; solo filtros, tablas, gráficos y animación son Client Components.
5. Cada gráfico lleva resumen textual o tabla accesible.
6. WebGL es decorativo y nunca comunica información crítica.
7. Producción exige autenticación, permisos por dashboard y pruebas de conciliación.

## Salud y despliegue

- `GET /api/health/live`: proceso vivo.
- `GET /api/health/ready`: modo de datos y disponibilidad funcional.
- `Dockerfile`: imagen multi-stage, usuario sin privilegios, puerto 3000.
- Variables de ejecución: únicamente desde Dokploy. `.env.example` contiene nombres, nunca secretos.

El modo actual reporta `dataMode: demo` y `productionSourcesConfigured: false` de forma intencional.

## Acceso

El acceso a código debe darse con permiso de escritura al repositorio, sin privilegios administrativos. Dokploy debe limitarse al proyecto y servicio de dashboards. Las credenciales de ingesta, claves globales y `service_role` nunca pertenecen a este repositorio ni al navegador.
