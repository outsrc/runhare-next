"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@runhare/node");exports.default=(r,t,s,a)=>{const n=e.createConsumer(t,a).createHandler(r,s);return async(e,r)=>{const t=await n(e.body,e.headers);return"fail"===t.result?r.status(500).send({error:t.error}):r.status(204).end()}};
//# sourceMappingURL=index.js.map
