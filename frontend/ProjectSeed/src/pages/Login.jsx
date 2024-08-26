// React imports
import { useEffect, useState } from "react";

// Third partied libraries import
import { Link } from "react-router-dom";

// Additional imports
import LoginHandler from "../authentication/loginHandler"
import { signUpRoute, generateProfileRoute } from "../utilities/frontendRoutes";
import { pageNameAccordingToNum } from "../components/Register/pageUtilities/pageNavigationUtils";


const loginHandler = new LoginHandler()

function Login() {

  let [formData, setFormData] = useState({
    "email":"",
    "password":""
  })

  let [messageFromServer, setMessageFromServer] = useState(null)
  let [messageBoxColor, setMessageBoxColor] = useState("bg-[#a91414]")

  useEffect(()=>{
  }, [messageFromServer])

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const response = await loginHandler.handleLoginRequest(formData.email, formData.password);

    if (response.successStatus === true){
      setMessageFromServer(response.messageFromServer);
      setMessageBoxColor("bg-green-600");
      setTimeout(()=>{
        window.location.href = "/";
      }, 500)
    }
    else{
      setMessageFromServer(response.messageFromServer);
      setMessageBoxColor("bg-[#a91414]");
    }
  }

  return (
    <>
    <main className="h-screen w-screen center">
      <form id="login-box" className="h-[30rem] w-[26rem] p-8 rounded-lg flex flex-col items-center relative bg-main-box"  onSubmit={handleSubmit}>

        {/* Showing the messgae from the server when get */}
        {
        messageFromServer != null ? (
              <p id="message-from-server" className={`p-2 max-w-full absolute rounded-lg top-[-10%] ${messageBoxColor}`}>
                {messageFromServer}
              </p>
            ) : null
          }
        
        <h1 className="mb-16 text-3xl text-center text-theme-color">Login to Seed</h1>
        <div className="mb-6">
          <p className="text-sm">Email</p>
          <input type="email" className="input-box h-8 w-64 max-w-full my-2" name="email" value={formData.email} onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <p className="text-sm">Password</p>
          <input type="password" className="input-box h-8 w-64 max-w-full my-2" name="password" value={formData.password} onChange={handleChange} required/>
          <p className="text-xs text-end">Forgot Password?</p>
        </div>
        <button type="submit" className="hollow-theme-btn mb-4" > Login </button>
        <div id="seperators" className="flex w-full justify-between mb-4">
          <div id="line1" className="w-[40%] h-0.5 bg-theme-lighter"></div>
          <div id="line2" className="w-[40%] h-0.5 bg-theme-lighter"></div>
        </div>
        <p className="text-sm">Don't have an account? <Link to={`${signUpRoute}${pageNameAccordingToNum[1]}`} className="text-theme-color hover:underline">Create a new account</Link></p>
      </form>
    </main>
    </>
  );
}

export default Login;
