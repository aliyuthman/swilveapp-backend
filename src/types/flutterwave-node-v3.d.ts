declare module 'flutterwave-node-v3' {
    export class Flutterwave {
        constructor(publicKey: string, secretKey: string);
        Transaction: {
            charge(params: {
                tx_ref: string;
                amount: number;
                currency: string;
                customer: { email: string };
            }): Promise<any>;
        };
    }
} 