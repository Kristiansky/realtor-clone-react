import {useEffect, useState} from "react";
import {collection, orderBy, query, limit, getDocs} from "firebase/firestore";
import {db} from "../firebase";
import Spinner from "./Spinner";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {EffectFade, Autoplay, Navigation, Pagination} from "swiper";
import "swiper/css/bundle"
import {useNavigate} from "react-router";

const Slider = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  SwiperCore.use([Autoplay, Navigation, Pagination])
  useEffect(()=>{
    async function fetchListings(){
      const listingsRef = collection(db, "listings")
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5))
      const docSnap = await getDocs(q)
      let listings = [];
      docSnap.forEach((doc)=>{
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListings(listings)
      setLoading(false)
    }
    fetchListings()
  }, [])
  if(loading){
    return <Spinner/>
  }
  if(listings.length === 0){
    return <></>
  }
  return (
    listings &&
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{type: "progressbar"}}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{delay: 3000}}
        >
          {listings.map(({data, id})=>(
            <SwiperSlide key={id} onClick={()=>navigate(`/category/${data.type}/${id}`)}>
              <div style={{background: `url(${data.imgUrls[0]}) center, no-repeat`, backgroundSize: "cover"}}
              className="w-full h-[300px] overflow-hidden">
                <p className="text-black font-medium text-[24px] absolute bottom-[30%] left-[15%] p-4 bg-opacity-60 bg-white">{data.name}</p>
                <p className="text-black font-medium text-[20px] absolute bottom-[5%] left-[15%] p-4 bg-opacity-60 bg-white">
                  ${data.discountPrice ?? data.regularPrice}
                  {data.type === "rent" && " / month"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
  )
}
export default Slider