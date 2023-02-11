import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productsSlice";
import ProductSkeleton from "../skeleton/ProductSkeleton";
import Product from "./Product";

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
            : list.map(item => (<Product key={item.id} item={item} />))
        }
      </Box>
    </>
  )
}

export default ProductsList;
