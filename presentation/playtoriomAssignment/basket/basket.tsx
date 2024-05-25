"use client";

import React, { useEffect, useState } from "react";
import { Button, Card } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useAppDispatch } from "@/app/slices/hooks";
import ProductInbasket from "@/components/assigntment/product/ProductInbasket";
import { clearSelectedProductData } from "@/app/slices/productSlice";
import PreviewPriceCard from "@/components/assigntment/product/PreviewPriceCard";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
    <div className="w-full h-full " style={{ minHeight: "90vh" }}>
      <div className="w-full p-4">
        <div
          className="text-[#6495ED] text-[18px]  cursor-pointer"
          onClick={goback}
        >
          {"<"} ตะกร้าสินค้า
        </div>
      </div>

      <div className="flex flex-row " style={{ flexWrap: "wrap" }}>
        <div className="flex basis-8/12 p-4 ">
          {productDataList && productDataList?.length != 0 ? (
            <ProductInbasket
              productGroupList={productGroupList}
              productDataList={productDataList}
            />
          ) : (
            <Card className="w-full h-[400px]">
              <div className="w-full h-full flex flex-col justify-center items-center">
                <ErrorOutlineIcon sx={{ fontSize: 150 }} />
                <div className=" mt-4" style={{fontSize:30}}>ไม่มีรายการสินค้าในตระกร้า</div>
              </div>
            </Card>
          )}
        </div>
        <div className="flex basis-4/12 p-4">
          <div className="w-full h-fit">
            <PreviewPriceCard
              productGroupList={productGroupList}
              productDataList={productDataList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketClientPage;
