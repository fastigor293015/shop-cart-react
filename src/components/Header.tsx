import { DarkMode, LightMode, Search } from "@mui/icons-material";
import { Box, Checkbox, FormControl, IconButton, InputBase, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setMode } from "../features/theme/themeSlice";
import Cart from "./Cart";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const Header = () => {
  const [filter, setFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const { palette } = useTheme();
  const dispatch = useAppDispatch();
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");

  return (
    <Box
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
      bgcolor={palette.background.default}
      boxShadow="0px 8px 8px 0px rgba(34, 60, 80, 0.2)"
    >
      <Typography variant="h2">
        Shop
      </Typography>
      {/* <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
        <InputLabel id="demo-mutiple-checkbox-label">Filters</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          // multiple
          label="Filters"
          input={<OutlinedInput label="Filters" />}
          renderValue={(selected: string[]) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} onClick={() => setFilter(name)}>
              <Checkbox checked={filter.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <Box display="flex" alignItems="center" gap="15px">
        {isNonMobileScreen && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="5px"
            p="2px
            20px"
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
