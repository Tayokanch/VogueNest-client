export interface ProductI {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  bestseller: boolean;
  date: number;
  __v: number;
}

export interface ProductItemI {
  id: string;
  image: string[];
  name: string;
  price: number;
}

export interface FormData {
  name: string;
  password: string;
  email: string
}

export interface LoginData extends Omit< FormData,'name'>{
  [x: string]: SetStateAction<Boolean>;
};
