import{createConsumer as r}from"@runhare/node";export default(e,t,a,n)=>{const s=r(t,n).createHandler(e,a);return async(r,e)=>{const t=await s(r.body,r.headers);return"fail"===t.result?e.status(500).send({error:t.error}):e.status(204).end()}};
//# sourceMappingURL=index.es.js.map
