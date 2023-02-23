import { DarkMode, LightMode, Search } from "@mui/icons-material";
import { Box, IconButton, InputBase, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setMode } from "../features/theme/themeSlice";
import Cart from "./Cart";
import { motion } from "framer-motion";

interface IHeaderProps {
  scrollValue: number;
}

const Header = ({ scrollValue }: IHeaderProps) => {
  const [searchValue, setSearchValue] = useState('');
  const { palette } = useTheme();
  const dispatch = useAppDispatch();
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");

  return (
    <Box
      component={motion.div}
      position="fixed"
      top="0"
      right="0"
      left="0"
      zIndex="5"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="60px"
      p="15px"
      boxShadow="0px 8px 8px 0px rgba(34, 60, 80, 0.2)"
      sx={{
        backdropFilter: `blur(${scrollValue >= 80 ? "15px" : 0})`,
        transition: "backdrop-filter .2s ease-in-out",
        "&::before": {
          content: `""`,
          position: "absolute",
          inset: 0,
          zIndex: -1,
          bgcolor: palette.background.default,
          opacity: scrollValue >= 80 ? .65 : 1,
          transition: "opacity .2s ease-in-out",
        }
      }}
    >
      <Typography variant="h2">
        Shop
      </Typography>

      <Box display="flex" alignItems="center" gap="15px">
        {isNonMobileScreen && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="5px"
            p="2px 20px"
            borderRadius="15px"
            bgcolor="rgb(226 232 240)"
          >
            <InputBase placeholder="Search..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            sx={{
              color: "rgb(71 85 105)",
            }} />
            <IconButton>
              <Search sx={{ fontSize: "25px", color: "rgb(71 85 105)" }} />
            </IconButton>
          </Box>
        )}
        <IconButton onClick={() => dispatch(setMode())}>
          {
          palette.mode === "light"
            ? <LightMode sx={{ fontSize: "25px", color: palette.text.primary }} />
            : <DarkMode sx={{ fontSize: "25px" }} />
          }
        </IconButton>
        <Cart />
      </Box>
    </Box>
  )
}

export default Header;
