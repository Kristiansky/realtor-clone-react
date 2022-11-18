import {useState} from "react";
import {getAuth, updateProfile} from "firebase/auth";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import {updateDoc, doc} from "firebase/firestore";
import {db} from "../firebase";

const Profile = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetail, setChangeDetail] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });
  const {name, email} = formData;
  const onLogout = () => {
    auth.signOut()
    navigate("/")
  }
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
        [e.target.id]: e.target.value,
    }))
  }
  
  const onSubmit = async () => {
    try{
      if(auth.currentUser.displayName !== name){
        // update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        
        // update name in the firestore
        const docRef = doc(db, "user", auth.currentUser.uid)
        await updateDoc(docRef, {
          name: name
        })
        toast.success('Profile details updated')
      }
    }catch(error){
      toast.error(error.message)
    }
  }
  
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* Name Input */}
            <input type="text" id="name" value={name} disabled={!changeDetail} onChange={onChange} className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200"}`}/>
            
            {/* Email Input */}
            <input type="email" id="email" value={email} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"/>
            
            <div className="flex justify-between whitespace-nowrap text-sm">
              <p className="flex items-center mb-6">Do you want to change your name?
                <span
                  className="text-red-600 hover:text-red-700 transition ease-in-out ml-1 cursor-pointer"
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevDetail) => !prevDetail)
                  }}>
                  {changeDetail ? "Apply changes" : "Edit"}
                </span>
              </p>
              <p onClick={onLogout} className="text-blue-600 hover: text-blue-700 transition ease-in-out cursor-pointer">Sign Out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Profile
