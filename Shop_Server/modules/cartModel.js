
let cart = []
const cartHistory =[];
class Cart {
    constructor(pid, productName,isbn, price, qty) {

        this.pid = pid;
        this.productName = productName;
        this.isbn = isbn;
        this.price = price;
        this.qty = qty;
    }
    addItem() {
        const productIndex = cart.findIndex(item => item.pid == this.pid);
        if (productIndex > -1) {
             cart[productIndex].qty = cart[productIndex].qty + 1;
             console.log(cart)
             return this;
        } else {
            
            cart.push(this)
            console.log(cart)
            
            return this;

        }
    }
    static removeItem(pid) {
        console.log('cart');
        console.log(pid);
        const index = cart.map(item => item.pid).indexOf(parseInt(pid))
        console.log(index);
        // cart.findIndex(item => item.pid == pid);
        if (index > -1) {
            if (cart[index].qty >= 1) {
                cart[index].qty = cart[index].qty - 1;
                return cart[index];
            } else {
                cart.slice(index, 1)
            }

        } else {
            throw new Error ("ITEM NOT FOUND");
        }
    }
    static getCartList(){
        console.log("incart")
        return cart;
    }

    static orderPlaced(){
        const date = new Date();
        const bill = Cart.totalCost();
        bill.Date = date;
        
        cartHistory.push(bill)
        cart = [];
        
        return cartHistory;
    }
    static totalItem(){
        let totalItem =0;
        cart.forEach(item =>{
            totalItem += item.qty
        })
        return totalItem;
    }
    static totalCost(){
        const totalItem = Cart.totalItem();
        let totalCost=0;
        cart.forEach(item =>{
            totalCost += item.qty * item.price;
        })
        return { Total_Item : totalItem,
                 Total_Amount:`$${totalCost}/-`}
       
    }
    
}

module.exports = Cart;

        
