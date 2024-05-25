"use client";

import React, { useEffect, useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";

const ProductBasketRow = ({ data }: any) => {
  return (
    <div className="flex flex-row  text-[16px] ">
      <Card className="w-full p-1 m-2">
        <div className="flex flex-row items-center">
          <div className="flex basis-6/12 items-center">
            <AccountBoxIcon sx={{ fontSize: 50 }} />
            <span>{data?.product?.productNameLocal}</span>
          </div>
          <div className="flex basis-6/12 pr-4">
            <div className="flex flex-row w-full">
              <div className="flex basis-9/12">
                <span>ราคาต่อชิ้น : {data?.product?.price}</span>
              </div>
              <div className="flex basis-3/12">
                <span>จำนวน : {data?.amount}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductBasketRow;
