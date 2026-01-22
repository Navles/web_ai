"use client";

import React, { ReactNode } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_TableInstance,
  type MRT_TableOptions,
} from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Create a theme instance with improved typography
const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", // blue-600
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 14,
    h6: {
      fontSize: "1.125rem", // 18px
      fontWeight: 600,
      color: "#1e293b", // slate-800
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #e2e8f0", // slate-200
          borderRadius: "0.5rem",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f8fafc", // slate-50
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#f8fafc", // slate-50
          fontWeight: 600, // Semibold for headers
          color: "#64748b", // slate-500 - lighter, more subtle
          fontSize: "0.8125rem", // 13px - slightly smaller
          textTransform: "none",
          letterSpacing: "0.01em",
          paddingTop: "14px",
          paddingBottom: "14px",
          paddingLeft: "16px",
          paddingRight: "16px",
          "&:first-of-type": {
            paddingLeft: "32px",
          },
          "&:last-of-type": {
            paddingRight: "32px",
          },
        },
        body: {
          color: "#0f172a", // slate-900 - darker for better readability
          fontWeight: 400,
          fontSize: "0.875rem", // 14px
          paddingTop: "12px",
          paddingBottom: "12px",
          paddingLeft: "16px",
          paddingRight: "16px",
          "&:first-of-type": {
            paddingLeft: "32px",
          },
          "&:last-of-type": {
            paddingRight: "32px",
          },
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingTop: "12px",
          paddingBottom: "12px",
          "& h3": {
            fontSize: "0.9375rem", // 15px
            fontWeight: 500,
            color: "#475569", // slate-600
            letterSpacing: "-0.01em",
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.875rem",
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(37, 99, 235, 0.04)",
          }
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: "#475569", // slate-600
          fontSize: "0.875rem",
        },
        selectLabel: {
          fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontWeight: 500,
        },
        displayedRows: {
          fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontWeight: 500,
        },
        menuItem: {
          fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontSize: "0.875rem",
        }
      }
    }
  },
});

interface TableProps<T extends MRT_RowData> extends Partial<MRT_TableOptions<T>> {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  renderTopToolbarCustomActions?: ({ table }: { table: MRT_TableInstance<T> }) => ReactNode;
  emptyMessage?: string;
}

export function Table<T extends MRT_RowData>({
  data,
  columns,
  renderTopToolbarCustomActions,
  emptyMessage,
  ...rest
}: TableProps<T>) {
  const table = useMaterialReactTable({
    columns,
    data,
    renderTopToolbarCustomActions,
    localization: {
      noRecordsToDisplay: emptyMessage || "No records to display",
    },
    enableColumnFilterModes: false,
    enableColumnOrdering: false,
    enableGlobalFilter: false,
    enableColumnActions: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    enableHiding: false,
    enableTopToolbar: true,
    initialState: {
      density: "comfortable",
      showColumnFilters: false,
    },
    muiTableProps: {
      sx: {
        tableLayout: "auto",
      }
    },
    muiTableBodyCellProps: {
      sx: {
        borderBottom: "1px solid #f1f5f9", // slate-100 - lighter borders
      }
    },
    ...rest, // Spread dynamic props like state, manualPagination, etc.
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
}