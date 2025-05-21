import { logo } from "../assets";

const Navbar = ({ handleToken }) => {
  return (
    <div className="flex items-center justify-between py-2 px-[4%] ">
      <img className="w-[max(10%,80px)]" src={logo} alt="logo" />
      <button
        onClick={() => handleToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-sx sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
