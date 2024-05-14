import carrot from "../assets/landing/icons/carrot.png";
import tomato from "../assets/landing/icons/tomato.png";

type VegetableIconRegistryType = {
  [key: string]: string;
};

const vegetableIconRegistry: VegetableIconRegistryType = {
  carrot,
  tomato,
};

export default vegetableIconRegistry;
