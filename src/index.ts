import {
  ConsumerOptions,
  ConsumerResponse,
  createConsumer,
  PayloadHeaders
} from '@runhare/node'
import { NextApiRequest, NextApiResponse } from 'next'

const consumer = <T, K extends keyof T = keyof T>(
  events: (keyof T)[],
  sendKey: string,
  consumerHandler: (
    event: K,
    payload: T[K],
    headers: any
  ) => Promise<ConsumerResponse>,
  options?: ConsumerOptions
) => {
  const consumer = createConsumer<T>(sendKey, options)
  const handler = consumer.createHandler(events, consumerHandler)

  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      return res.json({ status: 'ok', stack: 'nextjs' })
    }

    const response = await handler(req.body, req.headers as PayloadHeaders)

    if (response.result === 'fail') {
      return res.status(500).send({ error: response.error })
    }

    return res.status(204).end()
  }
}

export default consumer
