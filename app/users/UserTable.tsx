"use client";

import React, { useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from "material-react-table";
import { Edit2, Trash2 } from "lucide-react";
import { User } from "@/lib/services/userService";

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
    isLoading: boolean;
}

export default function UserTable({
    users,
    onEdit,
    onDelete,
    isLoading,
}: UserTableProps) {
    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: "firstName",
                header: "First Name",
                size: 150,
            },
            {
                accessorKey: "lastName",
                header: "Last Name",
                size: 150,
            },
            {
                accessorKey: "email",
                header: "Email",
                size: 250,
            },
            {
                accessorKey: "role",
                header: "Role",
                size: 100,
                Cell: ({ cell }) => (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {cell.getValue<string>()}
                    </span>
                ),
            },
            {
                accessorKey: "status",
                header: "Status",
                size: 100,
                Cell: ({ cell }) => {
                    const status = cell.getValue<string>();
                    return (
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                        >
                            {status}
                        </span>
                    );
                },
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: users,
        state: { isLoading },
        enableRowActions: true,
        positionActionsColumn: "last",
        renderRowActions: ({ row }) => (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onEdit(row.original)}
                    className="p-1 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                    title="Edit"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(row.original)}
                    className="p-1 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                    title="Delete"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        ),
        muiTablePaperProps: {
            elevation: 0,
            style: {
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
            },
        },
        muiTableHeadCellProps: {
            style: {
                backgroundColor: "#f8fafc",
                fontWeight: 600,
                color: "#475569",
            },
        },
    });

    return <MaterialReactTable table={table} />;
}
