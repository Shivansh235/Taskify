import React from "react";
import { FaRegHeart, FaEdit, FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Cards = ({ home, setInputDiv, data, setUpdatedData, fetchData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    try {
      const response = await axios.put(
        `https://taskify-iota-three.vercel.app/api/v2/update-comp-task/${id}`,
        {},
        { headers }
      );
      toast(response.data.message);
      fetchData(); // reload tasks after update
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportant = async (id) => {
    try {
      const response = await axios.put(
        `https://taskify-iota-three.vercel.app/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
      toast(response.data.message);
      fetchData(); // reload tasks after update
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id, title, desc });
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://taskify-iota-three.vercel.app/api/v2/delete-task/${id}`,
        { headers }
      );
      toast(response.data.message);
      fetchData(); // reload tasks after delete
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div
            key={i}
            className="flex flex-col justify-between border border-gray-400 bg-slate-900 p-4 gap-2 rounded-lg"
          >
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 my-2">{items.desc}</p>
            </div>

            <div className="w-full flex flex-col sm:flex-row  items-start sm:items-center justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => handleCompleteTask(items._id)}
                  className={`${
                    items.complete === false
                      ? "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      : "text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                  } font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2`}
                >
                  {items.complete === true ? "Completed" : "InCompleted"}
                </button>
                <Toaster position="top-center" reverseOrder={false} />
              </div>

              <div className="text-2xl flex items-center gap-4 mt-2 sm:ml-1 sm:mt-0">
                <button onClick={() => handleImportant(items._id)}>
                  {items.important === false ? (
                    <FaRegHeart />
                  ) : (
                    <FaHeart className="text-red-500" />
                  )}
                </button>

                {home !== "false" && (
                  <button onClick={() => handleEdit(items._id, items.title, items.desc)}>
                    <FaEdit />
                  </button>
                )}

                <button onClick={() => deleteTask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}

      {home === "true" && (
        <button
          onClick={() => setInputDiv("fixed")}
          className="flex flex-col justify-center items-center bg-slate-950 rounded-lg hover:scale-95 cursor-pointer transition-all text-gray-300 duration-300 p-5 h-44 w-full sm:w-72"
        >
          <IoIosAddCircle className="text-5xl" />
          <h2 className="text-2xl font-bold my-2">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
