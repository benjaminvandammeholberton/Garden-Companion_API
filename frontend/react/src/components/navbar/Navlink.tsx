import { Link } from "react-router-dom";

interface NavlinkProps {
  path: string;
  imgUrl: string;
}

const Navlink = ({ path, imgUrl }: NavlinkProps) => {
  return (
    <div className="bg-white rounded-lg">
      <Link to={path}>
        <img className="w-16 p-2" src={imgUrl} />
      </Link>
    </div>
  );
};

export default Navlink;
