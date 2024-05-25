import { Product } from "@/interface/global";
import prodouctdata from "@/data/masProduct.json";
import promotionData from "@/data/masPromotionList.json";

// Master API
export const getProductByFilter = async () => {
  try {
    return prodouctdata as unknown as Product[];
  } catch (error) {
    console.log("Error Fetching getProductByFilter :", error);
  }
};

export const getPromotionByCategory = async (category: string) => {
  try {
    var tempProdouctdata = promotionData;
    tempProdouctdata = tempProdouctdata.filter(
      (item: any) => item?.promotionGroupCategory === category
    );

    return tempProdouctdata;
  } catch (error) {
    console.log("Error Fetching getPromotion :", error);
  }
};
