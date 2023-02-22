import { TextField, TextFieldProps, useMediaQuery } from "@mui/material";

const FormInput = (props: TextFieldProps) => {
  const isNonMobileScreen = useMediaQuery("(min-width:350px)");

  return (
    <TextField
      {...props}
      fullWidth
      variant="standard"
      InputLabelProps={{ style: { fontSize: isNonMobileScreen ? undefined : "12px" } }}
      inputProps={{ style: { fontSize: isNonMobileScreen ? "16px" : "14px" } }}
    />
  )
}

export default FormInput;
