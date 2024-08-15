import { useEffect, useState } from "react";
import { AreaInterface } from "../interfaces/interfaces";
import useAuth from "./useAuth";
import { getAllAreas } from "../api/api-services/areas";

type useGetAreasReturnType = [AreaInterface[], boolean, string | null];

const useGetAreas = (): useGetAreasReturnType => {
  const [user] = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, SetError] = useState<string | null>(null);
  const [areas, setAreas] = useState<AreaInterface[]>([]);

  useEffect(() => {
    const fetchAreas = async () => {
      setIsLoading(true);
      try {
        const areas: AreaInterface[] = await getAllAreas();
        const sortedAreas = areas.sort((a, b) => a.name.localeCompare(b.name));
        setAreas(sortedAreas);
      } catch (error) {
        SetError(error as string);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchAreas();
  }, [user]);

  return [areas, isLoading, error];
};

export default useGetAreas;
