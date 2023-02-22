import { Close, ShoppingCart } from "@mui/icons-material";
import { useTheme, IconButton, Box, Badge, Typography, Divider, useMediaQuery } from "@mui/material";
import { Fragment, useState } from "react";
import { useAppSelector } from "../app/hooks";
import CartItem from "./CartItem";
import PrimaryButton from "./PrimaryButton";
import { motion } from "framer-motion";
import SlidingPanel from "./SlidingPanel";
import Modal from "./Modal";

import headphonesImg from "../assets/headphones.png";
import PaymentForm from "./PaymentForm";

const Cart = () => {
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const { palette } = useTheme();
  const { list, count, summary } = useAppSelector(state => state.cart);
  const isNonMobileScreen = useMediaQuery("(min-width:700px)");
  const isNonSmallHeightScreen = useMediaQuery("(min-height:400px)");

  return (
    <Box>
      <IconButton onClick={() => setIsCartOpened(!isCartOpened)}>
        <Badge badgeContent={count} color="primary">
          <ShoppingCart sx={{ fontSize: "25px", color: palette.text.primary }} />
        </Badge>
      </IconButton>

      <SlidingPanel isOpened={isCartOpened} setIsOpened={setIsCartOpened}>
        <Box display="flex" flexDirection="column" height="100%">
          <Box display="flex" justifyContent="space-between" alignItems="center" p={isNonSmallHeightScreen ? "24px" : "15px 20px"}>
            <Typography variant="h4" color={palette.text.primary} fontWeight="500">
              Cart
            </Typography>
            <IconButton onClick={() => setIsCartOpened(false)}>
              <Close sx={{ fontSize: "25px", color: palette.text.primary }} />
            </IconButton>
          </Box>

          <Divider />

          <Box flexGrow="1" p="24px" sx={{ overflowY: "auto" }}>
            {list.map((item, i) => (
              <Fragment key={item.id}>
                <CartItem item={item} setIsCartOpened={setIsCartOpened} />
                {i < (list.length - 1) && (
                  <Divider sx={{ m: "20px 0" }} />
                )}
              </Fragment>
            ))}
          </Box>

          <Divider />

          <Box mb="5px" p={isNonSmallHeightScreen ? "24px" : "16px"}>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight="700">
                Subtotal
              </Typography>
              <Typography>
              {`$${summary.toLocaleString("en-US")}`}
              </Typography>
            </Box>
            <Typography mb="15px">
              Shipping and taxes calculated at checkout.
            </Typography>
            <PrimaryButton
              fullWidth
              disabled={parseInt(summary.toLocaleString("en-US")) <= 0 ? true : undefined}
              onClick={() => setIsFormOpened(true)}
              sx={{
                pt: "8px",
                pb: "8px",
              }}
            >
              Checkout
            </PrimaryButton>
          </Box>
        </Box>
      </SlidingPanel>

      <Modal isOpened={isFormOpened} setIsOpened={setIsFormOpened}>
        <Box position="relative" display="flex" justifyContent="center" width={isNonMobileScreen ? "650px" : "calc(100vw - 10px * 2)"} height={isNonSmallHeightScreen ? undefined : "calc(100vh - 10px * 2)"}>
          <IconButton
            sx={{
              position: "absolute",
              inset: isNonMobileScreen ? "15px 15px auto auto" : "10px 10px auto auto",
            }}
            onClick={() => setIsFormOpened(false)}
          >
            <Close />
          </IconButton>
          <Box
            position={isNonMobileScreen ? "relative" : "absolute"}
            zIndex={-1}
            width="270px"
            overflow="hidden"
            component={motion.div}
            animate={{ x: 0 }}
            initial={{ x: -100 }}
            exit={{ x: -100 }}
            transition={{ delay: .2 }}
            sx={{
              inset: isNonMobileScreen ? undefined : "0 auto 0 0",
              opacity: isNonMobileScreen ? 1 : .3,
              "&::before": {
                content: `""`,
                position: "absolute",
                top: 0,
                right: 0,
                height: "200%",
                width: "200%",
                borderRadius: "50%",
                bgcolor: "#fbcf34",
                transform: "translateY(-25%)",
              },
            }}
          >
            <img src={headphonesImg} style={{ maxWidth: "85%", transform: "translateX(10px)" }} />
          </Box>

          <Box padding={isNonMobileScreen ? "40px 30px" : "30px 20px"} overflow="auto" component={motion.div} animate={{ x: 0 }} initial={{ x: 100 }} exit={{ x: 100 }} transition={{ delay: .2 }}>
            <PaymentForm setIsOpened={setIsFormOpened} />
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default Cart;
