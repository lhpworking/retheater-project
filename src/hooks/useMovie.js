import { useEffect, useState } from "react";

const useMovie = (promise, deps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, deps);

  const fetchData = async () => {
    setLoading(true);
    try {
      promise.then((res) => {
        if (res) setData(res);
        if (res.results) setData(res.results);
        setLoading(false);
      });
    } catch (error) {
      console.log("==========error===========:", error);
    }
  };
  return {
    data,
    loading,
  };
};
export default useMovie;
