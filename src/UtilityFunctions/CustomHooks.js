import { useState, useEffect } from "react";

export const useFetch = url => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (err) {
        setError(`Error occurred when fetching from ${url}: ${err}`);
      }
    };
    fetchData();
  }, [url]);

  return {
    data,
    error
  };
};
