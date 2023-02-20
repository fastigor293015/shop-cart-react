import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

interface ISlidingPanelProps {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const SlidingPanel = ({ setIsOpened, children }: ISlidingPanelProps) => {
  const { palette } = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:500px)");

  const node = document.getElementById("modal-root")!;

  return ReactDOM.createPortal(
    <>
      <Box
        component={motion.div}
        position="fixed"
        zIndex="20"
        sx={{
          inset: 0,
        }}
        animate={{ backgroundColor: "rgba(0, 0, 0, .6)" }}
        initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        onClick={e => {
          if (e.currentTarget === e.target) setIsOpened(false);
        }}>
          <Box
            component={motion.div}
            position="absolute"
            zIndex="20"
            top="0"
            bottom="0"
            right="0"
            width={isNonMobileScreen ? "430px" : "100%"}
            bgcolor={palette.background.default}
            animate={{ x: 0 }}
            initial={{ x: "100%" }}
            exit={{ transform: "100%" }}
          >
            {children}
          </Box>
        </Box>
    </>,
    node
  )
}

export default SlidingPanel;
