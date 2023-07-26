import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductList } from "../../components/products/ProductList";
import FullScreenLoader from "../../components/ui/FullScreenLoader";
import { useProducts } from "../../hooks";

const KidPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=kid");

  return (
    <ShopLayout
      title="X Store - Kids"
      pageDescription="Los mejores articulos para niños"
    >
      <Typography variant="h1" component="h1">
        Niños
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para niños
      </Typography>

      {isLoading ? <FullScreenLoader /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
