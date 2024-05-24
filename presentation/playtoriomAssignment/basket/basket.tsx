"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useAppDispatch } from "@/app/slices/hooks";
import ProductInbasket from "@/components/assigntment/product/ProductInbasket";
import { clearSelectedProductData } from "@/app/slices/productSlice";
import PreviewPriceCard from "@/components/assigntment/product/PreviewPriceCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const BasketClientPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const selectedProductData = useSelector((state: RootState) => state.product);
  const [selectedProductList, setSelectedProductList] = useState<any>([]);
  const [productGroupList, setProductGroupList] = useState<any>([]);
  const [productDataList, setProductDataList] = useState<any>([]);

  useEffect(() => {
    if (selectedProductList) {
      const productGroupList: any = [];
      for (var i = 0; i < selectedProductList?.length; i++) {
        var isDup = false;
        for (var j = 0; j < productGroupList.length; j++) {
          if (
            productGroupList[j]?.productGroupCode ==
            selectedProductList[i]?.product?.productGroupCode
          ) {
            isDup = true;
            break;
          }
        }
        if (!isDup) {
          productGroupList.push({
            productGroupCode: selectedProductList[i]?.product?.productGroupCode,
            productGroupNameLocal:
              selectedProductList[i]?.product?.productGroupNameLocal,
          });
        }
      }
      setProductGroupList(productGroupList);
      setProductDataList(selectedProductList);
    }
  }, [selectedProductList]);

  function goback() {
    dispatch(clearSelectedProductData());
    router.push("/addProduct");
  }

  useEffect(() => {
    setSelectedProductList(selectedProductData);
  }, [selectedProductData]);

  return (
    <div
      className="w-full h-full ml-auto mr-auto"
      style={{ minHeight: "90vh" }}
    >
      <div className="w-full m-4">
        <div className="flex flex-row items-center cursor-pointer" onClick={goback}>
          <ArrowBackIosIcon sx={{ color: "#0BB9B2" }} />
          <span className="flex justify-center items-center text-[#0BB9B2] text-[14px] font-bold">
            ตะกร้าสินค้า
          </span>
        </div>
      </div>

      <div className="flex flex-row" style={{ flexWrap: "wrap" }}>
        <div className="flex p-4" style={{ flexBasis: "66.666667%" }}>
          <ProductInbasket
            productGroupList={productGroupList}
            productDataList={productDataList}
          />
        </div>
        <div
          className="flex basis-4/12 p-4"
          style={{ flexBasis: "33.333333%" }}
        >
          <div className="w-full h-fit">
            <PreviewPriceCard
              productGroupList={productGroupList}
              productDataList={productDataList}
            />
          </div>
        </div>
      </div>

      {/* 
      <div className="w-full flex flex-row" style={{ flexWrap: "wrap" }}>
        <div className="flex basis-8/12 p-4">
          <div className="w-full">
            <ProductInbasket
              productGroupList={productGroupList}
              productDataList={productDataList}
            />
          </div>
        </div>
        <div className="flex basis-4/12 p-4">
          <div className="w-full h-fit">
            <PreviewPriceCard
              productGroupList={productGroupList}
              productDataList={productDataList}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BasketClientPage;
