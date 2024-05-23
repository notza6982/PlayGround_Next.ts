export interface Product {
  productCode?: string;
  productNameLocal?: string;
  productGroupCode?: string;
  productGroupNameLocal?: string;
  price?: number;
}

export interface SelectedProduct {
  product?: Product;
  amount?: number;
}
