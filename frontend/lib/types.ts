export interface ProductColor { n: string; c: string }
export interface ProductLook { case: string; bezel: string; dial: string; accent: string }

export interface Product {
  id: string;
  cat: string;        // 'mens' | 'womens' | 'luxury' | 'smart'
  type: string;       // 'classic' | 'smart'
  name: string;
  price: number;
  quality: string;
  stock: number;
  image: string;
  look: ProductLook;
  colors: ProductColor[];
}