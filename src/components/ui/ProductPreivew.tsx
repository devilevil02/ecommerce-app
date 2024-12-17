import { Link } from "react-router-dom";

import { IProductPreview } from "../../_types";

const ProductPreview = ({ product }: { product: IProductPreview }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div
        // onClick={() => navigate(`/product/${product.id}`)}
        className="w-min border cursor-pointer rounded-md p-2 shadow-lg shadow-slate-300 transition-all"
      >
        <div className="prev-img mb-4 h-[300px] w-[300px] overflow-hidden border-b">
          <img
            src={`/images/${product.id}/${product.image}`}
            className="h-full w-full object-contain"
            alt=""
          />
        </div>
        <h2
          className="max-h-[3.4rem] overflow-y-hidden font-semibold text-lg"
          title={product.name}
        >
          {product.name}
        </h2>
        <hr className="mb-2 border-neutral-600" />
        <p>
          <span className="text-2xl font-semibold">
            $
            {(product.price - (product.price * product.discount) / 100).toFixed(
              2
            )}
          </span>
          <span className="mx-3 ml-2 line-through">${product.price}</span>(
          {product.discount}% off)
        </p>
      </div>
    </Link>
  );
};

export default ProductPreview;