import * as React from "react";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import theme from "./theme";

const CustomInputField = styled((props) => (
  <Stack
    spacing={0.75}
    sx={{ width: "100%", ...(props?.stackstyles && props?.stackstyles) }}
  >
    {props?.label && (
      <Typography
        color={
          props.error ? theme.palette.error.main : theme.palette.text.secondary
        }
        sx={{
          textDecoration: 'none',
          fontSize: '10px',
          fontWeight: 'bold',
          fontFamily:'Raleway'
        }}
        component="span"
        variant="body1Bold"
      >
        {props.label}
      </Typography>
    )}
    <InputBase {...props} />
    {props.error ? (
      <Typography
        color={theme.palette.error.main}
        fontSize="13px"
        marginTop={`${theme.spacing(1)} !important`}
        variant="body1"
        sx={{
          textDecoration: 'none',
          fontSize: '10px',
          fontWeight: 'bold',
          fontFamily:'Raleway'
        }}
      >
        {props.errormessage}
      </Typography>
    ) : null}
  </Stack>
))(({ theme, error }) => ({
  "&.MuiInputBase-root": {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    padding: theme.spacing(1.25, 1.5),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    border: `0.25px solid ${theme.palette.text.secondary}`,
    borderRadius: "4px",
    "& .MuiInputBase-input": {
      padding: 0,
    },
    "& .MuiInputAdornment-root": {
      "& .MuiButtonBase-root": {
        marginRight: theme.spacing(1.5),
      },
    },
  },
  "&.Mui-error": {
    border: `0.25px solid ${theme.palette.error.main}`,
  },
  "&.Mui-focused": {
    border: !error ? `0.25px solid ${theme.palette.primary.main}` : "",
  },
  "&.MuiInputBase-disabled": {
    backgroundColor: "#e9ecef",
    opacity: 0.65,
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
}));

export default CustomInputField;
