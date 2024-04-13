import Navlink from "./Navlink";

import dashboardIcon from "../../assets/navbar/dashboard.png";
import productionIcon from "../../assets/navbar/production.png";
import seedlingsIcon from "../../assets/navbar/seedlings.png";
import guideIcon from "../../assets/navbar/guide.png";
import settingsIcon from "../../assets/navbar/settings.png";

const Navbar = () => {
  return (
    <div
      className="
      fixed
      left-10
      lg:left-0
      hidden
      xl:flex
      flex-col
      gap-5
      justify-center
      items-center
      bg-white
      border-2 rounded-e-3xl
      w-[90px]
      h-[430px]
      mt-56
      "
    >
      <Navlink path="/dashboard" imgUrl={dashboardIcon} />
      <Navlink path="/production" imgUrl={productionIcon} />
      <Navlink path="/seedlings" imgUrl={seedlingsIcon} />
      <Navlink path="/guide" imgUrl={guideIcon} />
      <Navlink path="/settings" imgUrl={settingsIcon} />
    </div>
  );
};
export default Navbar;
