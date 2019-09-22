import {NetworkType} from 'orbs-client-sdk';

export class OrbsContractOpts {
    public virtualChainId: number;
    public serviceUrl: string;
    public networkType?: NetworkType;
    public contractName?: string;
    privateKey: Uint8Array;
    publicKey: Uint8Array;

    constructor(opts: any = {}) {
        this.virtualChainId = opts.virtualChainId;
        this.serviceUrl = opts.serviceUrl;
        this.networkType = opts.networkType;
        this.contractName = opts.contractName;
        this.privateKey = opts.privateKey;
        this.publicKey = opts.publicKey;
    }

}
