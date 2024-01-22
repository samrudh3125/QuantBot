const request = require("request");
const crypto = require("crypto");
const baseurl="https://api.coindcx.com";

const key='';
const secret='';


export const createOrder=(side:"buy"|"sell",market:string,price:number,quantity:number,clientOrderId:string)=>{
    return new Promise<void>((resolve)=>{
        const body={
            side,
            "order_type":"limit_order",
            market,
            "price_per_unit":price,
            "total_quantity":quantity,
            "timestamp":Math.floor(Date.now()),
            "client_order_id":clientOrderId
        }
        const payload=new Buffer(JSON.stringify(body)).toString();
        const signature=crypto.createHmac('sha256',secret).update(payload).digest('hex');
    
        const options={
            url: baseurl+"/exchange/v1/orders/create",
            headers:{
                'X_AUTH_KEY':key,
                'X_AUTH_SIGNATURE':signature
            },
            body:body,
            json:true
        }
        request.post(options,function(err,response,body){
            if(err){
                console.log("error while placing the order");
            }
            else{
                console.log(body);
            }
        })
        resolve();
    })
}

export const cancelAll=(side:"buy"|"sell",market:string)=>{
    return new Promise<void>((resolve)=>{
        const body={
            side,
            market,
            "timestamp":Math.floor(Date.now())
        }
        const payload=new Buffer(JSON.stringify(body)).toString();
        const signature=crypto.createHmac('sha256',secret).update(payload).digest('hex');
    
        const options={
            url: baseurl+"/exchange/v1/orders/cancel_all",
            headers:{
                'X_AUTH_KEY':key,
                'X_AUTH_SIGNATURE':signature
            },
            body:body,
            json:true
        }
    
        request.post(options,function(err,response,body){
            if(err){
                console.log("error while cancelling the order");
            }
            else{
                console.log(body);
            }
        })
        resolve();
    })
}
