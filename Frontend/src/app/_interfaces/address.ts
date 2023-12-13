
export interface IAddress {
    idAddress?: number,
    typeAddress: string,
    country: string,
    city: string,
    street: string,
    postalCode: number,
    createdAt?: string,
    idUser?: number
}

export interface ISingleAddress {
    address: IAddress
}

export interface IListAddress {
    cards: IAddress[]
}


