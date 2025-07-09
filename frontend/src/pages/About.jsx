import React from "react";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="pt-[12vh] px-4 sm:px-6 md:px-10 text-gray-200 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About This Web App</h1>
        <p className="mb-4">
          Welcome to the <strong>Task Management</strong> web application. This tool helps you manage your tasks efficiently and stay organized.
        </p>

        <h2 className="text-2xl font-semibold mt-4 mb-2">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>When you visit the website, you will first see the <strong>Signup</strong> page to create a new account.</li>
          <li>After signup, you can <strong>Login</strong> with your credentials.</li>
          <li>Once logged in, you will land on your dashboard where you can create, edit, delete, and mark tasks as important or completed.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4 mb-2">Features</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Add new tasks easily.</li>
          <li>Mark tasks as important to prioritize them.</li>
          <li>Mark tasks as completed or incompleted.</li>
          <li>Delete tasks you no longer need.</li>
          <li>One thing remember you can <strong>Delete</strong> and <strong>Edit</strong> the task only on dashboard or alltasks page.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4 mb-2 ">Future Plans</h2>
        <p className="sm:pb-2 md:pb-2">
          In future updates, we plan to add more features like deadlines, reminders, and enhanced collaboration tools.
        </p>
      </div>
    </>
  );
};

export default About;
