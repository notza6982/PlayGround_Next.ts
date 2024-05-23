"use client";

import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();

  function goToBuyProduct() {
    router.push("/addProduct");
  }

  return (
    <div className="w-full h-screen ml-auto mr-auto">
      <div className="w-full h-full flex items-center justify-center">
        <Button
          variant="contained"
          style={{ fontSize: 30 }}
          onClick={goToBuyProduct}
        >
          เลือกซื้อสินค้า
        </Button>
      </div>
    </div>
  );
}
