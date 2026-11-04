"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown, Search } from "lucide-react";
import { useTable } from "@tanstack/react-table";

import MapThumbnail from "@/components/MapThumbnail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CHART_EMPHASIS_COLOR,
  DEFAULT_TABLE_PAGE_SIZE,
  TABLE_SEARCHES_COLUMN,
} from "@/constants";
import decorateWithChartCard from "@/utils/decorateWithChartCard";
import getCoordinateLabels from "@/utils/getCoordinateLabels";
import { formatFixedPercentage, formatNumber } from "@/utils/formatNumber";
import { cn } from "cn";
import { dataTableFeatures } from "./features";
import Pagination from "./Pagination";
import { DataTableColumnFormat, DataTableProps, DataTableRow } from "./types";

const RIGHT_ALIGNED_FORMATS: DataTableColumnFormat[] = ["number", "percentage"];

function isRightAligned(format: DataTableColumnFormat) {
  return RIGHT_ALIGNED_FORMATS.includes(format);
}

function ShareCell({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full"
          style={{
            width: `${value * 100}%`,
            backgroundColor: CHART_EMPHASIS_COLOR,
          }}
        />
      </div>
      <span className="text-muted-foreground">
        {formatFixedPercentage(value)}
      </span>
    </div>
  );
}

function renderCell(
  format: DataTableColumnFormat,
  value: string | number,
  rowLabel: string
) {
  switch (format) {
    case "text":
      return <span className="font-medium">{value}</span>;
    case "number":
      return formatNumber(Number(value));
    case "percentage":
      return formatFixedPercentage(Number(value));
    case "share":
      return <ShareCell value={Number(value)} />;
    case "map": {
      const { shortLatitudeLabel, shortLongitudeLabel } = getCoordinateLabels(
        String(value)
      );

      return (
        <div className="flex items-center gap-2">
          <MapThumbnail label={rowLabel} coordinates={String(value)} />
          <div className="flex flex-col font-medium">
            <span>{shortLatitudeLabel}</span>
            <span>{shortLongitudeLabel}</span>
          </div>
        </div>
      );
    }
    default:
      ((_: never) => {
        throw new Error(`[DataTable] > [renderCell]: Unhandled case ${_}`);
      })(format);
  }
}

interface DataTableBodyProps {
  data: DataTableRow[];
  columns: readonly {
    key: string;
    header: string;
    format: DataTableColumnFormat;
  }[];
  defaultPageSize: number;
  defaultSort?: { key: string; desc: boolean };
  search: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
}

function DataTableBody({
  data,
  columns,
  defaultPageSize,
  defaultSort = { key: TABLE_SEARCHES_COLUMN.key, desc: true },
  search,
  onSearchChange,
}: DataTableBodyProps) {
  const tableColumns = useMemo(
    () =>
      columns.map(({ key, header, format }) => ({
        id: key,
        accessorKey: key,
        header,
        ...(format === "text" ? { sortFn: "text" as const } : {}),
      })),
    [columns]
  );

  const table = useTable({
    features: dataTableFeatures,
    data,
    columns: tableColumns,
    initialState: {
      sorting: [{ id: defaultSort.key, desc: defaultSort.desc }],
      pagination: { pageIndex: 0, pageSize: defaultPageSize },
    },
    state: { globalFilter: search },
    onGlobalFilterChange: onSearchChange,
    globalFilterFn: "includesString",
    getColumnCanGlobalFilter: (column) => column.id === columns[0].key,
  });

  const { pageIndex, pageSize } = table.state.pagination;
  const rows = table.getRowModel().rows;

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const { format } = columns[index];
                  const sortDirection = header.column.getIsSorted();
                  const SortIcon = !sortDirection
                    ? ChevronsUpDown
                    : sortDirection === "desc"
                      ? ArrowDown
                      : ArrowUp;

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(isRightAligned(format) && "text-right")}
                      aria-sort={
                        !sortDirection
                          ? "none"
                          : sortDirection === "desc"
                            ? "descending"
                            : "ascending"
                      }
                    >
                      <Button
                        variant="ghost"
                        size="xs"
                        className={cn(
                          "font-semibold",
                          isRightAligned(format) ? "-mr-2" : "-ml-2"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {columns[index].header}
                        <SortIcon
                          className={cn(
                            !sortDirection && "text-muted-foreground"
                          )}
                        />
                      </Button>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map(({ key, format }) => (
                    <TableCell
                      key={key}
                      className={cn(isRightAligned(format) && "text-right")}
                    >
                      {renderCell(
                        format,
                        row.original[key],
                        String(row.original[columns[0].key])
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-16 text-center text-muted-foreground"
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={table.getPageCount()}
        totalRows={table.getFilteredRowModel().rows.length}
        onPageChange={table.setPageIndex}
        onPageSizeChange={table.setPageSize}
      />
    </div>
  );
}

const DecoratedDataTable = decorateWithChartCard(DataTableBody);

export default function DataTable<TRow extends DataTableRow>({
  searchable = false,
  defaultPageSize = DEFAULT_TABLE_PAGE_SIZE,
  className = "h-auto",
  ...chartCardProps
}: DataTableProps<TRow>) {
  const [search, setSearch] = useState("");

  return (
    <DecoratedDataTable
      {...chartCardProps}
      className={className}
      defaultPageSize={defaultPageSize}
      search={search}
      onSearchChange={setSearch}
      chartAction={
        searchable ? (
          <div className="relative w-40 sm:w-56">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              aria-label={`Search ${chartCardProps.title}`}
              placeholder="Search..."
              className="rounded-full pl-8"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        ) : undefined
      }
    />
  );
}
