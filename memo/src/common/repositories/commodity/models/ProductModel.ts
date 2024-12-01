export interface ProductModel {
    createdAt: string; // UTC date string
    name: string;
    photo: string; // url
    price: string; // price in .00 format (decimal)
    currency: string;
    description: string;
    id: string;
}