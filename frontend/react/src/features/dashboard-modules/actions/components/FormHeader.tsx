interface FormHeaderProps {
  icon: string;
  name: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ icon, name }) => {
  return (
    <div className="flex justify-center items-center gap-3">
      <img src={icon} alt="" className="w-12" />
      <h1 className="text-3xl font-thin">{name}</h1>
    </div>
  );
};

export default FormHeader;
