import {useState} from "react";
import {Link} from "react-router-dom";
import OAuth from "../components/OAuth";
import {toast} from "react-toastify";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  function onChange(e){
    setEmail(e.target.value);
  }
  
  const onSubmit = async (e) => {
    e.preventDefault()
    try{
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email was sent successfully")
    }catch (error){
      toast.error(error.message)
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-5 font-bold">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src="./assets/images/key.jpg" alt="key" className="w-full rounded-2xl"/>
        </div>
        <div className="md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-3"
              onChange={onChange}
              placeholder="Email address"/>
            
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">Don't have an account?
                <Link to="/sign-up" className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1">Register</Link>
              </p>
              <p>
                <Link to="/sign-in" className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 ml-1">Sign in instead</Link>
              </p>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-50 active:bg-blue-800">Send reset password</button>
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

export default ForgotPassword
