export interface ICard {
    idCard?: number,
    methodPayment: string,
    cardNumber: string,
    nameCard: string,
    expiredDate: string,
    cvv: number,
    createdAt?: string,
    idUser?: number
}

export interface ISingleCard {
    card: ICard
}

export interface IListCard {
    cards: ICard[]
}

