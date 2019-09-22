import {Client} from 'orbs-client-sdk';
import {OrbsContractOpts} from '@/contracts/OrbsContractOpts';
import {RunQueryResponse} from 'orbs-client-sdk/dist/codec/OpRunQuery';
import {SendTransactionResponse} from 'orbs-client-sdk/dist/codec/OpSendTransaction';

export default class OrbsContract {
    public contractName: string;
    public client: Client;
    public publicKey: Uint8Array;
    public privateKey: Uint8Array;

    constructor(opts: OrbsContractOpts) {
        if (!opts.serviceUrl) {
            throw new Error('serviceUrl is required');
        }
        if (!opts.networkType) {
            throw new Error('networkType is required');
        }

        this.privateKey = opts.privateKey;
        this.publicKey = opts.publicKey;

        this.client = new Client(opts.serviceUrl,
            opts.virtualChainId,
            opts.networkType);
    }

    sendQuery(contractName: string, methodName: string, inputArguments: any[] = []): Promise<RunQueryResponse> {
        return new Promise<RunQueryResponse>(async (resolve, reject) => {
            try {
                const query = this.client.createQuery(this.publicKey, contractName, methodName, inputArguments);
                const resp = await this.client.sendQuery(query);
                resolve(resp);
            } catch (e) {
                reject(e);
            }
        });
    }

    sendTransaction(contractName: string, methodName: string, inputArguments: any[] = []):
        Promise<SendTransactionResponse> {
        return new Promise<SendTransactionResponse>(async (resolve, reject) => {
            try {
                const [tx] = this.client.createTransaction(
                    this.publicKey,
                    this.privateKey,
                    contractName,
                    methodName,
                    inputArguments);

                const response = await this.client.sendTransaction(tx);
                resolve(response);
            } catch (e) {
                reject(e);
            }
        });
    }

    createSlug(input: string): string {
        if (!input) {
            return '';
        }
        const regEx = /[^A-Za-z0-9.]+/g;
        input = input.toLowerCase();
        return input.replace(regEx, '-');
    }
}
