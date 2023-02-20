import { useNavigate } from "react-router-dom";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Add, Star } from "@mui/icons-material";
import { useAppDispatch } from "../app/hooks";
import { add } from "../features/cart/cartSlice";
import { IProduct } from "../features/products/productsSlice";
import PrimaryButton from "./PrimaryButton";

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

  const navigate = useNavigate();
  const isDesktopScreen = useMediaQuery("(min-width:1200px)");

  return (
    <Box
      onClick={() => navigate(`/product/${id}`)}
      sx={{
        cursor: "pointer",
        "&:hover > div:first-of-type": {
          opacity: 0.5,
        }
      }}
    >
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
        <PrimaryButton
          onClick={(e) => {
            e.stopPropagation();
            dispatch(add(item));
          }}
          sx={{
            gap: "5px",
            p: "8px 12px",
            mt: "5px",
          }}
        >
          <Add />
          Add to cart
        </PrimaryButton>
      </Box>
    </Box>
  )
}

export default Product;
