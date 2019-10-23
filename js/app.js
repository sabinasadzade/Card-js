// const btnAdd=document.querySelectorAll("[data-action='Add_to_Card']")
// const modalPoductDom=document.querySelector(".modal-body")
// let cart=(JSON.parse(localStorage.getItem("cart"))||[]);
// if(cart.length>0){
//     cart.forEach(cartDom=>{
//         product=cartDom;
//         InsertItem(product);
    
// btnAdd.forEach(btnAddDom=>{
  
//         const productParent=btnAddDom.parentNode.parentNode;
//         if(productParent.querySelector(".card-title").innerText.trim()==product.productName){
//             btnAddDom.disabled=true;
//             HandleActionButtons(product);
//         }
     
// })
// })

// }
// btnAdd.addEventListener("click",()=>{
//     var product={
//         image:productParent.querySelector(".card-img-top").getAttribute("src"),
//         productName:productParent.querySelector(".card-title").innerText,
//         price:productParent.querySelector(".card-price").innerText,
//         description:productParent.querySelector(".card-text").innerText,
//         quantity:1,
//         totalPrice:0
//     }
// const cartItemDoms=document.querySelectorAll(".modal-middle")

// var isIncart=(cart.filter(cartitm=>(cartitm.productName.trim()==product.productName.trim())).length>0)
// if(!isIncart){
//    InsertItem(product)
//   cart.push(product)
//   localStorage.setItem("cart",JSON.stringify(cart))
// HandleActionButtons(product)
// }

// })
// function IncreaseItem(product,cartmiddle){
//     cart.forEach(cartItem=>{
//         if(cartItem.productName==product.productName){

//             cartmiddle.querySelector(".product_quantity").innerText=++cartItem.quantity;
//             product.totalPrice=parseInt(product.price)*parseInt(cartmiddle.querySelector(".product_quantity").innerText)+" AZN"
           
//             cartmiddle.querySelector(".card-price-item").innerText=product.totalPrice!=0?product.totalPrice:product.price
//             cartmiddle.querySelector("[data-action='Decrease_Item']").classList.remove("btn-danger")
//             localStorage.setItem("cart",JSON.stringify(cart))
//         }

//     })

// }
// function DecreaseItem(product,cartmiddle){
// cart.forEach(cartItem=>{
//     if(cartItem.productName==product.productName){
//         if(cartItem.quantity>1){
//             cartmiddle.querySelector(".product_quantity").innerText=--cartItem.quantity;
//             product.totalPrice=parseInt(product.price)*parseInt(cartmiddle.querySelector(".product_quantity").innerText)+" AZN"
              
//                 cartmiddle.querySelector(".card-price-item").innerText=product.totalPrice!=0?product.totalPrice:product.price
//                 localStorage.setItem("cart",JSON.stringify(cart))
//                 if(product.quantity==1){
//                 cartmiddle.querySelector("[data-action='Decrease_Item']").classList.add("btn-danger")
               
//                 }
//         }
//         else{
//             RemoveItem(product,cartmiddle);
//         }
       
//     }
// })
// }
// function RemoveItem(product,cartmiddle){
 
// cartmiddle.remove();
// cart=cart.filter(cartItem=>cartItem.productName!=product.productName)
// localStorage.setItem("cart",JSON.stringify(cart))
// }
// function HandleActionButtons(product){
//     cartMiddleDom=modalPoductDom.querySelectorAll(".modal-middle")
//     cartMiddleDom.forEach(cartmiddle=>{
//   if(cartmiddle.querySelector(".card-name-item").innerText==product.productName){
//       cartmiddle.querySelector("[data-action='Increase_Item']")
//       .addEventListener('click',()=>{
//        IncreaseItem(product,cartmiddle)

