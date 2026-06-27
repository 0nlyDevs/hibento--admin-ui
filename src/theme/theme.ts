import { createTheme } from "@mui/material/styles";

const sharedTypography = {
  fontFamily:
    '"Manrope", "Sora", "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h4: { fontWeight: 600, fontSize: "1.75rem" },
  h5: { fontWeight: 600, fontSize: "1.25rem" },
  h6: { fontWeight: 600, fontSize: "1.1rem" },
  subtitle1: { fontWeight: 500, fontSize: "0.95rem" },
  body2: { fontSize: "0.875rem" },
  caption: { fontSize: "0.75rem" },
};

const sharedShape = { borderRadius: 10 };

const sharedComponents = {
  MuiCard: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        borderRadius: 12,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)"
            : "0 1px 3px 0 rgb(0 0 0 / 0.3)",
        backgroundImage: "none",
      }),
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
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
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(221, 217, 42, 0.08)"
              : "rgba(221, 217, 42, 0.12)",
          borderColor: theme.palette.primary.main,
        },
      }),
      textPrimary: ({ theme }: any) => ({
        color: theme.palette.primary.main,
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(221, 217, 42, 0.08)"
              : "rgba(221, 217, 42, 0.12)",
        },
      }),
    },
  },
  MuiTable: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        "& .RaDatagrid-headerCell": {
          fontWeight: 600,
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: theme.palette.text.secondary,
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(45, 42, 50, 0.03)"
              : "rgba(250, 253, 246, 0.03)",
        },
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }: any) => ({
        fontWeight: 600,
        fontSize: "0.8rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: theme.palette.text.secondary,
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(45, 42, 50, 0.03)"
            : "rgba(250, 253, 246, 0.03)",
      }),
      root: ({ theme }: any) => ({
        padding: "12px 16px",
        borderBottomColor: theme.palette.divider,
      }),
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(45, 42, 50, 0.03)"
              : "rgba(250, 253, 246, 0.03)",
        },
        "&.RaDatagrid-rowEven": {
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(45, 42, 50, 0.02)"
              : "rgba(250, 253, 246, 0.02)",
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
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(16, 185, 129, 0.12)"
            : "rgba(16, 185, 129, 0.2)",
        color: theme.palette.success.dark,
        fontWeight: 600,
      }),
      filledWarning: ({ theme }: any) => ({
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(245, 158, 11, 0.12)"
            : "rgba(245, 158, 11, 0.2)",
        color: theme.palette.warning.dark,
        fontWeight: 600,
      }),
      filledError: ({ theme }: any) => ({
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(239, 68, 68, 0.12)"
            : "rgba(239, 68, 68, 0.2)",
        color: theme.palette.error.dark,
        fontWeight: 600,
      }),
      filledDefault: ({ theme }: any) => ({
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(45, 42, 50, 0.08)"
            : "rgba(250, 253, 246, 0.08)",
        color: theme.palette.text.secondary,
        fontWeight: 600,
      }),
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 8,
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
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderWidth: 2,
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        boxShadow:
          theme.palette.mode === "light"
            ? "0 1px 3px 0 rgb(0 0 0 / 0.06)"
            : "0 1px 3px 0 rgb(0 0 0 / 0.3)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }),
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }: any) => ({
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
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
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(221, 217, 42, 0.15)"
            : "rgba(221, 217, 42, 0.25)",
      }),
      bar: {
        backgroundColor: "#DDD92A",
      },
    },
  },
  MuiSkeleton: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(45, 42, 50, 0.08)"
            : "rgba(250, 253, 246, 0.08)",
      }),
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        borderColor: theme.palette.divider,
      }),
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        borderRadius: 10,
      }),
      standardSuccess: ({ theme }: any) => ({
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(16, 185, 129, 0.08)"
            : "rgba(16, 185, 129, 0.15)",
        color: theme.palette.success.dark,
      }),
      standardWarning: ({ theme }: any) => ({
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(245, 158, 11, 0.08)"
            : "rgba(245, 158, 11, 0.15)",
        color: theme.palette.warning.dark,
      }),
      standardError: ({ theme }: any) => ({
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(239, 68, 68, 0.08)"
            : "rgba(239, 68, 68, 0.15)",
        color: theme.palette.error.dark,
      }),
      standardInfo: ({ theme }: any) => ({
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(99, 102, 241, 0.08)"
            : "rgba(99, 102, 241, 0.15)",
        color: theme.palette.info.dark,
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
        color: theme.palette.text.disabled,
      }),
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }: any) => ({
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.text.primary
            : theme.palette.background.paper,
        color:
          theme.palette.mode === "light"
            ? theme.palette.background.paper
            : theme.palette.text.primary,
        borderRadius: 6,
        fontSize: "0.8rem",
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
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(221, 217, 42, 0.12)"
              : "rgba(221, 217, 42, 0.2)",
          "& .MuiListItemIcon-root": {
            color: theme.palette.primary.main,
          },
          "& .MuiListItemText-primary": {
            color: theme.palette.primary.main,
            fontWeight: 600,
          },
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "light"
                ? "rgba(221, 217, 42, 0.18)"
                : "rgba(221, 217, 42, 0.28)",
          },
        },
        "& .MuiMenuItem-root": {
          borderRadius: 8,
          margin: "2px 8px",
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "light"
                ? "rgba(45, 42, 50, 0.04)"
                : "rgba(250, 253, 246, 0.06)",
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
      main: "#DDD92A",
      light: "#EAE151",
      dark: "#C4C026",
      contrastText: "#2D2A32",
    },
    secondary: {
      main: "#2D2A32",
      light: "#4A4752",
      dark: "#1A1820",
      contrastText: "#FAFDF6",
    },
    background: {
      default: "#FAFDF6",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2D2A32",
      secondary: "#6B6973",
      disabled: "#9E9CA5",
    },
    divider: "#E8E7EB",
    action: {
      active: "#2D2A32",
      hover: "rgba(45, 42, 50, 0.04)",
      selected: "rgba(221, 217, 42, 0.12)",
      disabled: "rgba(45, 42, 50, 0.26)",
      disabledBackground: "rgba(45, 42, 50, 0.08)",
    },
    info: {
      main: "#6366F1",
      light: "#818CF8",
      dark: "#4F46E5",
    },
    success: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#DC2626",
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
      main: "#DDD92A",
      light: "#EAE151",
      dark: "#C4C026",
      contrastText: "#2D2A32",
    },
    secondary: {
      main: "#FAFDF6",
      light: "#FFFFFF",
      dark: "#D4D8CE",
      contrastText: "#2D2A32",
    },
    background: {
      default: "#2D2A32",
      paper: "#38353E",
    },
    text: {
      primary: "#FAFDF6",
      secondary: "#A9A7B0",
      disabled: "#6B6973",
    },
    divider: "#413E48",
    action: {
      active: "#FAFDF6",
      hover: "rgba(250, 253, 246, 0.06)",
      selected: "rgba(221, 217, 42, 0.2)",
      disabled: "rgba(250, 253, 246, 0.3)",
      disabledBackground: "rgba(250, 253, 246, 0.08)",
    },
    info: {
      main: "#6366F1",
      light: "#818CF8",
      dark: "#4F46E5",
    },
    success: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#DC2626",
    },
  },
  typography: sharedTypography,
  shape: sharedShape,
  components: sharedComponents,
});
