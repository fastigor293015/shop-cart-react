import { Box, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { add, ICartProduct, remove } from "../features/cart/cartSlice";
import { useAppDispatch } from "../app/hooks";

interface ICartItemProps {
  item: ICartProduct;
}

const CartItem = ({ item }: ICartItemProps) => {
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
        <Typography>
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
