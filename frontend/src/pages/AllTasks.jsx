import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { IoMdAddCircleOutline } from "react-icons/io";
import InputData from "../components/InputData";
import axios from "axios";

const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [UpdatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Moved fetchData outside useEffect so we can pass it to Cards
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://taskify-iota-three.vercel.app/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (headers.id && headers.authorization) {
      fetchData(); // initial fetch
    }
  }, []);

  return (
    <>
      <div className="px-3 sm:px-4 md:px-10 lg:px-7 py-3">
        <div className="flex justify-end text-3xl sm:text-4xl text-gray-300 transition-all duration-300 hover:text-gray-400">
          <button onClick={() => setInputDiv("fixed")}>
            <IoMdAddCircleOutline />
          </button>
        </div>

        {Data && (
          <Cards
            home={"true"}
            setInputDiv={setInputDiv}
            data={Data.tasks}
            setUpdatedData={setUpdatedData}
            fetchData={fetchData} // ✅ pass here
          />
        )}
      </div>

      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        UpdatedData={UpdatedData}
        setUpdatedData={setUpdatedData}
        fetchData={fetchData} 
      />
    </>
  );
};

export default AllTasks;
