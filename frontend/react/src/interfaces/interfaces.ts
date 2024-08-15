export interface VegetableInterface {
  vegetable_manager_id: string;
  name: string;
  removeDate: string | null;
}

export interface AreaInterface {
  area_id: string;
  name: string;
  surface: number;
  created_at: string;
  updated_at: string;
  environnement: string;
  vegetables: VegetableInterface[];
}
