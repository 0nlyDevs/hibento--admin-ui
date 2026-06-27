import { createTheme } from "@mui/material/styles";

const sharedTypography = {
  fontFamily:
    '"Manrope", "Sora", "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h4: { fontWeight: 700, fontSize: "1.75rem", fontFamily: '"Sora", serif' },
  h5: { fontWeight: 700, fontSize: "1.25rem", fontFamily: '"Sora", serif' },
  h6: { fontWeight: 600, fontSize: "1.1rem", fontFamily: '"Sora", serif' },
  subtitle1: { fontWeight: 500, fontSize: "0.95rem" },
  body2: { fontSize: "0.875rem" },
  caption: { fontSize: "0.75rem" },
};

const sharedShape = { borderRadius: 12 };

const glassBg = "rgba(34, 34, 34, 0.85)";
const glassBorder = "1px solid rgba(255, 255, 255, 0.1)";

const sharedComponents = {
  MuiCard: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        borderRadius: 16,
        border: glassBorder,
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
        background: glassBg,
        backdropFilter: "blur(12px)",
        backgroundImage: "none",
      }),
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: "28px !important",
        "&:last-child": {
          paddingBottom: "28px !important",
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        background: glassBg,
        backdropFilter: "blur(12px)",
        border: glassBorder,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 500,
        borderRadius: 8,
        padding: "8px 16px",
      },
      containedPrimary: ({ theme }: any) => ({
        color: theme.palette.primary.contrastText,
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      }),
      outlinedPrimary: ({ theme }: any) => ({
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: "rgba(221, 217, 42, 0.12)",
          borderColor: theme.palette.primary.main,
        },
      }),
      textPrimary: ({ theme }: any) => ({
        color: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: "rgba(221, 217, 42, 0.12)",
        },
      }),
    },
  },
  MuiTable: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        "& .RaDatagrid-headerCell": {
          fontWeight: 600,
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: theme.palette.text.secondary,
          backgroundColor: "transparent",
        },
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }: any) => ({
        fontWeight: 600,
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: theme.palette.text.secondary,
        backgroundColor: "transparent",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }),
      root: ({ theme }: any) => ({
        padding: "12px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        color: theme.palette.text.primary,
      }),
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.03)",
        },
        "&.RaDatagrid-rowEven": {
          backgroundColor: "rgba(255, 255, 255, 0.02)",
        },
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: 500,
        fontSize: "0.75rem",
      },
      filledSuccess: ({ theme }: any) => ({
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        color: "#34d399",
        fontWeight: 600,
        border: "1px solid rgba(16, 185, 129, 0.2)",
      }),
      filledWarning: ({ theme }: any) => ({
        backgroundColor: "rgba(245, 158, 11, 0.15)",
        color: "#fbbf24",
        fontWeight: 600,
        border: "1px solid rgba(245, 158, 11, 0.2)",
      }),
      filledError: ({ theme }: any) => ({
        backgroundColor: "rgba(239, 68, 68, 0.15)",
        color: "#f87171",
        fontWeight: 600,
        border: "1px solid rgba(239, 68, 68, 0.2)",
      }),
      filledDefault: ({ theme }: any) => ({
        backgroundColor: "rgba(255, 255, 255, 0.06)",
        color: theme.palette.text.secondary,
        fontWeight: 600,
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }),
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 8,
          backgroundColor: "rgba(255,255,255,0.04)",
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.04)",
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderWidth: 2,
          borderColor: "#ddd92a",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255,255,255,0.2)",
        },
      },
      notchedOutline: {
        borderColor: "rgba(255,255,255,0.12)",
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        boxShadow: "none",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(34, 34, 34, 0.9)",
        backdropFilter: "blur(16px)",
        color: theme.palette.text.primary,
      }),
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        minHeight: "64px !important",
      },
      regular: {
        minHeight: "64px !important",
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }: any) => ({
        borderRight: "1px solid rgba(255,255,255,0.06)",
        background: glassBg,
      }),
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        textTransform: "none",
        fontWeight: 500,
        fontSize: "0.9rem",
        "&.Mui-selected": {
          color: theme.palette.primary.main,
          fontWeight: 600,
        },
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: ({ theme }: any) => ({
        backgroundColor: theme.palette.primary.main,
        height: 3,
        borderRadius: "3px 3px 0 0",
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        backgroundColor: "rgba(221, 217, 42, 0.15)",
      }),
      bar: {
        backgroundColor: "#ddd92a",
      },
    },
  },
  MuiSkeleton: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        backgroundColor: "rgba(255, 255, 255, 0.06)",
      }),
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        borderColor: "rgba(255,255,255,0.08)",
      }),
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.08)",
      }),
      standardSuccess: ({ theme }: any) => ({
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        color: "#34d399",
      }),
      standardWarning: ({ theme }: any) => ({
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        color: "#fbbf24",
      }),
      standardError: ({ theme }: any) => ({
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        color: "#f87171",
      }),
      standardInfo: ({ theme }: any) => ({
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        color: "#818cf8",
      }),
    },
  },
  MuiSwitch: {
    styleOverrides: {
      switchBase: ({ theme }: any) => ({
        "&.Mui-checked": {
          color: theme.palette.primary.main,
        },
        "&.Mui-checked + .MuiSwitch-track": {
          backgroundColor: theme.palette.primary.main,
        },
      }),
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        "&.Mui-checked": {
          color: theme.palette.primary.main,
        },
      }),
    },
  },
  MuiRadio: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        "&.Mui-checked": {
          color: theme.palette.primary.main,
        },
      }),
    },
  },
  MuiPagination: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        "& .Mui-selected": {
          backgroundColor: `${theme.palette.primary.main} !important`,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor: `${theme.palette.primary.dark} !important`,
          },
        },
      }),
    },
  },
  MuiBreadcrumbs: {
    styleOverrides: {
      separator: ({ theme }: any) => ({
        color: "rgba(255,255,255,0.2)",
      }),
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }: any) => ({
        backgroundColor: "#2d2a32",
        color: "#fafdf6",
        borderRadius: 6,
        fontSize: "0.8rem",
        border: "1px solid rgba(255,255,255,0.1)",
      }),
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontWeight: 600,
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: ({ theme }: any) => ({
        "& .MuiMenuItem-root.Mui-selected": {
          backgroundColor: "rgba(221, 217, 42, 0.15)",
          "& .MuiListItemIcon-root": {
            color: theme.palette.primary.main,
          },
          "& .MuiListItemText-primary": {
            color: theme.palette.primary.main,
            fontWeight: 600,
          },
          "&:hover": {
            backgroundColor: "rgba(221, 217, 42, 0.2)",
          },
        },
        "& .MuiMenuItem-root": {
          borderRadius: 8,
          margin: "6px 10px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          },
        },
      }),
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ddd92a",
      light: "#eae151",
      dark: "#c4c026",
      contrastText: "#2d2a32",
    },
    secondary: {
      main: "#2d2a32",
      light: "#4a4752",
      dark: "#1a1820",
      contrastText: "#fafdf6",
    },
    background: {
      default: "transparent",
      paper: "rgba(34, 34, 34, 0.85)",
    },
    text: {
      primary: "#fafdf6",
      secondary: "#a9a7b0",
      disabled: "#6b6973",
    },
    divider: "rgba(255,255,255,0.08)",
    action: {
      active: "#fafdf6",
      hover: "rgba(255, 255, 255, 0.04)",
      selected: "rgba(221, 217, 42, 0.15)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.06)",
    },
    info: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
  },
  typography: sharedTypography,
  shape: sharedShape,
  components: sharedComponents,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ddd92a",
      light: "#eae151",
      dark: "#c4c026",
      contrastText: "#2d2a32",
    },
    secondary: {
      main: "#fafdf6",
      light: "#ffffff",
      dark: "#d4d8ce",
      contrastText: "#2d2a32",
    },
    background: {
      default: "transparent",
      paper: "rgba(34, 34, 34, 0.85)",
    },
    text: {
      primary: "#fafdf6",
      secondary: "#a9a7b0",
      disabled: "#6b6973",
    },
    divider: "rgba(255,255,255,0.08)",
    action: {
      active: "#fafdf6",
      hover: "rgba(255, 255, 255, 0.04)",
      selected: "rgba(221, 217, 42, 0.15)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.06)",
    },
    info: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
  },
  typography: sharedTypography,
  shape: sharedShape,
  components: sharedComponents,
});
