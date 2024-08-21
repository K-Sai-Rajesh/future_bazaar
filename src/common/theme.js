import { createTheme } from "@mui/material/styles";
import palette from "./palette";
 
// A custom theme for this app
const theme = createTheme({
  palette: palette,
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          lineHeight: "20px",
          fontSize: "14px",
          fontWeight: 400,
          backgroundColor: "#0078D6",
 
          boxShadow: "unset",
          textTransform: "uppercase",
          letterSpacing: "0.02em",
          "&.Mui-disabled": {
            backgroundColor: palette.action.disabled,
            color: palette.common.white,
          },
          "& .MuiLoadingButton-loadingIndicator": {
            color: palette.common.white,
          },
          disableRipple: false,
        },
 
        outlined: {
          borderColor: palette.primary.main,
          color: palette.primary.main,
          backgroundColor: palette.common.white,
          "&:hover": {
            borderColor: palette.primary.main,
            backgroundColor: palette.common.white,
          },
        },
        containedSizeLarge: {
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
          padding: "10px 24px",
        },
        containedSizeMedium: {
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "20px",
          padding: "6px 24px",
        },
        containedSizeSmall: {
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "16px",
          padding: "6px 12px",
        },
        outlinedSizeLarge: {
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
          padding: "10px 24px",
        },
        outlinedSizeMedium: {
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "20px",
          padding: "6px 24px",
        },
        outlinedSizeSmall: {
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "16px",
          padding: "6px 12px",
        },
      },
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});
 
export default theme;