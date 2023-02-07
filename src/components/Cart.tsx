import { Close, ShoppingCart } from "@mui/icons-material";
import { useTheme, IconButton, Box, Badge, Typography, Divider, useMediaQuery } from "@mui/material";
import { Fragment, useState } from "react";
import { useAppSelector } from "../app/hooks";
import CartItem from "./CartItem";

const Cart = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { palette } = useTheme();
  const { list, count } = useAppSelector(state => state.cart);
  const isNonMobileScreen = useMediaQuery("(min-width:500px)");

  return (
    <Box>
      <IconButton onClick={() => setIsOpened(!isOpened)}>
        <Badge badgeContent={count} color="primary">
          <ShoppingCart sx={{ fontSize: "25px", color: palette.text.primary }} />
        </Badge>
      </IconButton>
      {isOpened && (<Box
        position="fixed"
        zIndex="20"
        onClick={() => setIsOpened(false)}
        sx={{
          inset: 0,
          bgcolor: palette.text.primary,
          opacity: isOpened ? 0.8 : 0,
          pointerEvents: isOpened ? "all" : "none",
          transition: "opacity .3s ease-in-out",
        }}
      />)}
      <Box
          position="fixed"
          top="0"
          right="0"
          bottom="0"
          zIndex="20"
          width={isNonMobileScreen ? "430px" : "100%"}
          bgcolor={palette.background.default}
          boxShadow="-7px 4px 8px 0px rgba(34, 60, 80, 0.2)"
          sx={{
            overflowY: "auto",
            opacity: isOpened ? 1 : 0,
            transform: `translateX(${isOpened ? 0 : 100}%)`,
            transitionProperty: "transform, opacity",
            transitionDuration: ".3s",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" p="24px">
            <Typography variant="h4" color={palette.text.primary}>
              Cart
            </Typography>
            <IconButton onClick={() => setIsOpened(false)}>
              <Close sx={{ fontSize: "25px", color: palette.text.primary }} />
            </IconButton>
          </Box>
          <Divider />
          <Box p="24px">
            {list.map((item, i) => (
              <Fragment key={item.id}>
                <CartItem item={item} />
                {i < (list.length - 1) && (
                  <Divider sx={{ m: "20px 0" }} />
                )}
              </Fragment>
            ))}
          </Box>
        </Box>
    </Box>
  )
}

export default Cart;
