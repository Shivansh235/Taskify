import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "axios";

const ImportantTasks = () => {
  const [Data, setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Define fetchData outside useEffect
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://taskify-iota-three.vercel.app/api/v2/get-imp-tasks",
        { headers }
      );
      setData(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (headers.id && headers.authorization) {
      fetchData();
    }
  }, []);

  return (
    <div className="px-3 sm:px-5 md:px-10 lg:px-20 py-3">
      {Data && <Cards home={false} data={Data} fetchData={fetchData} />}
    </div>
  );
};

export default ImportantTasks;
