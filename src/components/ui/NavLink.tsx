import { ReactNode } from "react";
import { Link } from "react-router-dom";

const NavLink = ({
  to,
  children,
  active,
}: {
  to: string;
  children: ReactNode;
  active?: boolean;
}): ReactNode => {
  return (
    <li className="mx-4 first:ml-0 inline-block last:mr-0">
      <Link
        className={`text-lg hover:text-blue-500 focus:text-blue-500 font-semibold ${active ? "text-blue-500" : "text-neutral-600"}`}
        to={to}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
