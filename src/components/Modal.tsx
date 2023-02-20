import { Box, useTheme } from "@mui/material";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

interface IModalProps {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal = ({ setIsOpened, children }: IModalProps) => {
  const { palette } = useTheme();

  const node = document.getElementById("modal-root")!;

  return ReactDOM.createPortal(
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
      }}
    >
      <Box
        component={motion.div}
        position="absolute"
        zIndex="20"
        top="50%"
        left="50%"
        width="700px"
        height="600px"
        bgcolor={palette.background.default}
        animate={{ scale: 1 }}
        initial={{ scale: .5, x: "-50%", y: "-50%" }}
        exit={{ scale: .5 }}
      >
        {children}
      </Box>
    </Box>,
    node
  )
}

export default Modal;
