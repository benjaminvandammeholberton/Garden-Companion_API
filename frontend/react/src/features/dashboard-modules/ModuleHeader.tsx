import { infoIcon } from "../../assets/assets-path";

interface ModuleHeaderProps {
  title: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({ title }) => {
  return (
    <div className="p-2 flex justify-center items-center w-full gap-2">
      <h1 className="text-2xl font-thin text-center">{title}</h1>
      <img className="w-4 h-4 cursor-pointer" src={infoIcon} alt="" />
    </div>
  );
};

export default ModuleHeader;
