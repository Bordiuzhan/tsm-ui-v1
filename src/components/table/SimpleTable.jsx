import React, {useState} from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import ArrowUpSvg from "../svg/ArrowUpSvg";
import ArrowDownSvg from "../svg/ArrowDownSvg";
import ArrowUpDownSvg from "../svg/ArrowUpDownSvg";

function SimpleTable({
                         data,
                         columns,
                         search,
                         setFiltering,
                         columnVisibility,
                         setColumnVisibility,
                     }) {
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data,
        columns,
        defaultColumn: {
            size: 150,
            minSize: 60,
            maxSize: 500,
        },
        initialState: {
            pagination: {
                pageSize: 25,
            },
        },
        state: {
            columnVisibility,
            sorting,
            globalFilter: search,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onColumnVisibilityChange: setColumnVisibility,
    });

    const loadMoreData = () => {
        table.setPageSize(table.getState().pagination.pageSize + 25);
    };

    return (
        <div className="table-responsive">
            <div></div>

            {/*Table */}
            <table className="table table-hover" cellSpacing="0" width="100%">
                {/*Table head */}
                <thead className="table-secondary ">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                {...{
                                    key: header.id,
                                    onClick:
                                        header.column.id !== "action"
                                            ? header.column.getToggleSortingHandler()
                                            : null,
                                    style: {
                                        width: header.column.columnDef.width,
                                        minWidth: header.column.columnDef.minWidth,
                                        maxWidth: header.column.columnDef.maxWidth,
                                    },
                                }}
                            >
                                <div className="d-flex justify-content-between">
                                    {header.column.columnDef.header}
                                    {header.column.id !== "action" &&
                                        ({
                                            asc: <ArrowUpSvg/>,
                                            desc: <ArrowDownSvg/>,
                                        }[header.column.getIsSorted()])}
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                {/*Table body */}
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {cell.column.id === "role" ? (
                                    <span className="text-capitalize">
                      {cell.row.original.role.map((role) => role).join(", ")}
                    </span>
                                ) : cell.column.id === "status" ? (
                                    <span
                                        className={`text-capitalize ${cell.row.original.status === "active" ? "bgc-green-100 " : "bgc-blue-100 "} px-2 py-1 rounded-3`}
                                    >
                      {cell.row.original.status}
                    </span>
                                ) : (
                                    flexRender(cell.column.columnDef.cell, cell.getContext())
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {/*Pagination */}
            <div className="d-flex justify-content-center  ">
                {data.length > table.getState().pagination.pageSize &&
                table.getFilteredRowModel().rows.length >
                table.getState().pagination.pageSize ? (
                    <button className=" border-0 bg-white " onClick={loadMoreData}>
                        <ArrowDownSvg size={11}/>
                        <u>Load more...</u>
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default SimpleTable;
