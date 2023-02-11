import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Rating, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { add } from "../features/cart/cartSlice";

const ProductDetails = () => {
  const { palette } = useTheme();

  const { productId } = useParams();
  const navigate = useNavigate();

  const list = useAppSelector(state => state.products.list);
  const dispatch = useAppDispatch();
  const product = list.find(item => item.id.toString() === productId);

  const isNonTabletScreen = useMediaQuery("(min-width:900px)");
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    console.log(product);
  }, []);

  return (
    <Box>

      <Button
        sx={{
          gap: "5px",
          mb: "30px",
          p: "8px 10px",
          fontSize: "16px",
          bgcolor: "rgb(67 56 202)",
          fontWeight: 500,
          color: "#FFF",
          "&:hover": {
            color: "rgb(67 56 202)",
          }
        }}
        onClick={() => navigate("/products")}
      >
        <ArrowBack sx={{ fontSize: "24px" }} />
        Back
      </Button>
      <Box display="grid" gridTemplateColumns={isNonTabletScreen ? "repeat(2,1fr)" : "repeat(1,1fr)"} gap="30px">
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={isNonMobileScreen ? "450px" : "300px"}
          p="20px"
          borderRadius="5px"
          bgcolor="rgb(241 245 249)"
          sx={{
            transition: "opacity .2s ease-in-out",
          }}
        >
          <img src={product?.image} alt="Фото товара" />
        </Box>
        <Box>
          <Typography variant="h3" mb="10px" fontWeight="700">
            {product?.title}
          </Typography>
          <Typography variant="h4" mb="10px">
            {`$${product?.price.toLocaleString("en-US")}`}
          </Typography>
          <Rating
            value={product?.rating.rate}
            readOnly
            sx={{
              display: "flex",
              mb: "15px",
              // "& span": {
              //   color: palette.primary.dark
              // }
            }}
          />
          <Typography mb="15px">
            {product?.description}
          </Typography>
          <Button
            onClick={() => product ? dispatch(add(product)) : undefined}
            sx={{
              bgcolor: "rgb(67 56 202)",
              fontWeight: 500,
              color: "#FFF",
              "&:hover": {
                color: "rgb(67 56 202)",
              }
            }}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetails;
