import { useQuery } from "@tanstack/react-query";

import ProductPreview from "./ProductPreivew";
import Each from "../utils/Each";
import api from "../../_utils/api";
import { IProductPreview } from "../../_types";

const fetchProdPreview = async (): Promise<IProductPreview[]> => {
  try {
    const { data } = await api.get("/product_preview");
    return data as IProductPreview[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const ProductList = () => {
  const { data: products } = useQuery({
    queryKey: ["product_preview"],
    queryFn: fetchProdPreview,
    // @ts-ignore
    suspense: true,
  });

  return (
    <Each
      of={products || []}
      render={(product) => <ProductPreview product={product} />}
    />
  );
};

export default ProductList;
