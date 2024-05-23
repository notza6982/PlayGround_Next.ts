"use client";

import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProductBasketRow from "./ProductBasketRow";

const ProductInbasket = ({ productGroupList,productDataList }: any) => {
  
  return (
    <div className="w-full ">
      {productGroupList?.map((itm: any, index: number) => {
        return (
          <Accordion
            className="mt-4 border-2 rounded-lg border-[#0BB9B2]"
            key={itm?.productGroupCode}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className="flex justify-between w-full pr-2">
                <span className="flex items-center text-[#0BB9B2] text-[24px]">
                  {itm?.productGroupNameLocal}
                </span>
                <span className="flex items-center text-[#344054] text-[24px]  font-semibold">
                  <span className="text-[24px] mr-2">
                    {productDataList
                      ?.filter(
                        (productData: any) =>
                          productData?.product?.productGroupCode ===
                          itm?.productGroupCode
                      )
                      ?.reduce(
                        (accumulator: number, current: any) =>
                          accumulator + current.amount,
                        0
                      )}
                  </span>
                  <span className="text-[18px] ">รายการ</span>
                </span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="w-full border-b-2 border-[#E4E7EC]" />
              <div className="w-full">
                {productDataList
                  ?.filter(
                    (productData: any) =>
                      productData?.product?.productGroupCode ===
                      itm?.productGroupCode
                  )
                  ?.map((productData: any) => {
                    return <ProductBasketRow data={productData} />;
                  })}
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default ProductInbasket;
