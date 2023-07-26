import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductList } from "../../components/products/ProductList";
import FullScreenLoader from "../../components/ui/FullScreenLoader";
import { useProducts } from "../../hooks";

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=women");

  return (
    <ShopLayout
      title="X Store - Mujeres"
      pageDescription="Los mejores articulos para ellas"
    >
      <Typography variant="h1" component="h1">
        Mujeres
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para ellas
      </Typography>

      {isLoading ? <FullScreenLoader /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
