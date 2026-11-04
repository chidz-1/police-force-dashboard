import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TABLE_PAGE_SIZE_OPTIONS } from "@/constants";
import { formatNumber } from "@/utils/formatNumber";
import getPaginationRange from "@/utils/getPaginationRange";

interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalRows: number;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function Pagination({
  pageIndex,
  pageSize,
  pageCount,
  totalRows,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const firstRow = totalRows ? pageIndex * pageSize + 1 : 0;
  const lastRow = Math.min((pageIndex + 1) * pageSize, totalRows);
  const totalPages = Math.max(pageCount, 1);
  const pageSizeItems = [...new Set([...TABLE_PAGE_SIZE_OPTIONS, pageSize])]
    .sort((a, b) => a - b)
    .map((size) => ({ label: `${size} / page`, value: size }));

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3 text-muted-foreground">
        <span>
          {formatNumber(firstRow)}–{formatNumber(lastRow)} of{" "}
          {formatNumber(totalRows)}
        </span>
        <Select
          items={pageSizeItems}
          value={pageSize}
          onValueChange={(newPageSize) => {
            if (newPageSize !== null) {
              onPageSizeChange(newPageSize);
            }
          }}
        >
          <SelectTrigger
            size="sm"
            className="w-auto rounded-full"
            aria-label="Rows per page"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeItems.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <nav aria-label="Table pagination" className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          aria-label="Previous page"
          disabled={pageIndex === 0}
          onClick={() => onPageChange(pageIndex - 1)}
        >
          <ChevronLeft />
        </Button>
        {getPaginationRange(pageIndex + 1, totalPages).map((item) =>
          typeof item === "number" ? (
            <Button
              key={item}
              variant={item === pageIndex + 1 ? "default" : "ghost"}
              size="icon-sm"
              className="rounded-full"
              aria-label={`Page ${item}`}
              aria-current={item === pageIndex + 1 ? "page" : undefined}
              onClick={() => onPageChange(item - 1)}
            >
              {item}
            </Button>
          ) : (
            <span key={item} className="px-1 text-muted-foreground">
              …
            </span>
          )
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          aria-label="Next page"
          disabled={pageIndex >= totalPages - 1}
          onClick={() => onPageChange(pageIndex + 1)}
        >
          <ChevronRight />
        </Button>
      </nav>
    </div>
  );
}
