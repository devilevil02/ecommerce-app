import React, { useState, useEffect, ReactNode } from "react";
import { useParams } from "react-router-dom";

import Each from "./components/utils/Each";
import useCartContext from "./hooks/useCartContext";
import api from "./_utils/api";

import { IProduct, Rating } from "./_types";

/**
 * The Rating Component, which shows the rating of a product
 * or review with stars.
 */
const RatingComp = ({ rating }: { rating: Rating }) => {
  return (
    <span
      className="rating-comp text-2xl"
      style={{ "--rating": `${(rating / 5) * 100}%` } as React.CSSProperties}
    >
      {Array.from({ length: 5 }).map(() => "★")}
    </span>
  );
};

const ProductPage = (): ReactNode => {
  const { id: product_id } = useParams();

  const [product, setProduct] = useState<IProduct>();
  const [prevImg, setPrevImg] = useState<string>();
  const [quantity, setQuantity] = useState<number>(1);

  const { addItemToCart } = useCartContext();

  // we have to fetch the product
  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/product/${product_id}`);
      setProduct(data as IProduct);
      setPrevImg((data as IProduct).images[0]);
    })();
  }, [product_id]);

  return product ? (
    <>
      <div className="product relative flex flex-col lg:flex-row items-start">
        <h1 className="lg:hidden mb-2 text-2xl font-semibold tracking-wide">
          {product.name}
        </h1>
        <div
          id="prod-img"
          style={{ height: "-webkit-" }}
          className="lg:sticky top-32 mt-2 mb-10 lg:mb-auto w-full"
        >
          <div id="preview" className="flex lg:h-[500px] justify-center">
            <img src={`/images/${product.id}/${prevImg}`} alt={product.name} />
          </div>
          <div id="other-images" className="mx-10 mt-12">
            <ul className="flex list-none gap-4">
              <Each
                of={product.images}
                render={(src, index) => (
                  <li className="group border-transparent hover:border-cyan-400">
                    <img
                      key={index}
                      src={`/images/${product.id}/${src}`}
                      width="70px"
                      alt={product.name}
                      onMouseEnter={() => setPrevImg(src)}
                    />
                  </li>
                )}
              />
            </ul>
          </div>
        </div>
        <div id="prod-content" className="box-border w-full">
          <h1 className="mb-2 hidden lg:visible text-3xl font-semibold tracking-wide">
            {product.name}
          </h1>
          <span>
            <span className="mr-4">{product.rating.toFixed(1)}/5</span>
            <RatingComp rating={product.rating} />
          </span>
          <hr className="my-2 border-black" />
          <div>
            <p className="prod-price text-sm font-semibold tracking-wider text-slate-600">
              <span className="mr-4 text-3xl font-bold text-emerald-500">
                $
                {(
                  product.price -
                  (product.price * product.discount) / 100
                ).toFixed(2)}
              </span>
              <span className="mr-4 text-slate-400 line-through">
                ${product.price.toFixed(2)}
              </span>
              ({product.discount}% discount)
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addItemToCart(product, quantity);
              }}
              className="my-4 flex items-center justify-between"
            >
              <div className="input-grp font-semibold">
                <label htmlFor="prodQuantity">Quantity: </label>
                <select
                  name="prodQuantity"
                  onChange={(e) => {
                    setQuantity(parseInt(e.currentTarget.value));
                  }}
                  className="ml-4 w-14 border border-transparent border-b-black outline-none hover:border-black focus:border-black"
                >
                  <option defaultChecked value="1">
                    1
                  </option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <button
                type="submit"
                className="border border-black px-8 py-1 text-lg lg:text-2xl font-semibold duration-200 hover:bg-neutral-800 hover:text-neutral-200"
              >
                Add to Cart
              </button>
            </form>
            <h3 className="mb-4 mt-10 text-xl font-semibold">Details</h3>
            <table className="border-spacing-12">
              <tbody>
                {Object.keys(product.otherDetails).map((key, i) => (
                  <tr key={i}>
                    <td className="min-w-40 font-semibold">{key}</td>
                    <td className="text-neutral-600">
                      {product.otherDetails[key] as string}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="my-4 mt-10 text-xl font-semibold">
              About this product
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis,
              culpa aut! Ratione magnam iste aspernatur, officia unde
              perspiciatis non. Quam, quo inventore voluptates fuga veniam
              consequuntur natus odit odio. Vero. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Aliquam, aut consequatur quisquam
              blanditiis a obcaecati facilis debitis officiis eos. Corporis quae
              sint quisquam laborum molestias? Optio, repellat ab repellendus
              modi ipsam impedit alias molestias iusto quam illum quisquam sunt
              corrupti harum maiores. Vero, inventore voluptatibus quo dolorem
              adipisci officiis? Recusandae a distinctio, excepturi, fuga
              pariatur voluptatum, laboriosam ipsam iure qui officiis id!
              Officiis earum officia modi dicta possimus quos facere voluptas
              explicabo eaque ut debitis libero repellat aperiam dolores magni,
              et fugiat exercitationem culpa necessitatibus voluptates
              voluptatibus vitae tenetur. Perferendis, laborum! Doloribus,
              maiores illo? Aliquam neque vero omnis nobis doloremque.
            </p>
          </div>
        </div>
      </div>
      <div id="prodReviews" className="mt-20 max-w-[1000px]">
        <h2 className="text-2xl text-neutral-800 underline">
          Reviews of Other Customers
        </h2>
        <Each
          of={product.reviews}
          render={(item) => (
            <article
              className="prodReview my-8 rounded-md border border-neutral-500 px-12 py-4"
              key={item.id}
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <RatingComp rating={item.rating} />
              <p className="text-sm text-neutral-600">
                {item.body.slice(0, 200)}...
                <a
                  href="/#"
                  className="font-semibold text-neutral-700 hover:underline"
                >
                  Read More
                </a>
              </p>
            </article>
          )}
        />
      </div>
    </>
  ) : (
    <></>
  );
};

export default ProductPage;
