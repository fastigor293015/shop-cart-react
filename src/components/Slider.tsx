import { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { motion, AnimatePresence, wrap } from "framer-motion";

interface ISliderProps {
  imagesList: string[];
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  }
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
}

const Slider = ({ imagesList }: ISliderProps) => {
  const [[slide, direction], setSlide] = useState([0, 0]);
  const { palette } = useTheme();

  const imageIndex = wrap(0, imagesList.length, slide);

  console.log(imageIndex)

  const paginate = (newDirection: number) => {
    setSlide([slide + newDirection, newDirection]);
  }

  return (
    // Container
    <Box
      position="relative"
      mb="50px"
    >
      {/* Wrapper */}
      <Box
        position="relative"
        height="500px"
        borderRadius="15px"
        bgcolor="rgb(226 232 240)"
        boxShadow="0px 0px 20px 7px rgba(34, 60, 80, 0.2)"
        overflow="hidden"
      >
        <AnimatePresence
          initial={false}
          custom={direction}
        >
          <Box
            key={slide}
            position="absolute"
            display="flex"
            justifyContent="center"
            alignItems="center"
            p="25px"
            bgcolor="rgb(239, 242, 19)"
            component={motion.div}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: .2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            // dragSnapToOrigin
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
              console.log({ offset: offset.x, velocity: velocity.x });
            }}
            sx={{
              inset: "0",
            }}
          >
            <img
              src={imagesList[imageIndex]}
              alt=""
              style={{
                pointerEvents: "none",
              }}
            />
          </Box>
        </AnimatePresence>
      </Box>

      <IconButton
        onClick={() => paginate(-1)}
        sx={{
          position: "absolute",
          top: "50%",
          zIndex: 1,
          left: 20,
          bgcolor: "#FFF",
          transform: "translateY(-50%)",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, .5)"
          }
        }}
      >
        <ArrowBack sx={{ fontSize: "25px", color: "#000" }} />
      </IconButton>

      <IconButton
        onClick={() => paginate(1)}
        sx={{
          position: "absolute",
          top: "50%",
          zIndex: 1,
          right: 20,
          bgcolor: "#FFF",
          transform: "translateY(-50%)",
        }}
      >
        <ArrowForward sx={{ fontSize: "25px", color: "#000" }} />
      </IconButton>

      {/* Pagination */}
      <Box
        position="absolute"
        bottom="-35px"
        left="50%"
        zIndex={1}
        display="flex"
        gap="5px"
        sx={{
          transform: "translateX(-50%)",
        }}
      >
        {imagesList.map((item, i) => (i + 2 >= imageIndex) && (i - 2 <= imageIndex) ? (
          <Box
            key={`${i}`}
            width="15px"
            height="15px"
            border={`2px solid ${palette.text.primary}`}
            borderRadius="50%"
            bgcolor={i === imageIndex ? palette.text.primary : "transparent"}
            sx={{
              transform: `scale(${(Math.abs(imageIndex - i) === 1) ? .66 : (Math.abs(imageIndex - i) === 2) ? .33 : 1 })`,
              cursor: "pointer",
            }}
            onClick={() => setSlide([i, 1])}
          />
        ) : '')}
      </Box>
    </Box>
  )
}

export default Slider;
