export interface OrderDetail {
    id?: string;
    orderId?: string;
    goodieId?: string;
    quantity: number;
    price: number;
  }

export interface OrdersAndDetails {
    id?: string;
    userId?: string;
    totalPrice: number;
    createdAt?: Date;
    orderDetails: OrderDetail[];
  }