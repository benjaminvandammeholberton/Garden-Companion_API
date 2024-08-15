import { useEffect, useState } from "react";
import { AreaInterface } from "../interfaces/interfaces";
import useAuth from "./useAuth";
import { getAllVegetables } from "../api/api-services/vegetables";

type useGetVegetablesReturnType = [AreaInterface[], boolean, string | null];

const useGetVegetables = (): useGetVegetablesReturnType => {
  const [user] = useAuth();
  const [isLoading, SetIsLoading] = useState(false);
  const [error, SetError] = useState<string | null>(null);
  const [vegetables, setVegetables] = useState<AreaInterface[]>([]);

  useEffect(() => {
    const fetchVegetables = async () => {
      SetIsLoading(true);
      try {
        const vegetables: AreaInterface[] = await getAllVegetables();
        const sortedVegetables = vegetables.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setVegetables(sortedVegetables);
      } catch (error) {
        SetError(error as string);
        console.error(error);
      } finally {
        SetIsLoading(false);
      }
    };
    if (user) fetchVegetables();
  }, [user]);

  return [vegetables, isLoading, error];
};

export default useGetVegetables;
