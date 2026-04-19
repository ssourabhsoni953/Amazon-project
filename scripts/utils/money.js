import { cart } from '../../data/cart.js';
import { deliveryOptions } from '../../data/deliveryOption.js';


export function formatCurrency(priceCents) {
    return (priceCents / 100).toFixed(2)
}
export function ordersValue() {
    let value = 0;
    cart.forEach((array) => {
        value += array.quantity * array.productPrice;
        console.log(`${array.quantity * array.productPrice}`);
    })

    return value;


}
console.log(cart);

console.log(ordersValue())
export function totalBeforeTax() {
    return ordersValue() + calculateShippingfee()
}
export function estimatedTax() {
    return totalBeforeTax() * 10 / 100
}
export function orderTotal() {
    return estimatedTax() + totalBeforeTax()
}
export function dynamicQuantityValue(productId) {

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];

        if (productId === product.ID) {
            return product.quantity

        }
    }

}
export function calculateShippingfee() {
    let ShippingFee = 0;
    cart.forEach((product) => {
        for (let i = 0; i < deliveryOptions.length; i++) {
            const deliveryOption = deliveryOptions[i];
            if (deliveryOption.id === product.deliveryID) {
                ShippingFee += deliveryOption.priceCents
            }

        }
    })
    return ShippingFee;
}