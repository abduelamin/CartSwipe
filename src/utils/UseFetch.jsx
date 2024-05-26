import React, { useEffect, useState } from "react";
import apiClient from "./api-client";

const UseFetch = (url) => {
  const [data, setData] = useState(null);
  const [Error, setError] = useState("");

  // useEffect(() => {
  //   const fetchCategory = async () => {
  //     try {
  //       const response = await api.get(url);
  //       setData(response.data);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   fetchCategory();
  // }, []);

  useEffect(() => {
    try {
      apiClient.get(url).then((res) => setData(res.data));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return [data, Error];
};

export default UseFetch;
