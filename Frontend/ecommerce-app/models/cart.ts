import type { GoodieInCart } from "./goodie";

export interface Cart {
    totalPrice: number;
    content: GoodieInCart[];
}