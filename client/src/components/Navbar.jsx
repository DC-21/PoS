import { Link } from "react-router-dom";
import logo from "../images/mulonga.png";
const Navbar = () => {
  return (
    <div className="w-full sticky top-0 flex justify-center">
      <div className="px-4 gap-[50px] py-2 bg-[#260c65] w-full flex items-center justify-between">
        <Link to="/">
          <img
            className="md:w-[200px] md:h-[80px] rounded"
            src={logo}
            alt="logo"
          />
        </Link>
        <div className="flex gap-6">
          <Link to="/transactions">
            <p className="text-lg bg-[#fe8267] hover:bg-[#ee3d16] py-2 px-2 rounded text-white">
              Transactions
            </p>
          </Link>
          <Link to="/">
            <p className="text-lg bg-[#fe8267] hover:bg-[#ee3d16] py-2 px-2 rounded text-white">
              Home
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
