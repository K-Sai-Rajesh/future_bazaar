import * as React from "react";
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import NativeSelect from "@mui/material/NativeSelect";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
// import { ArrowDown } from "../../helpers/images";
import theme from "./theme";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CustomInputSelect = styled(InputBase)(({ error, theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "4px",
    border: `1px solid ${error ? theme.palette.error.main : '#767676'}`,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    // fontSize: "14px",
    // fontWeight: 500,
    // lineHeight: "120%",
    position: "relative",
    padding: "8px 8px",
    "&:focus": {
      borderColor: !error ? theme.palette.text.primary : "",
    },
  },
  "& .MuiNativeSelect-icon": {
    right: "13px",
    // top: "calc(50% - 0.2em)",
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

function CustomSelectField(props) {
  const { children, label, error, errormessage } = props;
  return (
    <Stack direction="column" spacing={0.75} sx={{ width: "100%" }}>
      <Typography
        color={error ? theme.palette.error.main : ""}
        component="span"
        variant="subtitle1Bold"
        sx={{
          textDecoration: 'none',
          fontSize: '10px',
          fontWeight: 'bold'
        }}
      >
        {label}
      </Typography>
      <FormControl fullWidth>
        <NativeSelect
          multiline
          IconComponent={ArrowDropDownIcon}
          input={<CustomInputSelect error={error} />}
          {...props}
        >
          {children}
        </NativeSelect>
      </FormControl>
      {error ? (
        <Typography color={theme.palette.error.main} variant="menu"
          sx={{
            textDecoration: 'none',
            fontSize: '10px',
            fontWeight: 'bold'
          }}
        >
          {errormessage}
        </Typography>
      ) : null}
    </Stack>
  );
}

export default CustomSelectField;
