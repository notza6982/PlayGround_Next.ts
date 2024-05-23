
import { Product } from "@/interface/global";
import prodouctdata from "@/data/masProduct.json";









// Master API
export const getProductByFilter = async () => {
  try {
    return prodouctdata as unknown as Product[];
  } catch (error) {
    console.log("Error Fetching getProductByFilter :", error);
  }
};
