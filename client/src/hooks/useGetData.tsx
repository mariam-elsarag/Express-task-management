import { useEffect, useState } from "react";
import axiosInstance from "../servicses/axiosInstance";

function useGetData(endpoint: string) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(endpoint);
      const fetchedData = response.data;
      setData(fetchedData || []);
    } catch (error) {
      console.error("Error fetching data:", error);

      setError(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, setData, loading, fetchData, error };
}

export default useGetData;
