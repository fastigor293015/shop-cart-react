import { styled } from "@mui/system";
import { Button } from "@mui/material";

const PrimaryButton = styled(Button)({
  padding: "10px 30px",
  backgroundColor: "rgb(67 56 202)",
  fontWeight: 500,
  color: "#FFF",
  "&:hover": {
    color: "rgb(67 56 202)",
  }
})

export default PrimaryButton;
