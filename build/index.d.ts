import { ConsumerOptions, ConsumerResponse } from '@runhare/node';
import { NextApiRequest, NextApiResponse } from 'next';
declare const consumer: <T, K extends keyof T = keyof T>(events: (keyof T)[], sendKey: string, consumerHandler: (event: K, payload: T[K], headers: any) => Promise<ConsumerResponse>, options?: ConsumerOptions | undefined) => (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
export default consumer;
