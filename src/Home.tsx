import { Suspense } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Each from "./components/utils/Each";
import ProductList from "./components/ui/ProductList";

const LoadingProductPreview = () => (
  <div className="rounded-md bg-neutral-300 animate-pulse h-[420px] w-[310px]"></div>
);

const ECommerceHome = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="lg:mx-12 mx-4 flex flex-wrap justify-center lg:justify-between gap-12">
        <Suspense
          fallback={
            <Each
              of={Array(9).fill(0)}
              render={(_, index) => <LoadingProductPreview key={index} />}
            />
          }
        >
          <ProductList />
        </Suspense>
      </div>
    </QueryClientProvider>
  );
};

export default ECommerceHome;
