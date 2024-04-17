import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavlinkProps {
  path: string;
  imgUrl: string;
}

const Navlink = ({ path, imgUrl }: NavlinkProps) => {
  const [isUrl, setIsUrl] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setIsUrl(location.pathname.includes(path));
  }, [location.pathname, path]);

  return (
    <div
      className={`${
        isUrl && "border-l border-b-4 rounded-lg border-gray-500 z-50 "
      }bg-white`}
    >
      <Link to={path}>
        <img className="w-16 p-2" src={imgUrl} />
      </Link>
    </div>
  );
};

export default Navlink;
