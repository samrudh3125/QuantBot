export class DepthManager{
    private market:string;
    private bids:{
        [keys:string]:string;
    };
    private asks:{
        [keys:string]:string;
    };

    constructor(market:string){
        this.market=market;
        setTimeout(()=>{
            this.pollMarket();
        },3000)
    }

    async pollMarket(){
        const res=await fetch(`https://public.coindcx.com/market_data/orderbook?pair=${this.market}`);
        const depth=await res.json();
        this.bids=depth.bids;
        this.asks=depth.asks;
    }

    getReleventDepth(){
        let highestBid=-100;
        let lowestAsk=1000000;

        Object.keys(this.bids).map(x=>{
            if(parseFloat(x)>highestBid)highestBid=parseFloat(x);
        })

        Object.keys(this.asks).map(x=>{
            if(parseFloat(x)<lowestAsk)lowestAsk=parseFloat(x);
        })

        return {
            highestBid,
            lowestAsk
        }
    }
}