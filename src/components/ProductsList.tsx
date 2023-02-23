import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productsSlice";
import ProductSkeleton from "../skeleton/ProductSkeleton";
import Product from "./Product";
import { motion } from "framer-motion";

const ProductsList = () => {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.products);
  const isDesktopScreen = useMediaQuery("(min-width:1200px)");
  const isNonTabletScreen = useMediaQuery("(min-width:1000px)");
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    console.log(list);
    if (!list || list.length === 0) dispatch(fetchProducts());
  }, []);

  return (
    <>
      <Typography variant={isNonMobileScreen ? "h2" : "h3"} fontWeight="700" mb="30px">
        Trending products
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={
          isDesktopScreen ? "repeat(4, 1fr)"
          : isNonTabletScreen ? "repeat(3, 1fr)"
          : isNonMobileScreen ? "repeat(2, 1fr)"
          : "repeat(1, 1fr)"}
        // gridAutoRows="300px"
        gap={isDesktopScreen ? "30px" : "15px"}
        sx={{
          "& > *": {
            gridColumn: "1 span",
          },
        }}
      >
        {
          loading
            ? <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
            : list.map(item => (
              <Box key={item.id} component={motion.div} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: .2 }}>
                <Product item={item} />
              </Box>
            ))
        }
      </Box>
    </>
  )
}

export default ProductsList;
