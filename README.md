# @runhare/next

Node wrapper for NextJS (https://nextjs.org/) based consumers of RunHare events.

## Create a Consumer

Inside your API folder create a new file.

```typescript
// 'src/pages/api/send-email.ts'
import consumer from '@runhare/next'

interface SendEmail {
  to: string
  subject: string
  content: string
}

interface DemoEvents {
  'send-email': SendEmail
}

export default consumer<RunHareEvents>(
  ['send-email'],
  process.env.CLIENT_SECRET,
  async (event, payload, headers) => {
    console.log(
      `Received Event: ${event} with payload: ${JSON.stringify(payload)}`
    )

    // TODO: Process event

    return { result: 'sucess' }
  }
)
```

### API Reference

Exported types

```typescript
import { ConsumerOptions, ConsumerResponse } from '@runhare/node'
import { NextApiRequest, NextApiResponse } from 'next'
declare const consumer: <T, K extends keyof T = keyof T>(
  events: (keyof T)[],
  sendKey: string,
  consumerHandler: (
    event: K,
    payload: T[K],
    headers: any
  ) => Promise<ConsumerResponse>,
  options?: ConsumerOptions | undefined
) => (req: NextApiRequest, res: NextApiResponse) => Promise<void>
export default consumer
```

`consumer<T>([events], sendKey, handler) -> nextApiHandler`

- **\[events\]** : Events this consumer will be processing.
- **sendKey** : Shared secret used to authenticate request
- **consumerHandler** : Async function that does the actual message processing.
- **options.rejectUnregisteredMessages** : If set, messages received not in the subscription list will be marked as failed (potentially retrying them)

### Using next-connect

next-connect (https://www.npmjs.com/package/next-connect) is a cool project to allow method routing on API routes on NextJS.

Make sure you use the helper functions `.use(...)` since the RunHare SDK for Nextjs handles both GET and POST requests (POST to consumer events, GET to get health and stack info)

```typescript
// 'src/pages/api/send-email.ts'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import consumer from '@runhare/next'

interface SendEmail {
  to: string
  subject: string
  content: string
}

interface DemoEvents {
  'send-email': SendEmail
}

export default nc<NextApiRequest, NextApiResponse>({
  onError: onErrorHandler
}).use(
  consumer<DemoEvents>(
    ['send-email'],
    process.env.CLIENT_SECRET,
    async (event, payload, headers) => {
      console.log(
        `Received Event: ${event} with payload: ${JSON.stringify(payload)}`
      )

      // TODO: Process event

      return { result: 'sucess' }
    }
  )
)
```
