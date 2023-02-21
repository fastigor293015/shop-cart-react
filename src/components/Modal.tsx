import { Box, useTheme } from "@mui/material";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface IModalProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal = ({ isOpened, setIsOpened, children }: IModalProps) => {
  const { palette } = useTheme();

  const node = document.getElementById("modal-root")!;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpened && <Box
        component={motion.div}
        key="modal"
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
          width="650px"
          // height="600px"
          borderRadius="15px"
          bgcolor={palette.background.default}
          boxShadow="0px 0px 20px 7px rgba(34, 60, 80, 0.2)"
          overflow="hidden"
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
          exit={{ opacity: 0, scale: 0 }}
        >
          {children}
        </Box>
      </Box>}
    </AnimatePresence>,
    node
  )
}

export default Modal;
