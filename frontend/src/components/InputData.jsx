import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";

const InputData = ({ InputDiv, setInputDiv, UpdatedData, setUpdatedData, fetchData }) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  useEffect(() => {
    // Ensure UpdatedData has values before setting
    if (UpdatedData?.id) {
      setData({ title: UpdatedData.title, desc: UpdatedData.desc });
    } else {
      setData({ title: "", desc: "" }); // for add task
    }
  }, [UpdatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.post("http://localhost:3000/api/v2/create-task", Data, {
        headers,
      });
      fetchData();
      resetAll();
    }
  };

  const UpdateTask = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.put(
        `http://localhost:3000/api/v2/update-task/${UpdatedData.id}`,
        Data,
        { headers }
      );
      fetchData();
      resetAll();
    }
  };

  const resetAll = () => {
    setInputDiv("hidden");
    setData({ title: "", desc: "" });
    setUpdatedData({ id: "", title: "", desc: "" });
  };

  return (
    <div>
      <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>

      <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className="content-scroll w-[80vh] p-5 bg-slate-950 h-[70vh] overflow-y-auto rounded-lg">
          <div className="flex justify-end">
            <button className="text-2xl text-gray-300" onClick={resetAll}>
              <RxCross2 />
            </button>
          </div>

          <input
            type="text"
            placeholder="Title"
            name="title"
            value={Data.title || ""}
            onChange={handleChange}
            className="px-4 py-2 bg-slate-800 rounded w-full mt-4"
          />

          <textarea
            name="desc"
            cols="30"
            rows="10"
            value={Data.desc || ""}
            onChange={handleChange}
            placeholder="Description.."
            className="px-4 bg-slate-800 py-2 rounded w-full my-5"
          ></textarea>

          <div className="flex gap-3">
            {UpdatedData.id === "" ? (
              <button
                type="button"
                className="text-white w-[48%] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-semibold rounded-lg px-2 py-2.5 text-center flex items-center justify-center gap-1"
                onClick={handleSubmit}
              >
                <IoMdAddCircleOutline className="text-2xl" />
                <h2 className="text-lg">Add Task</h2>
              </button>
            ) : (
              <button
                type="button"
                className="text-white w-[48%] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-base px-5 py-2.5 text-center"
                onClick={UpdateTask}
              >
                Update
              </button>
            )}

            <button
              type="button"
              className="text-gray-300 h-12 w-[48%] text-lg font-semibold py-2.5 px-5 rounded-lg hover:bg-slate-800 transition-all bg-slate-900"
              onClick={resetAll}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputData;
