import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavlinkProps {
  path: string;
  imgUrl: string;
  onClose: () => void;
  title: string;
}

const Navlink = ({ path, imgUrl, onClose, title }: NavlinkProps) => {
  const [isUrl, setIsUrl] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setIsUrl(location.pathname.includes(path));
  }, [location.pathname, path]);

  return (
    <div
      className={`
      ${isUrl && "border-l border-b-4 rounded-lg border-gray-500 z-50 "}
      bg-white`}
    >
      <Link to={path}>
        <div className="flex items-center gap-10" onClick={onClose}>
          <img className="w-16 p-2" src={imgUrl} />
          <h1 className="text-3xl font-thin">{title}</h1>
        </div>
      </Link>
    </div>
  );
};

export default Navlink;
