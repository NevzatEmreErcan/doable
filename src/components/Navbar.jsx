import { NavLink, Link } from "react-router-dom";
import { FaCircleNotch } from "react-icons/fa6";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-primary-700 hover:bg-gray-900 rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 rounded-md px-3 py-2";

  return (
    <>
      <nav className="bg-primary-500 border-b border-secondary-500 text-white">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-center md:justify-between gap-x-8">
            <Link to="/">
              <div className="flex items-center">
                <FaCircleNotch className="text-3xl rotate-45 mr-2" />
                <div className="border-l-2 border-white w-0 h-7"></div>
                <div className="text-4xl ml-3 font-bold">Doable</div>
              </div>
            </Link>
            <div className="text-xl space-x-5">
              {/* <NavLink to="/" className={linkClass}>
                Tasks
              </NavLink>
              <NavLink to="/journal" className={linkClass}>
                Journal
              </NavLink> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
