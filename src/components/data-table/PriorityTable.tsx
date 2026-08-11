"use client";

import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import type { PriorityItem } from "@/types/dashboard";

const features = tableFeatures({});
const columnHelper = createColumnHelper<typeof features, PriorityItem>();
const columns = columnHelper.columns([
  columnHelper.accessor("priority", {
    header: "Nivel",
    cell: (info) => (
      <span className={`priority priority--${info.getValue().toLowerCase()}`}>
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("signal", {
    header: "Señal",
    cell: (info) => (
      <div className="min-w-56">
        <p className="font-medium text-ink">{info.getValue()}</p>
        <p className="mt-1 max-w-xl text-xs leading-5 text-muted">
          {info.row.original.context}
        </p>
      </div>
    ),
  }),
  columnHelper.accessor("owner", { header: "Responsable" }),
  columnHelper.accessor("due", { header: "Momento" }),
]);

type PriorityTableProps = {
  data: PriorityItem[];
};

export function PriorityTable({ data }: PriorityTableProps) {
  const table = useTable({
    data,
    columns,
    features,
    getRowId: (row) => row.id,
  });

  return (
    <div className="table-scroll" tabIndex={0} aria-label="Prioridades accionables">
      <table className="priority-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} scope="col">
                  {header.isPlaceholder
                    ? null
                    : <table.FlexRender header={header} />}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getAllCells().map((cell) => (
                <td key={cell.id}>
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
