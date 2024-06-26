"use client"

import React, { useContext, useEffect, useState } from 'react'
import './new-projects.css'
import Header from '../components/Header/Header'
import { ToggleContext } from '../contextProviders/ToggleContextProvider'
import { TbHomeSignal } from "react-icons/tb";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdApartment } from "react-icons/md";
import { BsShopWindow } from "react-icons/bs";
import { HiSpeakerphone } from "react-icons/hi";
import { BsHousesFill } from "react-icons/bs";
import { apiReq } from '../utils/fetch'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { LiaBedSolid } from "react-icons/lia";
import { LuBath } from "react-icons/lu";
import { TbResize } from "react-icons/tb";

export default function page() {
  const [property_subtype_id, setProperty_subtype_id] = useState(1)
  const [location_name, setLocation_name] = useState("")
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [bedrooms, setBedrooms] = useState(1)

  const [fetchedLocations, setFetchedLocations] = useState([])

  const [searchResults, setSearchResults] = useState()
  const [image, setImage] = useState()

  const { 
    sidebarToggle, 
    searchDivToggle,
    propertyTypeToggle,
    propertySubtypeToggle,
    numberOfRooms,
    resetSearch,
    handleSearchDivToggle, 
    handlePropertyTypeToggle,
    handlePropertySubtypeToggle,
    handleNumberOfRooms,
    handleResetSearch
  } = useContext(ToggleContext)

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        const res = await apiReq(8000, 'terra.property-service/get.allLocations', null, 'GET', null)

        const result = await res.json()
        if (!result) {
          toast.error("Cannot fetch locations")
        }
      setFetchedLocations(result.response)
      } catch (error) {
        toast.error("Cannot fetch locations")
      }
    }

    fetchAllLocations()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()

    const url = `terra.property-service/get.searchFilterProperties`
    
    try {
      await (property_subtype_id)
      const res = await apiReq(
        8000,
        url,
        null,
        'POST',
        { property_subtype_id, location_name, minPrice, maxPrice, numberOfRooms }
      )

      const result = await res.json()
      setSearchResults(result.response)
      console.log(searchResults)
    } catch (error) {
      toast.error("Error searching properties")
    }
  }

  return (
    <div id='new-projects main-searchpage'>
        <Header />
        <div className='search-section'> 
            <div className='sidebar'>
              <div className='sidebar-content'> {/* additional div */}
              <div className='sb-head'>
                <h3 className='filters'>Filters</h3>
                <p onClick={handleResetSearch} className='reset-btn'>Reset</p>
              </div>

              <div className='property-type-filter ptft'>
                <div id='pt-type-head-div'>
                  <p onClick={() => handlePropertyTypeToggle("home")} className={`pt-type-head ${propertyTypeToggle === "home" ? 'active' : 'inactive'}`}>Home</p>
                  <p onClick={() => handlePropertyTypeToggle("plots")} className={`pt-type-head ${propertyTypeToggle === "plots" ? 'active' : 'inactive'}`}>Plots</p>
                  <p onClick={() => handlePropertyTypeToggle("commercial")} className={`pt-type-head ${propertyTypeToggle === "commercial" ? 'active' : 'inactive'}`}>Commercial</p>
                </div>
                
                <div className='types'>

                  <div className={`pt-types ${propertyTypeToggle === "home" ? 'active' : 'inactive'}`}>
                      <div onClick={() => {handlePropertySubtypeToggle("house"); setProperty_subtype_id(1)}} className={`pst-types ${propertySubtypeToggle === "house" ? 'active' : ''}`}>
                        <TbHomeSignal className='pt-types-icon' />
                        <p>House</p>
                      </div>

                      <div onClick={() => {handlePropertySubtypeToggle("flat"); setProperty_subtype_id(2)}} className={`pst-types ${propertySubtypeToggle === "flat" ? 'active' : ''}`}>
                        <MdApartment className='pt-types-icon' />
                        <p>Flat</p>
                      </div>
                  </div>

                  <div className={`pt-types ${propertyTypeToggle === "plots" ? 'active' : 'inactive'}`}>
                      <div onClick={() => {handlePropertySubtypeToggle("residential"); setProperty_subtype_id(3)}} className={`pst-types ${propertySubtypeToggle === "residential" ? 'active' : ''}`}>
                        <BsHousesFill className='pt-types-icon' />
                        <p>Residential</p>
                      </div>

                      <div onClick={() => {handlePropertySubtypeToggle("commercial"); setProperty_subtype_id(4)}} className={`pst-types ${propertySubtypeToggle === "commercial" ? 'active' : ''}`}>
                        <HiSpeakerphone className='pt-types-icon' />
                        <p>Commercial</p>
                      </div>
                  </div>

                  <div className={`pt-types ${propertyTypeToggle === "commercial" ? 'active' : 'inactive'}`}>
                      <div onClick={() => {handlePropertySubtypeToggle("office"); setProperty_subtype_id(5)}} className={`pst-types ${propertySubtypeToggle === "office" ? 'active' : ''}`}>
                        <HiOutlineBuildingOffice2 className='pt-types-icon' />
                        <p>Office</p>
                      </div>

                      <div onClick={() => {handlePropertySubtypeToggle("shop"); setProperty_subtype_id(6)}} className={`pst-types ${propertySubtypeToggle === "shop" ? 'active' : ''}`}>
                        <BsShopWindow className='pt-types-icon' />
                        <p>Shop</p>
                      </div>
                  </div>

                </div>
              </div>

              <div className='location-filter lft'>
                <p className='location-head lh'>Location</p>
                <select onChange={(e) => setLocation_name(e.target.value)} name="location-dropdown">
                  { 
                    fetchedLocations && 
                    fetchedLocations.map(loc => (
                      <option key={loc.location_id} value={loc.location_name}>
                        {loc.location_name}
                      </option>
                    ))
                  }
                </select>
              </div>
    
              <div className='price-filter pft'>
                <p className='price-head ph'>Price Range</p>
                <div className='pft-input'>
                  <div className='min'>
                    <p>Min</p>
                    <input type='number' value={ minPrice } onChange={(e) => setMinPrice(e.target.value)}/>
                  </div>
                  <div className='max'>
                    <p>Max</p>
                    <input type='number' value={ maxPrice } onChange={(e) => setMaxPrice(e.target.value)}/>
                  </div>
                </div>
              </div>

              <div className='rooms-filter rft'>
                <p className='room-head rh'>Rooms</p>
                <div className='room-div'>
                  <p onClick={() => {handleNumberOfRooms(1); setBedrooms(numberOfRooms)}} className='add-rooms'>+</p>
                  <p className='num-of-rooms'>{numberOfRooms}</p>
                  <p onClick={() => {handleNumberOfRooms(-1); setBedrooms(numberOfRooms)}} className='remove-rooms'>-</p>
                </div>
              </div>
              </div>
            </div>

            <div className='rsp results-searchbar-page'>
                <div className='searchbar-section'>
                  <div id='searchbar-section-filtered'>
                    {
                      propertySubtypeToggle &&
                      <div className='searchbar-section-filtered-inner-div'>{propertySubtypeToggle}</div>
                    }
                    {
                      location_name &&
                      <div className='searchbar-section-filtered-inner-div'>{location_name}</div>
                    }
                    {
                      minPrice && maxPrice && 
                    <div className='searchbar-section-filtered-inner-div'>{minPrice} - {maxPrice}</div>
                    }
                    {
                      numberOfRooms && 
                    <div className='searchbar-section-filtered-inner-div'>Bedrooms {numberOfRooms}</div>
                    }
                    
                  </div>
                  <button id='main-search-pg-search-btn' onClick={handleSearch}>Search</button>
                </div>
                <div className="results-section">
                  <div className="results-section-head rsh">
                    <p>Search Results</p>
                  </div>
                  {
                    searchResults &&
                    searchResults.map((property, index) => (
                    <div className="property-card-of-results pc" key={index}>
                      <div id='search-result-property-imgs-div'>
                        <img id='search-result-property-imgs' src={property.property_images && property.property_images[0] ? property.property_images[0] : '/imgs/1.jpg'} alt="Property" />
                      </div>
                      <div className="card-details">
                        <h3>PKR {property.price}</h3>
                        <p>{property.purpose}</p>
                        <p>{property.property_description.substring(0, 100)}...</p>
                        <div id='property-ad-bed-bath-area-div-right'>
                            <div className='property-ad-property-bed-bath-area'>
                                <LiaBedSolid className='property-ad-bed-bath-area-icon' />
                                <p>{property.bedrooms}</p>
                            </div>
                            <div className='property-ad-property-bed-bath-area'>
                                <LuBath className='property-ad-bed-bath-area-icon' />
                                <p>{property.bathrooms}</p>
                            </div>
                            <div className='property-ad-property-bed-bath-area'>
                                <TbResize className='property-ad-bed-bath-area-icon' />
                                <p id='area-p-tag'>{property.area}sqft.yd</p>
                            </div>
                            <div id='property-view-btn-div'>
                              <Link id='property-view-btn' href={`/new-projects/${property.property_id}`}>View</Link>
                            </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

        </div>
        {/* <p className=" font-semibold text-center mb-2">&copy; Terra 2024 CSIT NEDUET</p> */}
    </div>
  )
}
