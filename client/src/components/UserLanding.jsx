import { Link } from "react-router-dom";

const Landing = () => {

  return (
    <div className="flex w-full justify-center items-center">
      <div className="bg-[#f5f6fa] h-screen flex flex-col w-full justify-center items-center">
        <p className="text-blue-900 text-2xl">Welcome back</p>
        <p className="text-blue-800 text-xl mt-2">
          Kindly select what you want to do from the services listed below
        </p>
        <div className="mt-6 flex flex-col gap-6">
          <div className="justify-center gap-8 w-full flex">
            <Link
              to="/transact"
              className="px-6 py-4 w-[200px] h-[80px] bg-blue-900 hover:bg-blue-700 rounded text-white"
            >
              Issue A New Receipt
            </Link>
            <Link
              to="/open"
              className="px-6 py-4 w-[200px] h-[80px] bg-[#fe8267] hover:bg-[#fda18c] rounded text-white"
            >
              View All Open Receipts
            </Link>
          </div>
          <div className="justify-center gap-8 w-full flex">
            <Link
              to="/closed"
              className="px-6 py-4 w-[200px] h-[80px] bg-[#260c65] hover:bg-[#5938a7] rounded text-white"
            >
              View All Closed Receipts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
