'use client';
import { useState } from 'react';
import Image from 'next/image';
import SideBar from '../Sidebar';
import toggleFilters from '../Sidebar';

export default function Filtericon() {
  return (
    <>
      <div className="filter-box">
        <button className="filter-button" onClick={toggleFilters}>
          <img className="filter-image" src="/filter.png" alt="filter image" />
        </button>
      </div>
    </>
  );
}
