import React, { useEffect, useState } from "react";
import Modal from "@/components/modal/modal";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Card } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { getPromotionByCategory } from "@/app/(api)/api/playtoriumAsgApi";
import DiscountIcon from "@mui/icons-material/Discount";

interface CouponProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCoupon: any;
  setSelectedCoupon: any;
  category: any;
}

const AddCouponModal: React.FC<CouponProps> = ({
  isOpen,
  onClose,
  selectedCoupon,
  setSelectedCoupon,
  category,
}) => {
  const [tempSelectedCoupon, setTempSelectedCoupon] = useState<any>();
  const [promotionList, setPromotionList] = useState<any>();

  const handleChange = (event: SelectChangeEvent) => {
    setTempSelectedCoupon(event.target.value as any);
  };

  useEffect(() => {
    let promotioData = getPromotionByCategory(category);
    promotioData
      .then((response) => {
        setPromotionList(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onCloseWithOutAction = () => {
    setTempSelectedCoupon(selectedCoupon?.promotionCode);
    onClose();
  };

  const confirmCoupon = () => {
    setSelectedCoupon(
      ...promotionList.filter(
        (item: any) => item?.promotionCode === tempSelectedCoupon
      )
    );
    onClose();
  };

  const modalHeader = (
    <div className="flex flex-row items-center justify-between">
      <Dialog.Title className="text-[16px] font-semibold text-[#344054]">
        <div className="flex flex-row">เลือกคูปอง</div>
      </Dialog.Title>
      <button
        type="button"
        className="inline-flex justify-center rounded-md px-4 py-2"
        onClick={onCloseWithOutAction}
      >
        <CloseIcon />
      </button>
    </div>
  );

  const modalBody = (
    <div className="w-full h-[400px]">
      <div className="flex flex-col">
        <div className="w-full h-[320px] max-h-[320px] overflow-y-scroll">
          <FormControl className="w-full">
            <RadioGroup
              className="w-full flex-nowrap"
              value={tempSelectedCoupon}
              onChange={handleChange}
            >
              {promotionList?.map((itm: any, index: number) => {
                return (
                  <Card className="w-[98%] p-4 mb-4">
                    <FormControlLabel
                      value={itm?.promotionCode}
                      control={<Radio />}
                      label={
                        <div>
                          <DiscountIcon />
                          <span className="ml-2">{itm?.promotionNameLocal}</span> 
                        </div>
                      }
                      className=" w-full"
                    />
                  </Card>
                );
              })}
            </RadioGroup>
          </FormControl>
        </div>
        <div className="mt-8 ">
          <Button
            variant="contained"
            className="w-full"
            onClick={confirmCoupon}
          >
            <span style={{ fontSize: 16 }}>ยืนยัน</span>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      width={348}
      isOpen={isOpen}
      body={modalBody}
      onClose={onCloseWithOutAction}
      defaultHeader={false}
      header={modalHeader}
      borderRadius={8}
      isDividerHeader={true}
    />
  );
};

export default AddCouponModal;
