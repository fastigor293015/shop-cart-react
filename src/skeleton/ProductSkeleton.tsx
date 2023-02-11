import { Box, Button, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Star } from "@mui/icons-material";
import { useAppDispatch } from "../app/hooks";
import { add } from "../features/cart/cartSlice";

const ProductSkeleton = () => {
  const { palette } = useTheme();

  return (
    <Box gridColumn="1 span">
      <Skeleton variant="rectangular" height="250px" sx={{ borderRadius: "5px" }} />
      {/* <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="250px"
        borderRadius="5px"
        bgcolor="rgb(241 245 249)"
        sx={{
          transition: "opacity .2s ease-in-out",
        }}
      >
        <img src={image} alt="Фото товара" />
        <Box position="absolute"
          bottom="0"
          left="0"
          display="flex"
          alignItems="center"
          gap="3px"
          p="5px"
          borderRadius="0 5px 0 5px"
          bgcolor={palette.warning.dark}
          sx={{ color: "#FFF" }}
        >
          <Star />
          {rating.rate}
        </Box>
      </Box> */}
      <Box m="10px 0 5px">
        <Skeleton variant="rectangular" height="18px" width="80%" sx={{ borderRadius: "5px" }} />
        <Skeleton variant="rectangular" height="18px" width="30px" sx={{ mt: "5px", borderRadius: "5px" }} />
      </Box>
      <Skeleton variant="rectangular" height="33px" width="101px" sx={{ borderRadius: "5px", bgcolor: palette.info.light }} />
      {/* <Button onClick={() => dispatch(add(item))} sx={{ fontWeight: 500 }}>
        Add to cart
      </Button> */}
    </Box>
  )
}

export default ProductSkeleton;
