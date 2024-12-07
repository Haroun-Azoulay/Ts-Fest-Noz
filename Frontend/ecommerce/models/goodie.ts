export interface Goodie {
    goodieName: string;
    goodieTypeId: string;
    goodiePrice: string;
    goodieQuantity: string;
    goodieAvailable: boolean;
    goodieImage: any;
}

export interface GoodieType {
    id: string;
    name: string;
}