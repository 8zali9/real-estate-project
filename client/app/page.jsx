"use client"

import React, { useContext } from 'react'
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { TbHomeSignal } from "react-icons/tb";
import { MdApartment } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LiaChartAreaSolid } from "react-icons/lia";
import { HiSpeakerphone } from "react-icons/hi";
import Header from './components/Header/Header';
import { ToggleContext } from './contextProviders/ToggleContextProvider';
import Link from 'next/link';

export default function NewProjects() {
    const {
        saleToggle, rentToggle, handleSaleToggle, handleRentToggle,
    } = useContext(ToggleContext)

    return (
        <>
            <Header />
            <div id='mainpage'>
                <div id='main'>
                    <div id='main-search-div'>
                        <p className='main-head'>LET'S FIND A PERFECT PROPERTY FOR YOU</p>
                        <p className='main-all-over-pk'>Search from 500,000+ properties all over Pakistan</p>

                        {/* <div className='main-search'>
                            <div className='for-sale-rent'>
                                <p onClick={handleSaleToggle} className={`for-sr-sale ${saleToggle ? "for-sr-sale-active" : ""}`}>For Sale</p>
                                <p onClick={handleRentToggle} className={`for-sr-rent ${rentToggle ? "for-sr-rent-active" : ""}`}>For Rent</p>
                            </div>

                            <form className='searchform'>
                                <input
                                    className="sf-searchbar"
                                    type="text"
                                    placeholder='Search Terras & More...'
                                />
                                <div className='sf-filter-icon'><HiAdjustmentsHorizontal /></div>
                                <button className='sf-search-btn'>Search</button>
                            </form>

                            <div className='filter-opts'>
                                <div className='filter-opt-div'>
                                    <TbHomeSignal className='filter-opt-icon' />
                                    <p>Houses</p>
                                </div>
                                <div className='filter-opt-div'>
                                    <MdApartment className='filter-opt-icon' />
                                    <p>Apartments</p>
                                </div>
                                <div className='filter-opt-div'>
                                    <HiOutlineBuildingOffice2 className='filter-opt-icon' />
                                    <p>Offices</p>
                                </div>
                                <div className='filter-opt-div'>
                                    <LiaChartAreaSolid className='filter-opt-icon' />
                                    <p>Plot</p>
                                </div>
                                <div className='filter-opt-div'>
                                    <HiSpeakerphone className='filter-opt-icon' />
                                    <p>Commercial</p>
                                </div>
                            </div>
                        </div> */}

                        <Link href='/new-projects' id='main-search'>Search New Properties</Link>

                    </div>

                    <img id='main-pg-img' src="./np-img.jpg" />
                </div>
            </div>
        </>
    )
}
