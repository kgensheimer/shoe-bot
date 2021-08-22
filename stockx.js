const StockXAPI = require('stockx-api');
const stockX = new StockXAPI();
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook('https://discord.com/api/webhooks/879074848217894984/JXBYCFCxGsQA8R-BCCTtJhY8lmUzDqgbog-TIkmSg4_htO7dVR0Ono_-Rd5h1-uuAFCo');



(async () => {
    prevlowestAsk = 0

    while (true) {
        try {
    
            product = await stockX.fetchProductDetails('https://stockx.com/new-balance-m2002-protection-pack-rain-cloud')
    
            size_11_and_half = null
            variants = product['variants']
    
            for (v in variants) {
                if (variants[v]['size'] == '11.5') {
                    size_11_and_half = variants[v]
                    break
                }
            }

            lowestAsk = size_11_and_half['market']['lowestAsk'];
            
            if (lowestAsk != prevlowestAsk) {
                hook.send(`<@215623152003317770> New Balance 2002R Protection Pack Rain Cloud Size 11.5: New Lowest Asking Price of $${lowestAsk}`)
                prevlowestAsk = lowestAsk
            }
            
            await new Promise(resolve => setTimeout(resolve, 60000));
        }
        catch(e){
            console.log('Error: ' + e.message);
        }
    }
})();