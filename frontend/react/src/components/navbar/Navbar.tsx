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
      right-0
      top-1/2
      transform
      -translate-y-1/2
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
      <Navlink path="me/dashboard" imgUrl={dashboardIcon} />
      <Navlink path="me/myspace" imgUrl={diaryIcon} />
      <Navlink path="/network" imgUrl={networkIcon} />
      <Navlink path="me/seeds" imgUrl={seeedsIcon} />
      <Navlink path="me/tools" imgUrl={toolsIcon} />
      <Navlink path="me/guide" imgUrl={guideIcon} />
    </div>
  );
};
export default Navbar;
