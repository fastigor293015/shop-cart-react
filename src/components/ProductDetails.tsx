import { ArrowBack, Add } from "@mui/icons-material";
import { Box, Accordion, AccordionSummary, AccordionDetails, Rating, Typography, useMediaQuery, useTheme, Divider } from "@mui/material";
import { useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { add } from "../features/cart/cartSlice";
import PrimaryButton from "./PrimaryButton";

const thumbnailsList = [
  1, 2, 3, 4
];
const defaultColors = [
  "black",
  "white",
  "gray",
];
const defaultSummaryValues = [
  "Features",
  "Care",
  "Shipping",
  "Returns",
];

const ProductDetails = () => {
  const [thumbnail, setThumbnail] = useState(0);
  const [color, setColor] = useState(defaultColors[0])
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null);
  const { palette } = useTheme();

  const { productId } = useParams();
  const navigate = useNavigate();

  const productsList = useAppSelector(state => state.products.list);
  const cartList = useAppSelector(state => state.cart.list);
  const dispatch = useAppDispatch();
  const product = productsList.find(item => item.id.toString() === productId);
  const productAmount = cartList.find(item => item.id.toString() === productId)?.count || "";

  const isNonTabletScreen = useMediaQuery("(min-width:900px)");
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");

  return (
    <Box>

      <PrimaryButton
        sx={{
          gap: "5px",
          mb: "30px",
          p: "8px 15px",
          fontSize: "16px",
        }}
        onClick={() => navigate("/products")}
      >
        <ArrowBack sx={{ fontSize: "24px" }} />
        Back
      </PrimaryButton>
      <Box display="grid" gridTemplateColumns={isNonTabletScreen ? "repeat(2,1fr)" : "repeat(1,1fr)"} columnGap="30px" rowGap="20px">

        <Box>
          <Box
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={isNonMobileScreen ? "450px" : "300px"}
            mb="20px"
            p="20px"
            borderRadius="5px"
            bgcolor="rgb(241 245 249)"
          >
            <img src={product?.image} alt="Фото товара" />
          </Box>
          <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="20px">
            {thumbnailsList.map((item, i) => (
              <Box
                key={`${i}`}
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="120px"
                p="20px"
                border={thumbnail === i ? "3px solid rgb(67 56 202)" : undefined}
                borderRadius="5px"
                bgcolor="rgb(241 245 249)"
                onClick={() => setThumbnail(i)}
                sx={{
                  cursor: "pointer",
                  transitionProperty: "border, opacity",
                  transitionDuration: ".1s",
                  transitionTimingFunction: "ease-in-out",
                  "&:hover": {
                    opacity: 0.5,
                  }
                }}
              >
              </Box>
            ))}
          </Box>
        </Box>

        <Box gridRow="2 span">
          <Typography variant="h3" mb="10px" fontWeight="700">
            {product?.title}
          </Typography>
          <Typography variant="h4" mb="10px">
            {`$${product?.price.toLocaleString("en-US")}`}
          </Typography>
          <Rating
            value={product?.rating.rate}
            readOnly
            sx={{
              display: "flex",
              mb: "15px",
              // "& span": {
              //   color: palette.primary.dark
              // }
            }}
          />

          <Typography mb="15px">
            {product?.description}
          </Typography>

          <Box mb="35px">
            <Typography variant="h6" mb="5px">
              Color
            </Typography>
            <Box display="flex" gap="15px">
              {defaultColors.map((item, i) => (
                <Box
                key={`${i}`}
                  position="relative"
                  width="30px"
                  height="30px"
                  border="1px solid gray"
                  borderRadius="50%"
                  bgcolor={item}
                  onClick={() => setColor(item)}
                  sx={{
                    cursor: "pointer",
                    "&::before": {
                      content: `""`,
                      position: "absolute",
                      inset: "-5px",
                      border: `2px solid ${color === item ? palette.text.primary : "transparent"}`,
                      borderRadius: "50%",
                      transition: "border .2s ease-in-out",
                    }
                  }}
                ></Box>
              ))}
            </Box>
          </Box>

          <PrimaryButton
            onClick={() => product ? dispatch(add(product)) : undefined}
            sx={{
              gap: "5px",
              mb: "30px",
              pl: "50px",
              pr: "50px",
            }}
          >
            <Add />
            Add to cart{productAmount === "" ? "" : ` (${productAmount})`}
          </PrimaryButton>

          {defaultSummaryValues.map((item, i) => (
            <Fragment key={i}>
              <Divider />
              <Accordion
                expanded={expandedAccordion === i ? true : false}
                onChange={() => setExpandedAccordion(state => state === i ? null : i)}
                disableGutters
                sx={{
                  "&": {
                    bgcolor: "transparent",
                    backgroundImage: "none",
                    boxShadow: "none",
                  },
                  "&::before": {
                    content: "none",
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <Box className="accordion-icon" position="relative" width="13px" height="2px" borderRadius="2px" bgcolor={palette.text.primary} sx={{ opacity: .5 }}>
                      <Box position="absolute" borderRadius="2px" bgcolor={palette.text.primary} sx={{ inset: 0, transform: "rotate(-90deg)", transition: "transform .2s ease-in-out" }}></Box>
                    </Box>
                  }
                  sx={{
                    "&": {
                      height: "60px",
                      p: "0 5px",
                      fontWeight: "500",
                    },
                    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded, .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                      transform: "none",
                    },
                    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded .accordion-icon > div, .MuiAccordionSummary-expandIconWrapper.Mui-expanded .accordion-icon > div": {
                      transform: "none",
                    }
                  }}
                >
                  {item}
                </AccordionSummary>
                <AccordionDetails>
                  <ul style={{
                    margin: 0,
                    padding: "0 0 0 15px",
                  }}>
                    <li>Multiple strap configurations</li>
                    <li>Spacious interior with top zip</li>
                    <li>Leather handle and tabs</li>
                    <li>Interior dividers</li>
                    <li>Stainless strap loops</li>
                    <li>Double stitched construction</li>
                    <li>Water-resistant</li>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetails;
