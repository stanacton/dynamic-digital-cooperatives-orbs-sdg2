import OrbsContract from '@/contracts/OrbsContract';
import {OrbsContractOpts} from '@/contracts';
import {argString} from 'orbs-client-sdk';
import {Crop} from '@/contracts/Crop';

export default class Crops extends OrbsContract {
    constructor(opts: OrbsContractOpts) {
        super(opts);
    }

    async get(id: string, userId: string): Promise<Crop> {
        return new Promise<Crop>(async (resolve, reject) => {
            try {
                const { outputArguments } = await this.sendQuery('Crops', 'get', [argString(userId), argString(id)]);
                if (outputArguments.length === 0 || !outputArguments[0].value) {
                    reject();
                }
                resolve(JSON.parse(outputArguments[0].value.toString()));
            } catch (e) {
                reject(e);
            }
        });
    }

    async write(crop: Crop, userId: string): Promise<any> {
        return new Promise<Crop>(async (resolve, reject) => {
            try {
                if (!crop.ID || crop.ID === '') {
                    crop.ID = this.createSlug(crop.Name);
                }

                await this.sendTransaction('Crops', 'write', [argString(userId), argString(JSON.stringify(crop))]);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    async remove(id: string, userId: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                await this.sendTransaction('Crops', 'remove', [argString(userId), argString(JSON.stringify(id))]);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    async list(userId: string): Promise<Crop[]> {
        return new Promise<Crop[]>(async (resolve, reject) => {
            try {
                const { outputArguments } = await this.sendQuery('Crops', 'list', [argString(userId)]);

                if (!outputArguments || outputArguments.length === 0) {
                    return resolve([]);
                }
                const crops = JSON.parse(outputArguments[0].value.toString());
                resolve(crops);
            } catch (e) {
                reject(e);
            }
        });
    }
}
