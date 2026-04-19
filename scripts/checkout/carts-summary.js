
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { cart, removeFromcart, calculateCartQuantity, saveToLocalStorage, changeInCart } from '../../data/cart.js';
import { paymentSummery } from './Payment-summary.js';
import { formatCurrency, dynamicQuantityValue } from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOption.js';



export class runningCart {

  deliveryDate(deliveryID) {
    let deliveryDayString;
    deliveryOptions.forEach((deliveryInfo) => {
      if (deliveryID === deliveryInfo.id) {
        const today = dayjs();
        const deliveryDay = today.add(deliveryInfo.deliveryDays, 'days')
        deliveryDayString = deliveryDay.format('dddd,MMMM D');
      }
    })
    return deliveryDayString
  }

  renderCartItem(products) {
    let cartSummaryHTML = '';

    cart.forEach(({ ID, quantity, deliveryID }) => {
      products.forEach(({ id, name, image, priceCents }) => {
        if (ID === id) {
          cartSummaryHTML += `<div class="cart-item-container js-cart-item-container js-cart-item-container${id}">
        <div class="delivery-date">
          Delivery date: ${this.deliveryDate(deliveryID)}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${name}
            </div>
            <div class="product-price">
              $${formatCurrency(priceCents)}
            </div>
            <div class="product-quantity
            js-product-quantity-${ID}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label${ID}">${quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id='${ID}' data-state="off">
                Update
              </span>
               <span class="input-generator${ID}"></span>
              <span class="delete-quantity-link
               js-delete-link-${ID} 
               link-primary js-delete-quantity-link"
                data-product-id='${ID}'>
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${this.dateTime(ID, deliveryID)}
          </div>
        </div>
      </div>`;
        }
      });
    });
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummery()

    document.querySelector('.js-items-quantity').innerHTML = `${calculateCartQuantity()} items`
    this.dltBtnEventListner()
    this.updtBtnEventListner()
    this.deliveryBtnEventListner(products)
  }

  dateTime(ID, deliveryID) {
    let html = ''

    deliveryOptions.forEach((deliveryInfo) => {
      const today = dayjs();
      const deliveryDay = today.add(deliveryInfo.deliveryDays, 'days')
      const deliveryDayString = deliveryDay.format('dddd,MMMM D');

      const ammount = deliveryInfo.priceCents
        === 0
        ? 'FREE '
        : `${formatCurrency(deliveryInfo.priceCents)} - `;

      const checkedButtonInfo = deliveryID
        === deliveryInfo.id
        ? 'checked'
        : '';


      html += `  <div class="delivery-option ">
              <input type="radio" ${checkedButtonInfo} class="delivery-option-input js-delivery-option-input" name="delivery-option-${ID}" data-btn-id='${deliveryInfo.id}' data-product-id='${ID}'>
              <div>
                <div class="delivery-option-date">
                  ${deliveryDayString}
                </div>
                <div class="delivery-option-price">
                  ${ammount}Shipping
                </div>
              </div>
            </div>

        `
    })
    return html;

  }

  dltBtnEventListner() {
    document.querySelectorAll('.js-delete-quantity-link').forEach((dltButton) => {
      dltButton.addEventListener('click', () => {
        const productId = dltButton.dataset.productId;
        removeFromcart(productId);
        document.querySelector(`.js-cart-item-container${productId}`).remove();
        document.querySelector('.js-payment-summary').innerHTML = paymentSummery()
        document.querySelector('.js-items-quantity').innerHTML = `${calculateCartQuantity()} items`
        console.log(cart)

      });
    });
  }
  updtBtnEventListner() {
    const updateButton = document.querySelectorAll('.js-update-quantity-link')
    updateButton.forEach((updtButton) => {
      const productId = updtButton.dataset.productId;
      const btnSwitch = updtButton.dataset;

      updtButton.addEventListener('click', () => {
        const inputElement = document.querySelector(`.input-generator${productId}`)
        if (btnSwitch.state === 'off') {
          inputElement.innerHTML = `<input class="quantity-input js-quantity-input${productId}" 
        type="number" >`
          updtButton.innerHTML = 'Save';
          btnSwitch.state = 'on'
        }
        else {
          updtButton.innerHTML = 'Update';
          this.savebtnEventListner(productId)
          btnSwitch.state = 'off'
          inputElement.innerHTML = ''


        }
      })
    })
  }
  savebtnEventListner(productId) {
    const input = document.querySelector(`.js-quantity-input${productId}`)
    const value = Number(input.value);
    changeInCart(productId, value)
    document.querySelector('.js-payment-summary').innerHTML = paymentSummery()
    document.querySelector('.js-items-quantity').innerHTML = `${calculateCartQuantity()} items`
    document.querySelector(`.js-quantity-label${productId}`).innerHTML = `${dynamicQuantityValue(productId)}`
  }
  deliveryBtnEventListner(products) {
    document.querySelectorAll('.js-delivery-option-input').forEach((btn) => {
      btn.addEventListener('click', () => {
        const btnId = btn.dataset.btnId;
        const productId = btn.dataset.productId;
        for (let i = 0; i < cart.length; i++) {
          const product = cart[i];
          if (product.ID === productId) {
            product.deliveryID = btnId
            break
          }
        }
        saveToLocalStorage()
        this.renderCartItem(products)
      })
    })
  }
}

