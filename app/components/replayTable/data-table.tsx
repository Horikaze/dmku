// @ts-nocheck
"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import currentReplay from "@/app/zustand/currentReplay";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import {
  getCharacterFromData,
  getCharacterFromDataWithoutType,
} from "@/lib/getRankingData";
import { Replay } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { FaCopy, FaInfo, FaWindowClose } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
    getFilteredRowModel: getFilteredRowModel(),
  });
  data.map((obj) => {
    // @ts-ignore
    obj.game = obj.game.toString();
    // @ts-ignore
    obj.char =
      obj.game === 9
        ? getCharacterFromDataWithoutType(obj.character!)
        : getCharacterFromData(obj.character!, obj.shottype!);
  });
  const { toast } = useToast();
  const { addReplay } = currentReplay();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
              <TableHead></TableHead>
              <TableHead
                onClick={() => {
                  setColumnFilters([]);
                  setSorting([]);
                }}
                className="font-bold hover:brightness-125 cursor-pointer text-center"
              >
                <TooltipProvider>
                  <Tooltip delayDuration={500}>
                    <TooltipTrigger>
                      <div className="h-6 w-6 flex items-center justify-center">
                        <FaWindowClose />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Reset filters</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className="hover:brightness-125 cursor-pointer bg-secondary p-0">
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(row.original.replayId);
                      toast({
                        description: "Replay ID copied",
                      });
                    }}
                    className="h-8 w-full flex items-center justify-center px-3"
                  >
                    <FaCopy />
                  </div>
                </TableCell>
                <TableCell className="hover:brightness-125 cursor-pointer bg-secondary p-0">
                  <div
                    onClick={() => {
                      addReplay(row.original as Replay);
                      toast({
                        description: "Replay added to compare",
                      });
                    }}
                  >
                    <div className="h-8 w-full flex items-center justify-center px-3">
                      <MdOutlineCompareArrows />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hover:brightness-125 cursor-pointer bg-secondary p-0">
                  <Link
                    href={`/replay/${row.original.replayId}`}
                    prefetch={false}
                  >
                    <div className="h-8 w-full flex items-center justify-center px-3">
                      <FaInfo />
                    </div>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
