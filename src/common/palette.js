import { colors } from "@mui/material";

const white = "#FFFFFF";
const black = "#000000";

const theme = {
  type: "light",
  common: {
    black,
    white,
  },
  primary: {
    contrastText: white,
    dark: "#1A2245",
    main: "#28356A",
    light: "#3D51A2",
  },
  secondary: {
    contrastText: white,
    dark: "#9E2540",
    main: "#B32A48",
    light: "#D23E5F",
  },
  accentColor: {
    dark: "#956D04",
    main: "#F9BC1D",
    light: "##FBD36A",
  },
  success: {
    contrastText: white,
    dark: colors.green[900], //  900: '#1b5e20',
    main: "#41DA7E",
    light: "#5F934E",
  },
  info: {
    contrastText: white,
    dark: colors.blue[900], //  900: '#0d47a1',
    main: "#F1F1F6",
    light: colors.blue[400], //  400: '#42a5f5',
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900], // 900: '#e65100',
    main: "#EEAF22",
    light: colors.orange[400], //  400: '#ffa726',
  },
  error: {
    contrastText: white,
    dark: colors.red[900], //  900: '#b71c1c',
    main: "#F04461",
    light: colors.red[400], //  400: '#ef5350',
  },
  text: {
    primary: "#000000",
    secondary: "#1D1D1D",
    tertiary: "#1D1D1DCC",
    link: "#F3692E",
  },
  action: {
    disabled: "#A0A0A0",
    hover: "rgba(40, 53, 106, 0.1)",
  },
  background: {
    default: white,
    paper: white,
  },
  divider: "rgba(29, 29, 29, 0.2)",
  checkbox: {
    dark: "#4D8BD5",
    main: "#4A8FE2",
    border: "#A3B0BE",
    hover: "#EBF1F5",
    disabled: "#DDE2E7",
  },
};

export default theme;
