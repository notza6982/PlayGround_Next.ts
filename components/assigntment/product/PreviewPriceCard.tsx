"use client";

import React, { useEffect, useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import AddCouponModal from "@/components/modal/AddCouponModal";
import TextField from "@mui/material/TextField";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";

const PreviewPriceCard = ({ productGroupList, productDataList }: any) => {
  const [sumPrice, setsumPrice] = useState<any>(0);
  const [totalPrice, setTotalPrice] = useState<any>(0);
  const [isOpenSelectCoupon, setIsOpenSelectCoupon] = useState<any>(false);
  const [isOpenSelectOnTop, setIsOpenSelectOnTop] = useState<any>(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>();
  const [selectedOnTop, setSelectedOnTop] = useState<any>();
  const [sumDiscount, setsumDiscount] = useState<any>(0);
  const [seasonDiscountValue, setseasonDiscountValue] = useState<any>({
    price: 500,
    amount: 50,
  });
  const [customerpoint, setCustomerpoint] = useState<any>(1000);
  const [customerMaxSelectPoint, setcustomerMaxSelectPoint] = useState<any>(0);
  const [selectedCustomerpoint, setSelectedCustomerpoint] = useState<any>(0);

  // set sum price bedore calculate discount
  useEffect(() => {
    var tempSumPrice = productDataList?.reduce(
      (accumulator: number, current: any) =>
        accumulator + current.amount * current.product.price,
      0
    );
    setsumPrice(tempSumPrice);
  }, [productDataList]);

  // set max select point
  useEffect(() => {
    if (sumPrice && sumPrice != 0) {
      var tempMaxSelectpoint = sumPrice * 0.2;

      if (tempMaxSelectpoint > customerpoint) {
        tempMaxSelectpoint = customerpoint;
      }

      setcustomerMaxSelectPoint(tempMaxSelectpoint);
    }
  }, [sumPrice, customerpoint]);

  // reset point when select onTop
  useEffect(() => {
    if (selectedOnTop) {
      setSelectedCustomerpoint(0);
    }
  }, [selectedOnTop]);

  // close all modal
  const onCloseModal = () => {
    setIsOpenSelectCoupon(false);
    setIsOpenSelectOnTop(false);
  };

  // set selected Coupon
  const setCurrentCoupon = (coupon: any) => {
    setSelectedCoupon(coupon);
    onCloseModal();
  };

  // set selected OnTop
  const setCurrentOpTop = (onTop: any) => {
    setSelectedOnTop(onTop);
    onCloseModal();
  };

  // calculate all discount
  useEffect(() => {
    var tempTotalPrice = sumPrice;
    var tempSumDiscount = 0;

    if (sumPrice != null && sumPrice != 0) {
      // coupon
      if (selectedCoupon) {
        tempSumDiscount += +couponDiscount(tempTotalPrice);
      }

      // on top
      if (
        selectedOnTop ||
        (selectedCustomerpoint && selectedCustomerpoint != 0)
      ) {
        tempSumDiscount += +onTopDiscount(tempTotalPrice);
      }

      // Seasonal
      if (seasonDiscountValue) {
        tempSumDiscount += +seasonalDiscount(tempTotalPrice);
      }
    }

    tempTotalPrice = tempTotalPrice - tempSumDiscount;

    setTotalPrice(tempTotalPrice);
    setsumDiscount(tempSumDiscount);
  }, [
    sumPrice,
    selectedCoupon,
    selectedOnTop,
    seasonDiscountValue,
    selectedCustomerpoint,
  ]);

  // calculate coupon section
  function couponDiscount(tempTotalPrice: any) {
    var tempSumDiscount = 0;
    switch (selectedCoupon?.promotionGroupCode) {
      // Fixed amount
      case "PROMOTION_GROUP_1":
        tempSumDiscount = selectedCoupon?.amount;
        break;
      // Percentage discount
      case "PROMOTION_GROUP_2":
        tempSumDiscount = (tempTotalPrice * selectedCoupon?.amount) / 100;
        break;
    }

    return tempSumDiscount;
  }

  // calculate onTop section
  function onTopDiscount(tempTotalPrice: any) {
    var tempSumDiscount = 0;
    if (selectedOnTop) {
      switch (selectedOnTop?.promotionGroupCode) {
        // Percentage discount by item category
        case "PROMOTION_GROUP_3":
          var tempSumPriceByCat = productDataList
            ?.filter(
              (itm: any) =>
                itm?.product?.productGroupCode ==
                selectedOnTop?.productGroupCode
            )
            ?.reduce(
              (accumulator: number, current: any) =>
                accumulator + current.amount * current.product.price,
              0
            );
          tempSumDiscount = (tempSumPriceByCat * selectedOnTop?.amount) / 100;
          break;
      }
    } else {
      // Discount by points
      tempSumDiscount = selectedCustomerpoint as number;
    }

    return tempSumDiscount;
  }

  // calculate season section
  function seasonalDiscount(tempTotalPrice: any) {
    var tempSumDiscount = 0;
    tempSumDiscount =
      Math.floor(tempTotalPrice / seasonDiscountValue?.price) *
      seasonDiscountValue?.amount;

    return tempSumDiscount;
  }

  const onChangeCustomerPoint = (value: any) => {
    if (value >= 0 && value <= customerMaxSelectPoint) {
      setSelectedCustomerpoint(value as number);
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full p-4 h-full rounded">
        <div className="flex justify-between mt-4 mb-4 text-[18px]">
          <span >รายการสินค้าทั้งหมด</span>
          <span>
            <span className="font-bold">
              {productDataList && productDataList?.reduce(
                (accumulator: number, current: any) =>
                  accumulator + current.amount,
                0
              )}
            </span>{" "}
            รายการ
          </span>
        </div>

        <div className="w-full border-b-2 mt-4 border-[#E4E7EC] mb-4" />
        <Card className="w-full px-4 py-2 flex justify-between mb-4 h-[50px] items-center  bg-[#F8F8F8]">
          {selectedCoupon ? (
            <Chip
              label={selectedCoupon?.promotionNameLocal}
              variant="outlined"
              onDelete={() => setSelectedCoupon(null)}
              className="text-[#097969] border-[#097969] bg-white"
            />
          ) : (
            <span />
          )}

          <span
            className="text-[#6495ED] text-[14px]  cursor-pointer"
            onClick={() => setIsOpenSelectCoupon(true)}
          >
            เลือกคูปอง {">"}
          </span>
        </Card>

        <Card className="w-full px-4 py-2 flex justify-between mb-4 h-[50px] items-center bg-[#F8F8F8]">
          {selectedOnTop ? (
            <Chip
              label={selectedOnTop?.promotionNameLocal}
              variant="outlined"
              onDelete={() => setSelectedOnTop(null)}
              className="text-[#097969] border-[#097969] bg-white"
            />
          ) : (
            <span />
          )}

          <span
            className="text-[#6495ED] text-[14px]  cursor-pointer"
            onClick={() => setIsOpenSelectOnTop(true)}
          >
            เลือกคูปองพิเศษ {">"}
          </span>
        </Card>

        <Card className="p-4">
          <div className="flex flex-row w-full ">
            <div className="flex basis-8/12">
              <div className="flex flex-row w-full ">
                <div className="flex basis-3/12 items-center ">
                  <FlutterDashIcon sx={{ fontSize: 40 }} />
                </div>
                <div className="flex basis-9/12 flex-col">
                  <div className=" text-[16px] font-bold ">Customer point</div>
                  <div className="text-[#818589] text-[13px] ">
                    1 คะแนน = 1 บาท
                  </div>
                </div>
              </div>
            </div>
            <div className="flex basis-4/12 justify-end">
              <div className="flex flex-col">
                <TextField
                  type="number"
                  label="คะแนน"
                  value={selectedCustomerpoint}
                  size="small"
                  onChange={(e) => onChangeCustomerPoint(e.target.value)}
                  disabled={selectedOnTop}
                />
                <div className="text-[#818589] text-[13px] flex justify-end mt-1">
                  สูงสุด {customerMaxSelectPoint} คะแนน
                </div>
              </div>
            </div>
          </div>

          <div className=" text-[#6495ED] text-[12px] mt-4">
            คะแนน Customer point ของคุณ :{" "}
            <span className="font-bold"> {customerpoint} คะแนน</span>
          </div>

          <div className="w-full border-b-2 mt-4 border-[#E4E7EC] mb-2" />
          <div className="text-[#ff0000] text-[12px]">
            หมายเหตุ : สามารถใช้แต้มลดได้สูงสุด 20% ของราคาเท่านั้น
            และหลังจากเลือกคูปองพิเศษแล้วจะไม่สามารถใช้แต้มเป็นส่วนลดได้
          </div>
        </Card>

        <Card className="p-4 mt-4">
          <div className="flex justify-between mb-4">
            <div className="flex flex-col">
              ราคา
              {seasonDiscountValue && (
                <span className="text-[#6495ED] text-[12px]">
                  ยอดรวมทุกๆ {seasonDiscountValue?.price} บาท ลด{" "}
                  {seasonDiscountValue?.amount} บาท
                </span>
              )}
            </div>

            <span>
              <span className="font-bold">{sumPrice}</span> บาท
            </span>
          </div>

          <div className="flex justify-between mb-4 ">
            <span>ส่วนลดรวม</span>

            <span className="text-[#ff0000]">
              <span className="font-bold">{sumDiscount}</span>
              <span> บาท</span>
            </span>
          </div>

          <div className="w-full border-b-2 mt-4 border-[#E4E7EC] mb-2" />

          <div className="flex justify-between mb-1">
            <span>รวม</span>

            <span>
              <span className="font-bold">{totalPrice < 0 ? 0 : totalPrice}</span> บาท
            </span>
          </div>
        </Card>
      </Card>

      <AddCouponModal
        isOpen={isOpenSelectCoupon}
        onClose={onCloseModal}
        selectedCoupon={selectedCoupon}
        setSelectedCoupon={setCurrentCoupon}
        category={"Coupon"}
      />

      <AddCouponModal
        isOpen={isOpenSelectOnTop}
        onClose={onCloseModal}
        selectedCoupon={selectedOnTop}
        setSelectedCoupon={setCurrentOpTop}
        category={"OnTop"}
      />
    </div>
  );
};

export default PreviewPriceCard;
