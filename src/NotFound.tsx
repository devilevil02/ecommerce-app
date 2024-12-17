import { ReactNode } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = (): ReactNode => {
  return (
    <section className="pt-40">
      <div>
        <h1 className="text-center font-bold text-[5rem] mb-10">
          <span className="font-thin border-r-2 border-r-neutral-800 pr-8 mr-8">
            404
          </span>{" "}
          Page Not Found
        </h1>
        <p className="text-lg text-center">
          <Link to="/" className="hover:text-blue-500 text-neutral-600 underline text-lg">
            Go to home
          </Link>
        </p>
      </div>
    </section>
  );
};

export default NotFoundPage;
