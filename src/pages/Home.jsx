import Slider from "../components/Slider";
import {useEffect, useState} from "react";
import {collection, getDocs, limit, orderBy, query, where} from "firebase/firestore";
import {db} from "../firebase";
import {Link} from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Home = () => {
  // Offers
  const [offerListings, setOfferListings] = useState(null)
  useEffect(()=>{
    async function fetchListings(){
      try{
        // get reference
        const listingsRef = collection(db, "listings")
        //create the query
        const q = query(listingsRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(4))
        // execute the query
        const docSnap = await getDocs(q)
        const listings = [];
        docSnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setOfferListings(listings)
      }catch (e){
        console.log(e)
      }
    }
    fetchListings()
  },[])
  
  // Rent
  const [rentListings, setRentListings] = useState(null)
  useEffect(()=>{
    async function fetchListings(){
      try{
        // get reference
        const listingsRef = collection(db, "listings")
        //create the query
        const q = query(listingsRef, where("type", "==", "rent"), orderBy("timestamp", "desc"), limit(4))
        // execute the query
        const docSnap = await getDocs(q)
        const listings = [];
        docSnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setRentListings(listings)
      }catch (e){
        console.log(e)
      }
    }
    fetchListings()
  },[])
  
  // Sale
  const [saleListings, setSaleListings] = useState(null)
  useEffect(()=>{
    async function fetchListings(){
      try{
        // get reference
        const listingsRef = collection(db, "listings")
        //create the query
        const q = query(listingsRef, where("type", "==", "sell"), orderBy("timestamp", "desc"), limit(4))
        // execute the query
        const docSnap = await getDocs(q)
        const listings = [];
        docSnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setSaleListings(listings)
        console.log()
      }catch (e){
        console.log(e)
      }
    }
    fetchListings()
  },[])
  
  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent Offers</h2>
            <Link to="/offers">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out">Show more offers</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerListings.map((listing)=>(
                <ListingItem id={listing.id} key={listing.id} listing={listing.data}/>
              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Rent-a-place</h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out">Show more offers</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rentListings.map((listing)=>(
                <ListingItem id={listing.id} key={listing.id} listing={listing.data}/>
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">For sale</h2>
            <Link to="/category/sell">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out">Show more offers</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {saleListings.map((listing)=>(
                <ListingItem id={listing.id} key={listing.id} listing={listing.data}/>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