//       })
//       cartmiddle.querySelector("[data-action='Decrease_Item']").addEventListener('click',()=>{
//           DecreaseItem(product,cartmiddle)
//       })
//       cartmiddle.querySelector("[data-action='Remove_Item']").addEventListener('click',()=>{
//           RemoveItem(product,cartmiddle)
//       })
//   }
  
       
//     })
// }
// function InsertItem(product){
//     modalPoductDom.insertAdjacentHTML('beforeend',`
//     <div class="modal-middle">
//     <div class="d-flex justify-content-between">
//     <div class="col-lg-2">
//     <img class="card-photo-item img-fluid" src="${product.image}"/>
//     </div>
//     <div class="">
//     <h5 class="card-name-item">${product.productName}</h5>
//     </div>
  
//     <div class="col-lg-5 p-0">
//     <span class="card-price-item">${product.price}</span>
//     <button data-action="Decrease_Item" type="submit" class="btn btn-sm btn-primary ${product.quantity==1?'btn-danger':""}"">&minus;</button>
//     <span class="product_quantity">${product.quantity}</span>
//     <button data-action="Increase_Item" type="submit" class="btn btn-sm btn-primary">&plus;</button>
//     <button data-action="Remove_Item" type="submit" class="btn btn-sm btn-danger">&times;</button>
//     </div>
//     </div>
//     </div>
//     `
//   )
// }


'use strict';

let cart = (JSON.parse(localStorage.getItem('cart')) || []);
const cartDOM = document.querySelector('.modal-body');
const addToCartButtonsDOM = document.querySelectorAll('[data-action="Add_to_Card"]');

if (cart.length > 0) {
  cart.forEach(cartItem => {
    const product = cartItem;
    insertItemToDOM(product);
    countCartTotal();

    addToCartButtonsDOM.forEach(addToCartButtonDOM => {
      const productDOM = addToCartButtonDOM.parentNode;

      if (productDOM.querySelector('.card-title').innerText === product.name) {
        handleActionButtons(addToCartButtonDOM, product);
      }
    });

  });
}

addToCartButtonsDOM.forEach(addToCartButtonDOM => {
  addToCartButtonDOM.addEventListener('click', () => {
    const productDOM = addToCartButtonDOM.parentNode.parentNode;
    const product = {
      image: productDOM.querySelector('.card-img-top').getAttribute('src'),
      name: productDOM.querySelector('.card-title').innerText,
      price: productDOM.querySelector('.card-price').innerText,
      quantity: 1,
    };

    const isInCart = (cart.filter(cartItem => (cartItem.name === product.name)).length > 0);

    if (!isInCart) {
      insertItemToDOM(product);
      cart.push(product);
      saveCart();
      handleActionButtons(addToCartButtonDOM, product);
    }
  });
});

function insertItemToDOM(product) {
  cartDOM.insertAdjacentHTML('beforeend', `
  <div class="modal-middle">
  <div class="d-flex justify-content-between">
  <div class="col-lg-2">
  <img class="card-photo-item img-fluid" src="${product.image}"/>
  </div>
  <div class="">
  <h5 class="card-name-item">${product.name}</h5>
  </div>

  <div class="col-lg-5 p-0">
  <span class="card-price-item">${product.price}</span>
  <button data-action="DECREASE_ITEM" type="submit" class="btn btn-sm btn-primary ${product.quantity==1?'btn-danger':""}"">&minus;</button>
  <span class="product_quantity">${product.quantity}</span>
  <button data-action="INCREASE_ITEM" type="submit" class="btn btn-sm btn-primary">&plus;</button>
  <button data-action="REMOVE_ITEM" type="submit" class="btn btn-sm btn-danger">&times;</button>
  </div>
  </div>
  </div>
  `);

  addCartFooter();
}

function handleActionButtons(addToCartButtonDOM, product) {
  addToCartButtonDOM.innerText = 'In Cart';
  addToCartButtonDOM.disabled = true;

  const cartItemsDOM = cartDOM.querySelectorAll('.modal-middle');
  cartItemsDOM.forEach(cartItemDOM => {
    if (cartItemDOM.querySelector('.card-name-item').innerText === product.name) {
      cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => increaseItem(product, cartItemDOM));
      cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', () => decreaseItem(product, cartItemDOM, addToCartButtonDOM));
      cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click', () => removeItem(product, cartItemDOM, addToCartButtonDOM));
    }
  });
}

