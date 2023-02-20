import { motion } from "framer-motion";
import Container from "../../components/Container";
import Header from "../../components/Header";
import ProductsList from "../../components/ProductsList";

const ProductsPage = () => {
  return (
    <motion.div animate={{ x: 0, opacity: 1 }} initial={{ x: "50%", opacity: 0 }} exit={{ x: "50%", opacity: 0 }} transition={{ type: "keyframes" }}>
      {/* <Header /> */}
      <Container>
        <ProductsList />
      </Container>
    </motion.div>
  )
}

export default ProductsPage;
