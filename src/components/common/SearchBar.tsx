import { useState, useEffect } from "react";
import { useListContext } from "react-admin";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Search from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ placeholder = "Search..." }: SearchBarProps) {
  const { filterValues, setFilters } = useListContext();
  const [value, setValue] = useState("");

  useEffect(() => {
    const initial = (filterValues?.q as string) ?? "";
    setValue(initial);
  }, [filterValues?.q]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ q: value || undefined }, undefined);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "text.disabled" }} />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setValue("")}>
                <Close sx={{ color: "text.disabled", fontSize: 18 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          borderRadius: "8px",
          color: "text.primary",
          fontSize: "0.9rem",
          "& fieldset": { borderColor: "#413E48" },
          "&:hover fieldset": { borderColor: "text.disabled" },
          "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: "2px" },
        },
        "& .MuiInputBase-input::placeholder": { color: "text.disabled", opacity: 1 },
      }}
    />
  );
}
