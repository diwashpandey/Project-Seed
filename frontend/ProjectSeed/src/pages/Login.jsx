// React and third-party imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginHandler from "../authentication/loginHandler";
import { signUpRoute } from "../utilities/frontendRoutes";
import { pageNameAccordingToNum } from "../components/Register/pageUtilities/pageNavigationUtils";

const loginHandler = new LoginHandler();

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [messageFromServer, setMessageFromServer] = useState(null);
  const [messageBoxColor, setMessageBoxColor] = useState("bg-[#a91414]");

  useEffect(() => {}, [messageFromServer]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginHandler.handleLoginRequest(formData.email, formData.password);

    setMessageFromServer(response.messageFromServer);
    setMessageBoxColor(response.successStatus ? "bg-green-600" : "bg-[#a91414]");

    if (response.successStatus) {
      setTimeout(() => (window.location.href = "/"), 500);
    }
  };

  return (
    <main className="h-screen w-screen center">
      <form
        id="login-box"
        className="h-[30rem] w-[26rem] p-8 rounded-lg flex flex-col items-center relative bg-main-box"
        onSubmit={handleSubmit}
      >
        {messageFromServer && (
          <p
            id="message-from-server"
            className={`p-2 max-w-full absolute rounded-lg top-[-10%] ${messageBoxColor}`}
          >
            {messageFromServer}
          </p>
        )}

        <h1 className="mb-16 text-3xl text-center text-theme-color">
          Login to Seed
        </h1>
        <div className="mb-6">
          <p className="text-sm">Email</p>
          <input
            type="email"
            className="bg-theme-darker h-10 w-full p-4 rounded-xl font-light placeholder:font-extralight focus-visible:outline-none"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <p className="text-sm">Password</p>
          <input
            type="password"
            className="bg-theme-darker h-10 w-full p-4 rounded-xl font-light placeholder:font-extralight focus-visible:outline-none"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p className="text-xs text-end font-light opacity-70 hover:opacity-100 cursor-pointer">
            Forgot Password?
          </p>
        </div>
        <button type="submit" className="btn-theme-hollow mb-4">
          Login
        </button>
        <div id="seperators" className="flex w-full justify-between mb-4">
          <div id="line1" className="w-[40%] h-0.5 bg-theme-lighter"></div>
          <div id="line2" className="w-[40%] h-0.5 bg-theme-lighter"></div>
        </div>
        <p className="text-sm">
          Don't have an account?{" "}
          <Link
            to={`${signUpRoute}${pageNameAccordingToNum[1]}`}
            className="text-theme-color hover:underline"
          >
            Create a new account
          </Link>
        </p>
      </form>
    </main>
  );
}
