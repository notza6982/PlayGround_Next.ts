"use client";

import React, { useEffect } from 'react'

const MainLayout = async ({
    children
  }: {
    children: React.ReactNode | null;
  }) => {

  return (
    <div className="h-full bg-white">
        {/* <div className="flex h-[50px] w-full z-[10000] flex-col fixed inset-y-0 ">
            <div>Header section</div>
        </div> */}
        {/* <div className='ml-auto mr-auto w-full lg:w-[800px] mt-[48px] lg:mt-[80px] overflow-y-hidden'>
            {children}
        </div> */}
        <div className='ml-auto mr-auto w-full overflow-y-hidden'>
            {children}
        </div>
    </div>
  )
}
export default MainLayout;