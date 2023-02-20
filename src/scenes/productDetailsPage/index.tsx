import { motion } from "framer-motion";
import Container from "../../components/Container";
import Header from "../../components/Header";
import ProductDetails from "../../components/ProductDetails";

const ProductDetailsPage = () => {
  return (
    <motion.div animate={{ x: 0, opacity: 1 }} initial={{ x: "50%", opacity: 0 }} exit={{ x: "50%", opacity: 0 }} transition={{ type: "keyframes" }}>
      {/* <Header /> */}
      <Container>
        <ProductDetails />
      </Container>
    </motion.div>
  )
}

export default ProductDetailsPage;
