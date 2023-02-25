import { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { motion, AnimatePresence, wrap } from "framer-motion";

interface ISliderProps {
  height: number | string;
  imagesList: string[];
}

const slideVariants = {
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

const Slider = ({ height, imagesList }: ISliderProps) => {
  const [[slide, direction], setSlide] = useState([0, 0]);
  const { palette } = useTheme();

  const imageIndex = wrap(0, imagesList.length, slide);

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
        height={height}
        borderRadius="15px"
        bgcolor="rgb(226 232 240)"
        boxShadow="0px 0px 20px 7px rgba(34, 60, 80, 0.2)"
        overflow="hidden"
        component={motion.div}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: .2,
        }}
      >
        {/* Slide */}
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
            variants={slideVariants}
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


      {/* Navigation buttons */}
      <Box
        position="absolute"
        top="50%"
        right="0"
        left="0"
        p="0 20px"
        zIndex={1}
        display="flex"
        justifyContent="space-between"
        overflow="hidden"
        sx={{
          transform: "translateY(-50%)",
          pointerEvents: "none",
          "& > *": {
            pointerEvents: "all",
          }
        }}
      >
        <motion.div
          initial={{ x: -60 }}
          animate={{ x: 0 }}
          transition={{ delay: .5 }}
        >
          <IconButton
            onClick={() => paginate(-1)}
            sx={{
              color: "#000",
              bgcolor: "#FFF",
            }}
          >
            <ArrowBack sx={{ fontSize: "25px",  }} />
          </IconButton>
        </motion.div>

        <motion.div
          initial={{ x: 60 }}
          animate={{ x: 0 }}
          transition={{ delay: .5 }}
        >
          <IconButton
            onClick={() => paginate(1)}
            sx={{
              color: "#000",
              bgcolor: "#FFF",
            }}
          >
            <ArrowForward sx={{ fontSize: "25px" }} />
          </IconButton>
        </motion.div>
      </Box>

      {/* Pagination */}
      <AnimatePresence>
        <Box
          position="absolute"
          bottom="-35px"
          left="50%"
          right="0"
          width="15px"
          height="15px"
          zIndex={1}
          sx={{
            transform: "translateX(-50%)",
          }}
        >
          {imagesList.map((item, i) => (i + 2 >= imageIndex) && (i - 2 <= imageIndex) ? (
            <Box
              key={`${i}`}
              position="absolute"
              border={`2px solid ${palette.text.primary}`}
              borderRadius="50%"
              sx={{
                inset: 0,
                cursor: "pointer",
              }}
              onClick={() => setSlide([i, i > imageIndex ? 1 : -1])}
              component={motion.div}
              initial={{
                scale: 0,
                x: 10 * (i - imageIndex),
                backgroundColor: palette.background.default,
              }}
              animate={{
                scale: (Math.abs(imageIndex - i) === 1) ? .70 : (Math.abs(imageIndex - i) === 2) ? .4 : 1,
                x: 20 * (i - imageIndex),
                backgroundColor: i === imageIndex ? palette.text.primary : palette.background.default,
              }}
              exit={{
                scale: 0,
              }}
              transition={{
                delay: .1,
              }}
            />
          ) : '')}
        </Box>
      </AnimatePresence>
    </Box>
  )
}

export default Slider;
