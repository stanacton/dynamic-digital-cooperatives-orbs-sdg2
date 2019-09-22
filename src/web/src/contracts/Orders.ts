import OrbsContract from '@/contracts/OrbsContract';
import {OrbsContractOpts} from '@/contracts';
import {argString} from 'orbs-client-sdk';
import {Order} from '@/contracts/Order';

// TypeScript version of the following: https://github.com/orbs-network/orbs-starter-kit/blob/master/src/Counter.js
export default class Orders extends OrbsContract {
    constructor(opts: OrbsContractOpts) {
        super(opts);
    }

    async get(id: string): Promise<Order> {
        return new Promise<Order>(async (resolve, reject) => {
            try {
                const { outputArguments } = await this.sendQuery('Orders', 'get', [argString(id)]);
                if (outputArguments.length === 0 || !outputArguments[0].value) {
                    reject();
                }
                resolve(JSON.parse(outputArguments[0].value.toString()));
            } catch (e) {
                reject(e);
            }
        });
    }

    async write(coop: Order): Promise<any> {
        return new Promise<Order>(async (resolve, reject) => {
            try {
                if (!coop.ID || coop.ID === '') {
                    coop.ID = this.createSlug(coop.Commodity);
                }

                await this.sendTransaction('Orders', 'write', [argString(JSON.stringify(coop))]);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    async remove(id: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                await this.sendTransaction('Orders', 'remove', [argString(JSON.stringify(id))]);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    async list(): Promise<Order[]> {
        return new Promise<Order[]>(async (resolve, reject) => {
            try {
                const { outputArguments } = await this.sendQuery('Orders', 'list');

                if (!outputArguments || outputArguments.length === 0) {
                    return resolve([]);
                }
                const coopDict = JSON.parse(outputArguments[0].value.toString());
                const cl = [];
                for (const key in coopDict) {
                    cl.push(coopDict[key]);
                }

                resolve(coopDict || []);
            } catch (e) {
                reject(e);
            }
        });
    }

    async listAsDict(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const { outputArguments } = await this.sendQuery('Orders', 'list');

                if (!outputArguments || outputArguments.length === 0) {
                    return resolve([]);
                }
                const coopDict = JSON.parse(outputArguments[0].value.toString());
                resolve(coopDict || {});
            } catch (e) {
                reject(e);
            }
        });
    }
}
