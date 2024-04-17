import Navlink from "./Navlink";

import dashboardIcon from "../../assets/navbar/dashboard.png";
import diaryIcon from "../../assets/navbar/diary.png";
import guideIcon from "../../assets/navbar/guide.png";
import seeedsIcon from "../../assets/navbar/seeds.png";
import toolsIcon from "../../assets/navbar/tools.png";
import networkIcon from "../../assets/navbar/network.png";

const Navbar = () => {
  return (
    <div
      className="
      mt-[100px]
      fixed
      lg:left-0
      hidden
      lg:flex
      flex-col
      gap-5
      justify-center
      items-center
      bg-white
      border-2 rounded-e-3xl
      w-[90px]
      py-4
      "
    >
      <Navlink path="/dashboard" imgUrl={dashboardIcon} />
      <Navlink path="/production" imgUrl={diaryIcon} />
      <Navlink path="/network" imgUrl={networkIcon} />
      <Navlink path="/seeds" imgUrl={seeedsIcon} />
      <Navlink path="/tools" imgUrl={toolsIcon} />
      <Navlink path="/guide" imgUrl={guideIcon} />
    </div>
  );
};
export default Navbar;
