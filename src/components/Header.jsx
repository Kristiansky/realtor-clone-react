import {useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const Header = () => {
  const [pageState, setPageState] = useState("SignIn")
  const [pageUrlState, setPageUrlState] = useState("/sign-in")
  const location = useLocation()
  const navigate = useNavigate()
  function pathMatchRoute(route) {
    if(route === location.pathname){
      return true;
    }
  }
  const auth = getAuth()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setPageState("Profile")
        setPageUrlState("/profile")
      }else{
        setPageState("Sign In")
        setPageUrlState("/sign-in")
      }
    })
  }, [auth])
  
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img src="./assets/images/rdc-logo-default.svg" alt="Logo" className="h-5 cursor-pointer" onClick={() => navigate("/")}/>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "text-black border-b-red-400"}`} onClick={() => navigate("/")}>Home</li>
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/offers") && "text-black border-b-red-400"}`} onClick={() => navigate("/offers")}>Offers</li>
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-black border-b-red-400"}`} onClick={() => navigate(pageUrlState)}>{pageState}</li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header
