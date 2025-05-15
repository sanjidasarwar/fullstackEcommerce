import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(email, password);
    } catch (error) {}
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              type="email"
              name=""
              id=""
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              required
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              type="email"
              name=""
              id=""
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              required
              placeholder="Enter Email"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="mt-2 px-4 py-2 w-full rounded-md text-white bg-black"></button>
        </form>
      </div>
    </div>
  );
};

export default Login;
