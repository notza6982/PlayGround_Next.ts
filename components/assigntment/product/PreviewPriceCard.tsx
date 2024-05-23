"use client";

import React, { useEffect, useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";

const PreviewPriceCard = ({ productGroupList, productDataList }: any) => {
  const [sumPrice, setsumPrice] = useState<any>(0);

  useEffect(() => {
    var tempSumPrice = productDataList?.reduce(
      (accumulator: number, current: any) =>
        accumulator + current.amount * current.product.price,
      0
    );
    setsumPrice(tempSumPrice);
  }, [productDataList]);

  return (
    <div className="w-full">
      <Card className="w-full p-4 h-full">
        <Button
          variant="contained"
          style={{ marginRight: 27, marginTop: 15 }}
          className="w-full"
        >
          <span style={{ fontSize: 20, marginRight: 5 }}>ส่วนลด</span>
        </Button>

        <div>
          รายการสินค้าทั้งหมด{" "}
          {productDataList?.reduce(
            (accumulator: number, current: any) => accumulator + current.amount,
            0
          )}{" "}
          รายการ
        </div>

        <div>รวม {sumPrice} บาท</div>

        <Button
          variant="contained"
          style={{ marginRight: 27, marginTop: 15 }}
          className="w-full"
        >
          <span style={{ fontSize: 20, marginRight: 5 }}>ซื้อสินค้า</span>
        </Button>
      </Card>
    </div>
  );
};

export default PreviewPriceCard;
