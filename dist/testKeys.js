"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UtilsSecu_1 = require("./UtilsSecu");
// BOf5u8FgRaUCe8h3oESxOiksanNEDi6T0AuL9qRRIZs='
// jgffnFDGijg654FGHdeamlkdfj8egsglkhjBrfohg
// import * as crypto from  'crypto-js';
// var key:string = "rerererer" ;
// var date:number = Date.now() ;
// if(rq.headers.keyDate){
//     date = new Date(rq.headers.keyDate).valueOf() ;
// }else{
//     rq.headers.keyDate = date ;
// }
// console.log(rq.url) ;
// var url = encodeURI(rq.url.trim().toLowerCase().replace(/\/\/+/gi, '/').replace(/^([a-z]+):\/+/, "$1://"));
//     var key:string = crypto.HmacSHA256( date + url , key).toString()
// rq.headers.key = key
var utilSecu = new UtilsSecu_1.UtilsSecu({ conf: { secretKey: "poipoi", urlBase: 'https://bdd-preprod_demo.hiji.fr/' } });
var rq = {
    url: "https://bdd-preprod_demo.hiji.fr/collection/enseigne/name/groupe barrière/=/",
    headers: {
        keyDate: Date.now(),
    }
};
utilSecu.addHeadersKey(rq);
console.log(rq.headers.keyDate);
console.log(rq.headers.key);
rq.originalUrl = '/collection/enseigne/name/groupe barrière/=/';
rq.ctx = {};
utilSecu.testkey(rq);
console.log(rq);
// request.get(rq).then(null
//     (val)=>{
//         console.log(val) ;
//     }
// )
//# sourceMappingURL=testKeys.js.map