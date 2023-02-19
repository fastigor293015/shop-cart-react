import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { add, ICartProduct, remove } from "../features/cart/cartSlice";
import { useAppDispatch } from "../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";

interface ICartItemProps {
  item: ICartProduct;
  setIsCartOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartItem = ({ item, setIsCartOpened }: ICartItemProps) => {
  const {
    category,
    description,
    id,
    image,
    price,
    rating,
    title,
    count,
  } = item;

  const location = useLocation();
  const urlProductId = location.pathname.includes("/product/") ? location.pathname.split("/")[2] : undefined;
  console.log(urlProductId);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Box display="flex" alignItems="center" gap="20px">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexBasis="96px"
        minWidth="96px"
        height="96px"
        p="10px"
        borderRadius="5px"
        bgcolor="rgb(241 245 249)"
      >
        <img src={image} alt="Фото товара" />
      </Box>
      <Box>
        <Typography onClick={() => {
          if (urlProductId !== id.toString()) {
            navigate(`/product/${id}`);
            setIsCartOpened(false);
          }
        }}
          sx={urlProductId !== id.toString() ? {
            cursor: "pointer",
            transition: "color .2s ease-in-out",
            "&:hover": {
              color: "rgb(67 56 202)"
            }
          } : {}}
        >
          {title}
        </Typography>
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => dispatch(remove(item))}>
            <Remove />
          </IconButton>
          <Typography>
            {count}
          </Typography>
          <IconButton onClick={() => dispatch(add(item))}>
            <Add />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default CartItem;
