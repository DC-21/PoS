import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="w-full mt-4 sticky top-0 flex justify-center">
      <div className="px-4 py-2 bg-[#260c65] w-full flex items-center justify-between">
        <button
          onClick={handleLogout}
          className="text-lg bg-[#fe8267] hover:bg-[#ee3d16] py-2 px-2 rounded text-white"
        >
          Log Out
        </button>
        <p
          className="text-lg hover:bg-slate-200 py-2 px-2 rounded text-white"
        >
         Mulonga Water and Sewage Co. © 2023
        </p>
        <p className="text-lg hover:bg-slate-200 py-2 px-2 rounded text-white">All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
