import { useState, useEffect } from "react";

/**
 *
 * @todo UNABLE TO GET USEFETCH TO WORK CORRECTLY - RETURNS UNDEFINED SPORADICALLY
 */
export const useFetch = url => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setError(null);
      })
      .catch(err => {
        setData(null);
        setError(err);
      });
  }, [url]);

  return {
    data,
    error
  };
};
