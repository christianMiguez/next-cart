import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductList } from "../../components/products/ProductList";
import FullScreenLoader from "../../components/ui/FullScreenLoader";
import { useProducts } from "../../hooks";

const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=men");

  return (
    <ShopLayout
      title="X Store - Hombres"
      pageDescription="Los mejores articulos para ellos"
    >
      <Typography variant="h1" component="h1">
        Hombres
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para ellos
      </Typography>

      {isLoading ? <FullScreenLoader /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
