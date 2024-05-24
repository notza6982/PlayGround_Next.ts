"use client";

import React, { useEffect, useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import AddPromotionModal from "@/components/modal/AddPromotionModal";

const PreviewPriceCard = ({ productGroupList, productDataList }: any) => {
  const [sumPrice, setsumPrice] = useState<any>(0);
  const [isOpenSelectPromotion, setIsOpenSelectPromotion] = useState<any>(false);

  useEffect(() => {
    var tempSumPrice = productDataList?.reduce(
      (accumulator: number, current: any) =>
        accumulator + current.amount * current.product.price,
      0
    );
    setsumPrice(tempSumPrice);
  }, [productDataList]);

  const addPromotion = () => {
    setIsOpenSelectPromotion(true)
  };

  const onCloseModal = () => {
    setIsOpenSelectPromotion(false)
  };

  return (
    <div className="w-full">
      <Card className="w-full p-4 h-full rounded">
        <div className="flex justify-between mt-4 mb-1">
          <span>รายการสินค้าทั้งหมด</span>

          <span>
            {productDataList?.reduce(
              (accumulator: number, current: any) =>
                accumulator + current.amount,
              0
            )}{" "}
            รายการ
          </span>
        </div>

        <div className="flex justify-between mb-1">
          <span>ส่วนลด</span>

          <span>{0} บาท</span>
        </div>
        <Chip
          icon={<AddIcon />}
          label="เพิ่มส่วนลด"
          variant="outlined"
          onClick={addPromotion}
        />

        <div className="flex justify-between mb-1 mt-12">
          <span>รวม</span>

          <span>{sumPrice} บาท</span>
        </div>
{/* 
        <Button
          variant="contained"
          style={{ marginRight: 27, marginTop: 15 }}
          className="w-full"
        >
          <span style={{ fontSize: 20, marginRight: 5 }}>ซื้อสินค้า</span>
        </Button> */}
      </Card>

      <AddPromotionModal 
      isOpen={isOpenSelectPromotion}
      onClose={onCloseModal}
      />
    </div>
  );
};

export default PreviewPriceCard;
