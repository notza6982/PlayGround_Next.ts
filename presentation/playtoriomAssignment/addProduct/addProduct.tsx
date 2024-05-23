"use client";

import React, { useEffect, useState } from "react";
import { getProductByFilter } from "@/app/(api)/api/playtoriumAsgApi";
import ProductCard from "@/components/assigntment/product/ProductCard";
import { Product, SelectedProduct } from "@/interface/global";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Button } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/slices/hooks";
import {
  setProductData,
  clearSelectedProductData,
} from "@/app/slices/productSlice";

const AddProductClientPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [productDataList, setProductDataList] = useState<Product[] | undefined>(
    []
  );

  const [selectedProductList, setSelectedProductList] = useState<
    SelectedProduct[] | undefined
  >([]);

  useEffect(() => {
    dispatch(clearSelectedProductData());
    let productData = getProductByFilter();

    productData
      .then((response) => {
        setProductDataList(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(productData);
  }, []);

  const addSelectedProduct = (selectedProduct: Product,amount : number) => {
    // romve selected product from add list
    var tempProductDataList = productDataList;
    tempProductDataList = tempProductDataList?.filter(
      (e) => e.productCode !== selectedProduct.productCode
    );
    setProductDataList(tempProductDataList);

    // add product to selected list
    var tempSelectedProductList = selectedProductList;
    const tempSelectedProduct: SelectedProduct = {
      product: selectedProduct,
      amount: Number(amount),
    };

    tempSelectedProductList?.push(tempSelectedProduct);
    setSelectedProductList(tempSelectedProductList);
  };

  function goToPay() {
    dispatch(setProductData(selectedProductList));
    router.push("/basket");
  }

  return (
    <div
      className="w-full h-full ml-auto mr-auto"
      style={{ minHeight: "90vh" }}
    >
      <div className="w-full flex" style={{ justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={goToPay}
          style={{ marginRight: 27, marginTop: 15 }}
        >
          <span style={{ fontSize: 30, marginRight: 5 }}>ตะกร้าสินค้า</span>
          <Badge
            badgeContent={selectedProductList ? selectedProductList.length : 0}
            color="error"
          >
            <ShoppingBasketIcon sx={{ fontSize: 30 }} />
          </Badge>
        </Button>
      </div>

      <div className="w-full flex" style={{ flexWrap: "wrap" }}>
        {productDataList && productDataList.length > 0 ? (
          productDataList?.map((itm: Product, index: number) => {
            return (
              <ProductCard
                key={itm?.productCode}
                data={itm}
                addSelectedProduct={addSelectedProduct}
              />
            );
          })
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ marginTop: "4rem" }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 150 }} />
            <span style={{ fontSize: 40 }}>ไม่มีรายการสินค้าให้เลือก</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductClientPage;
