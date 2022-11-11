import {useState} from "react";
import {BsEyeFill, BsEyeSlashFill} from "react-icons/bs";
import {Link} from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {name, email, password} = formData;
  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-5 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src="./assets/images/key.jpg" alt="key" className="w-full rounded-2xl"/>
        </div>
        <div className="md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-3"
              onChange={onChange}
              placeholder="Full name"/>
            <input
              type="email"
              id="email"
              value={email}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-3"
              onChange={onChange}
              placeholder="Email address"/>
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                onChange={onChange}
                placeholder="Password"/>
              {showPassword ? (
                <BsEyeFill className="absolute right-3 top-3 text-xl cursor-pointer" onClick={()=>setShowPassword(prevState => !prevState)}/>
              ): (
                <BsEyeSlashFill className="absolute right-3 top-3 text-xl cursor-pointer" onClick={()=>setShowPassword(prevState => !prevState)}/>
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">Have an account?
                <Link to="/sign-in" className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1">Sign in</Link>
              </p>
              <p>
                <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 ml-1">Forgot password?</Link>
              </p>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-50 active:bg-blue-800">Sign Up</button>
          </form>
          <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <OAuth />
        </div>
      </div>
    </section>
  )
}

export default SignUp
