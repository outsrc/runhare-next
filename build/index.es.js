import{createConsumer as r}from"@runhare/node";export default(t,e,s,a)=>{const n=r(e,a).createHandler(t,s);return async(r,t)=>{if("GET"===r.method)return t.json({status:"ok",stack:"nextjs"});const e=await n(r.body,r.headers);return"fail"===e.result?t.status(500).send({error:e.error}):t.status(204).end()}};
//# sourceMappingURL=index.es.js.map
