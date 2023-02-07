import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Star } from "@mui/icons-material";
import { useAppDispatch } from "../app/hooks";
import { add } from "../features/cart/cartSlice";
import { IProduct } from "../features/products/productsSlice";

interface IProductProps {
  item: IProduct;
}

const Product = ({ item }: IProductProps) => {
  const {
    category,
    description,
    id,
    image,
    price,
    rating,
    title,
  } = item;

  const { palette } = useTheme();
  const dispatch = useAppDispatch();
  const isDesktopScreen = useMediaQuery("(min-width:1200px)");

  return (
    <Box gridColumn="1 span" sx={{
      cursor: "pointer",
      "&:hover > div:first-of-type": {
        opacity: 0.5,
      }
    }}>
      <Box
      position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="250px"
        p="20px"
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
      </Box>
      <Box m="10px 0 5px">
        <Typography fontWeight="500">
          {title}
        </Typography>
        <Typography mt="5px">
          {`$${price.toLocaleString("en-US")}`}
        </Typography>
      </Box>
      <Button onClick={() => dispatch(add(item))} sx={{ fontWeight: 500 }}>
        Add to cart
      </Button>
    </Box>
  )
}

export default Product;
