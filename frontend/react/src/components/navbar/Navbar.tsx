import Navlink from "./Navlink";
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
      <Navlink path="/dashboard" imgUrl="./assets/navbar/dashboard.png" />
      <Navlink path="/production" imgUrl="./assets/navbar/production.png" />
      <Navlink path="/seedlings" imgUrl="./assets/navbar/seedlings.png" />
      <Navlink path="/guide" imgUrl="./assets/navbar/guide.png" />
      <Navlink path="/settings" imgUrl="./assets/navbar/settings.png" />
    </div>
  );
};
export default Navbar;
