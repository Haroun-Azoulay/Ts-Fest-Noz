export interface Goodie {
    groupId: string,
    userId: string,
    goodieTypeId: string,
    name: string,
    quantity: number,
    price: number,
    available: boolean,
    path: string,
}

export interface GoodieType {
    id: string;
    name: string;
}

export interface GoodieInCart {
    goodieId: string;
    goodieTypeId: string;
    goodieGroupId: string;
    goodieName: string;
    goodiePrice: number;
    goodieQuantity: number;
    goodieImage: any;
}