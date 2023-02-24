import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useAppSelector } from "../../app/hooks";
import Container from "../../components/Container";
import Slider from "../../components/Slider";

const images = [
  "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png"
]

const MainPage = () => {
  const productsImages = useAppSelector(state => state.products.list).map(item => item.image);

  return (
    <Container>
      <Box
        position="absolute"
        left="0"
        height="200px"
        width="200px"
        boxShadow="0px 0px 20px 7px rgba(34, 60, 80, 0.2)"
        component={motion.div}
        drag
        dragSnapToOrigin
        whileHover={{ borderRadius: "50%" }}
        whileFocus={{ borderRadius: "50%" }}
        whileTap={{ scale: .8 }}
      ></Box>

      <Slider imagesList={productsImages} />

    </Container>
  )
};

export default MainPage;

