import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { motion } from "framer-motion";
import Container from "../../components/Container";
import Slider from "../../components/Slider";
import { ArrowForward } from "@mui/icons-material";
import PrimaryButton from "../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

const images = [
  "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png"
]

const MainPage = () => {
  const productsImages = useAppSelector(state => state.products.list).map(item => item.image);
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");

  return (
    <motion.div animate={{ x: 0, opacity: 1 }} initial={{ x: "50%", opacity: 0 }} exit={{ x: "50%", opacity: 0 }} transition={{ type: "keyframes" }}>
      <Container>
        <Box display={"flex"} alignItems="center" justifyContent="space-between" mb="30px">
          <Typography variant={isNonMobileScreen ? "h2" : "h3"} fontWeight="700">
            Trending products
          </Typography>
          <PrimaryButton
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              p: "8px 20px",
              // color: "rgb(67 56 202)",
              // bgcolor: "transparent",
            }}
            onClick={() => navigate("/products")}
          >
            {isNonMobileScreen ? "Go to all products" : ""}
            <ArrowForward />
          </PrimaryButton>
        </Box>
        <Slider height={isNonMobileScreen ? "500px" : "300px"} imagesList={productsImages} />
      </Container>
    </motion.div>
  )
};

export default MainPage;