function increaseItem(product, cartItemDOM) {
  cart.forEach(cartItem => {
    if (cartItem.name === product.name) {
      cartItemDOM.querySelector('.product_quantity').innerText = ++cartItem.quantity;
      cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove('btn-danger');
      saveCart();
    }
  });
}

function decreaseItem(product, cartItemDOM, addToCartButtonDOM) {
  cart.forEach(cartItem => {
    if (cartItem.name === product.name) {
      if (cartItem.quantity > 1) {
        cartItemDOM.querySelector('.product_quantity').innerText = --cartItem.quantity;
        saveCart();
      } else {
        removeItem(product, cartItemDOM, addToCartButtonDOM);
      }

      if (cartItem.quantity === 1) {
        cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add('btn-danger');
      }
    }
  });
}

function removeItem(product, cartItemDOM, addToCartButtonDOM) {
  cartItemDOM.classList.add('cart__item--removed');
  setTimeout(() => cartItemDOM.remove(), 250);
  cart = cart.filter(cartItem => cartItem.name !== product.name);
  saveCart();
  addToCartButtonDOM.innerText = 'Add To Cart';
  addToCartButtonDOM.disabled = false;

  if (cart.length < 1) {
    document.querySelector('.cart-footer').remove();
  }
}

function addCartFooter() {
  if (document.querySelector('.cart-footer') === null) {
    cartDOM.insertAdjacentHTML('afterend', `
      <div class="cart-footer">
        <button class="btn btn-danger" data-action="CLEAR_CART">Clear Cart</button>
        <button class="btn btn-primary" data-action="CHECKOUT">Pay</button>
      </div>
    `);

    document.querySelector('[data-action="CLEAR_CART"]').addEventListener('click', () => clearCart());
    document.querySelector('[data-action="CHECKOUT"]').addEventListener('click', () => checkout());
  }
}

function clearCart() {
  cartDOM.querySelectorAll('.modal-middle').forEach(cartItemDOM => {
    cartItemDOM.classList.add('cart__item--removed');
    setTimeout(() => cartItemDOM.remove(), 250);
  });

  cart = [];
  localStorage.removeItem('cart');
  document.querySelector('.cart-footer').remove();

  addToCartButtonsDOM.forEach(addToCartButtonDOM => {
    addToCartButtonDOM.innerText = 'Add To Cart';
    addToCartButtonDOM.disabled = false;
  });
}

function checkout() {
  let paypalFormHTML = `
    <form id="paypal-form" action="https://www.paypal.com/cgi-bin/webscr" method="post">
      <input type="hidden" name="cmd" value="_cart">
      <input type="hidden" name="upload" value="1">
      <input type="hidden" name="business" value="adrian@webdev.tube">
  `;

  cart.forEach((cartItem, index) => {
    ++index;
    paypalFormHTML += `
      <input type="hidden" name="item_name_${index}" value="${cartItem.name}">
      <input type="hidden" name="amount_${index}" value="${cartItem.price}">
      <input type="hidden" name="quantity_${index}" value="${cartItem.quantity}">
    `;
  });

  paypalFormHTML += `
      <input type="submit" value="PayPal">
    </form>
    <div class="overlay"></div>
  `;

  document.querySelector('body').insertAdjacentHTML('beforeend', paypalFormHTML);
  document.getElementById('paypal-form').submit();
}

function countCartTotal() {
  let cartTotal = 0;
  cart.forEach(cartItem => cartTotal += cartItem.quantity * cartItem.price);
  document.querySelector('[data-action="CHECKOUT"]').innerText = `Pay $${cartTotal}`;
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  countCartTotal();
}
