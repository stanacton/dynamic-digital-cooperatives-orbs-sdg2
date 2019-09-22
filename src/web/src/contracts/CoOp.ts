import {Participant} from '@/contracts/Participant';

export class CoOp {
    Name: string;
    Participants: Participant[];
    Commodity: string;
    ID?: string;

    constructor(item: any = {}) {
        this.Participants = item.Participants || [];
        this.Name = item.Name;
        this.Commodity = item.Commodity;
        this.ID = item.ID;
    }

    totalCommited(): number {
        let total = 0;
        for (const p of this.Participants) {
            total += p.Quantity;
        }

        return total;
    }
}
