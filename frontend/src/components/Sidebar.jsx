// 3. Sidebar.jsx
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";
import { useEffect, useState } from "react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = [
    { title: "All tasks", icons: <CgNotes />, link: "/" },
    {
      title: "Important tasks",
      icons: <MdLabelImportant />,
      link: "/importantTasks",
    },
    {
      title: "Completed tasks",
      icons: <FaCheckDouble />,
      link: "/completedTasks",
    },
    {
      title: "Incompleted tasks",
      icons: <TbNotebookOff />,
      link: "/incompletedTasks",
    },
  ];

  const [Data, setData] = useState();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/signup");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v2/get-all-tasks",
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, []);

  return (
    <div
      className={`bg-slate-900 rounded-xl p-4 pb-12 border border-gray-600 sm:block ${
        isOpen ? "block" : "hidden sm:block"
      }`}
    >
      {Data && (
        <div className="gap-2 flex flex-col justify-between">
          <Link to="/" className="cursor-pointer">
            <h3 className="text-xl font-semibold break-words">
              {Data.username}
            </h3>
          </Link>
          <h4 className="mb-1 text-gray-400 break-words">{Data.email}</h4>
          <hr />
        </div>
      )}

      <div className="mt-10">
        <h1 className="text-xl font-medium pb-4">Menu</h1>
        {data.map((items, Index) => (
          <Link
            to={items.link}
            key={Index}
            className="flex items-center gap-3 mt-4 hover:bg-gray-800 rounded-xl p-2 font-semibold text-xl transition-all duration-300 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            {items.icons}
            {items.title}
          </Link>
        ))}
      </div>

      <div>
        <button
          className="w-full hover:bg-purple-700 transition-all duration-300 bg-purple-600 p-2 rounded-lg font-semibold text-lg mt-14"
          onClick={logout}
        >
          Log Out
        </button>
      </div>

      <div className="flex justify-center mt-10 gap-5 text-xl text-gray-400">
        <a
          href="https://github.com/shivansh235"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/shivansh-kasaudhan-09a4042a7/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://x.com/SHIVANSHKAS2005"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaTwitter />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
