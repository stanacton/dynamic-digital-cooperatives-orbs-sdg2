export class Participant {
    Name: string;
    Quantity: number;
    Unit: string;
    QuantityDesc: string;
    MinPrice: number;

    constructor(item: any = {}) {
        this.Name = item.Name;
        this.Quantity = item.Quantity;
        this.Unit = item.Unit;
        this.QuantityDesc = item.QuantityDesc;
        this.MinPrice = item.MinPrice;
    }
}
