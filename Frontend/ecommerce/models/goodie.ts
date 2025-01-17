export interface Goodie {
    goodieName: string;
    goodieDescription: string;
    goodieTypeId: string;
    goodiePrice: number;
    goodieQuantity: number;
    goodieAvailable: boolean;
    goodieImage: any;
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