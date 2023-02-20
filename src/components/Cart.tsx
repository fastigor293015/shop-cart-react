import { Close, ShoppingCart } from "@mui/icons-material";
import { useTheme, IconButton, Box, Badge, Typography, Divider, useMediaQuery, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { Fragment, useState } from "react";
import { useAppSelector } from "../app/hooks";
import CartItem from "./CartItem";
import PrimaryButton from "./PrimaryButton";
import { motion, AnimatePresence } from "framer-motion";
import SlidingPanel from "./SlidingPanel";
import Modal from "./Modal";

import headphonesimg from "../assets/headphones.png";

const Cart = () => {
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const { palette } = useTheme();
  const { list, count, summary } = useAppSelector(state => state.cart);
  const isNonMobileScreen = useMediaQuery("(min-width:500px)");

  return (
    <Box>
      <IconButton onClick={() => setIsCartOpened(!isCartOpened)}>
        <Badge badgeContent={count} color="primary">
          <ShoppingCart sx={{ fontSize: "25px", color: palette.text.primary }} />
        </Badge>
      </IconButton>

      <SlidingPanel isOpened={isCartOpened} setIsOpened={setIsCartOpened}>
        <Box display="flex" flexDirection="column" height="100%">
          <Box display="flex" justifyContent="space-between" alignItems="center" p="24px">
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

          <Box mb="5px" p="24px">
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
        <Box display="flex">
          <Box
            position="relative"
            width="270px"
            sx={{
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
              }
            }}
          >
            <img src={headphonesimg} style={{ maxWidth: "85%", transform: "translateX(10px)" }} />
          </Box>
          <form style={{ padding: "40px 30px" }}>
            <Typography variant="h3" fontWeight="500" mb="15px">
              Your payment details
            </Typography>
            <TextField fullWidth label="NAME" variant="standard" sx={{ mb: "10px" }} />
            <TextField fullWidth label="CARD NUMBER" variant="standard" sx={{ mb: "10px" }} />
            <Box display="flex" gap="15px" sx={{ mb: "10px" }}>
              <TextField fullWidth label="MM" variant="standard" />
              <TextField fullWidth label="YY" variant="standard" />
              <TextField fullWidth label="CVC" variant="standard" />
            </Box>
            <Box mb="15px">
              <FormControlLabel control={<Checkbox defaultChecked />} label="Save my card for future purchases" />
            </Box>
            <PrimaryButton>Pay now</PrimaryButton>
          </form>
        </Box>
      </Modal>
    </Box>
  )
}

export default Cart;
