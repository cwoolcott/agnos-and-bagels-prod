const utils = {
    roundUp: function (amount) {
        return Math.round(amount * 100) / 100;
    },
    makeTotal: function (orderSummary) {
        let taxes = 0;
        let subTotal = 0;
        let promotionCount = [];
        let discount = 0;

        if (orderSummary.menuItems) {
            orderSummary.menuItems.forEach(function (item) {
                let { _id, price, taxCategory, promotion } = item;

                //Taxes before Promotions
                taxes += price * taxCategory.taxRate;
                subTotal += price;

                //Promotion Check TODO make dynamic/add other promos
                if (promotion === "buyonegetone") {

                    //Promo set?
                    if (typeof (promotionCount[_id]) === "undefined") {
                        promotionCount[_id] = 0;
                    }
                    else {
                        promotionCount[_id]++;
                    }

                    if (promotionCount[_id] % 2 === 1) {
                        subTotal -= price;
                        discount += price;
                    }
                }
            });
        }

        const tempSubtotal = {};
        tempSubtotal.subTotal = this.roundUp(subTotal);
        tempSubtotal.taxes = this.roundUp(taxes);
        tempSubtotal.total = subTotal + taxes;
        tempSubtotal.discount = discount;


        return tempSubtotal;
    }
}

module.exports = utils;