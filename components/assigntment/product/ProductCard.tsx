"use client";

import React, { useEffect, useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import { Product } from "@/interface/global";
import TextField from "@mui/material/TextField";

interface ProductCardProps {
  data: Product;
  addSelectedProduct: any;
}

const ProductCard = ({ data, addSelectedProduct }: ProductCardProps) => {
  const [amount, setAmount] = useState<any>(1);

  const onChangeAmount = (value: any) => {
    setAmount(value);
  };
  //
  return (
    <div className="flex lg:basis-3/12 md:basis-4/12 sm:basis-6/12 basis-full">
      <div className="w-full h-[380px] m-4">
        <Card className="p-1 m-4 text-[14px]">
          <div className="h-[140px] flex justify-center items-center bg-[#F8F8F8]">
            <AccountBoxIcon sx={{ fontSize: 100 }} />
          </div>

          <div className="w-full flex flex-col items-center justify-center  p-4">
            <div className="flex flex-row w-full mb-4">
              <div className="flex basis-4/12">
                <span>ชื่อสินค้า : </span>
              </div>
              <div className="flex basis-8/12">
                <span>{data?.productNameLocal}</span>
              </div>
            </div>
            <div className="flex flex-row w-full mb-4">
              <div className="flex basis-4/12">
                <span>กลุ่มสินค้า : </span>
              </div>
              <div className="flex basis-8/12">
                <span>{data?.productGroupNameLocal}</span>
              </div>
            </div>
            <div className="flex flex-row w-full mb-4">
              <div className="flex basis-4/12">
                <span>ราคา : </span>
              </div>
              <div className="flex basis-8/12">
                <span>{data?.price}</span>
              </div>
            </div>

            <div className="flex flex-row w-full mb-4">
              <div className="flex basis-4/12">
                <span>จำนวน : </span>
              </div>
              <div className="flex basis-8/12">
                <TextField
                  type="number" //ad this line
                  label=""
                  value={amount}
                  InputProps={{ inputProps: { min: 1, max: 100 } }}
                  size="small"
                  onChange={(e) => onChangeAmount(e.target.value)}
                />
              </div>
            </div>

            <Button
              variant="contained"
              className="w-full"
              style={{ fontSize: 16 }}
              onClick={() => {
                addSelectedProduct(data, amount);
              }}
              size="small"
            >
              เลือก
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductCard;
