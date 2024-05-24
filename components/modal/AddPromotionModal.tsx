import React, { useEffect, useState } from "react";
import Modal from "@/components/modal/modal";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";

interface PromotionProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPromotionModal: React.FC<PromotionProps> = ({ isOpen, onClose }) => {
  const [selectedPromotion, setSelectedPromotion] = useState<any>();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPromotion(event.target.value as string);
  };

  const modalHeader = (
    <div className="flex flex-row items-center justify-between">
      <Dialog.Title className="text-[16px] font-semibold text-[#344054]">
        <div className="flex flex-row">เลือกโปรโมชั่น</div>
      </Dialog.Title>
      <button
        type="button"
        className="inline-flex justify-center rounded-md px-4 py-2"
        onClick={onClose}
      >
        <CloseIcon />
      </button>
    </div>
  );

  const modalBody = (
    <div className="w-full h-[400px]">
      <div className="flex flex-col">
        <div className="flex flex-row mb-4">
          <span className="text-[#344054] text-[16px] font-light">
            เลือกโปรโมชั่น
          </span>
        </div>

        <Select
          className="w-full mb-4"
          value={selectedPromotion}
          onChange={handleChange}
          MenuProps={{
            style: { zIndex: 10000 },
          }}
          size="small"
        >
          <MenuItem value={"PROMOTION_GROUP_1"}>Fixed amount</MenuItem>
          <MenuItem value={"PROMOTION_GROUP_2"}>Percentage discount</MenuItem>
          <MenuItem value={"PROMOTION_GROUP_3"}>
            Percentage discountbyitem category
          </MenuItem>
          <MenuItem value={"PROMOTION_GROUP_4"}>Discount by points</MenuItem>
          <MenuItem value={"PROMOTION_GROUP_5"}>Special campaigns</MenuItem>
        </Select>






        
        <div className="mt-4 ">
          <Button variant="contained" className="w-full">
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
      onClose={onClose}
      defaultHeader={false}
      header={modalHeader}
      borderRadius={8}
      isDividerHeader={true}
    />
  );
};

export default AddPromotionModal;
