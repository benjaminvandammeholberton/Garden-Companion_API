interface ButtonLandingProps {
  children: string;
}
const ButtonLanding: React.FC<ButtonLandingProps> = ({ children }) => {
  return <button className="buttonLanding">{children}</button>;
};

export default ButtonLanding;
