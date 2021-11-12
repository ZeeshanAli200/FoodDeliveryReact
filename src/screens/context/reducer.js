// export var data = {
//     snacks: 'Sooper',
//     drink: 'tea',
//     user: {
//         userName: "Zeeshan"
//     }

// }
import { useHistory } from "react-router"

export let initialState = {

    authUser: {},
    RestaurantList: [],
    Restaurantid: '',
    Dishes: [],
    Orders: [],
    myCart: [],
    RestaurantOrders:[]



}


export function reducerUser(state, action) {

    switch (action.type) {

        case 'Curr_User': {

            let authenUser = action.payload

            console.log(action.payload)
            return {
                ...state,
                authUser: authenUser

            }
        }
        case 'delauth': {

            let authenUser = action.payload

            console.log(action.payloadLoginUser)
            return {
                ...state,
                authUser: authenUser

            }
        }
        case 'restaurantList': {

            let resList = action.payload
            let listclone = state.RestaurantList.slice(0)
            if (resList.length < 1) {
                listclone = resList
            }
            else {
                listclone.push(resList)
            }


            // console.log(action.payloadLoginUser)
            return {
                ...state,
                RestaurantList: listclone

            }
        }
        case 'restauId': {
            let resId = action.payload
            return {
                ...state,
                Restaurantid: resId
            }
        }
        case 'Dishesadd': {
            let dish = action.payload
            let dishclone = state.Dishes.slice(0)

            if (dish.length < 1) {

                dishclone = dish
            }
            else {
                dishclone.push(dish)
            }
            return {
                ...state,
                Dishes: dishclone
            }
        }
        case 'orderedDishes': {
            let arrdish = action.payload
            let dishclone = state.Orders.slice(0)
            if(arrdish.length<1){
                dishclone=arrdish
            }
            else{
            
            // console.log(arrdish);
            dishclone.push(arrdish)
            console.log(dishclone,"dishclone");
            }
            return {
                ...state,
                Orders: dishclone
            }

        }
        // RestaurantOrders
        case 'RestaurantOrders': {
            let restauOrder = action.payload
            let ordersClone = state.RestaurantOrders.slice(0)
            if(restauOrder.length<1){
                ordersClone=restauOrder
                
            }else{
                ordersClone.push(restauOrder)
            }
            
            
            
            // // console.log(arrdish);
            
            // console.log(dishclone,"dishclone");
            // }
            return {
                ...state,
                RestaurantOrders: ordersClone
            }

        }
        case 'setquantity': {
            let dishquan = action.payload
            let dishclone = state.Dishes.slice(0)
            // console.log(dishquan,"****");
            dishclone.map((dish, i) => {
                if (dish.dishId == dishquan.dishId) {
                    dish.quantity = dishquan.quantity
                    // console.log(dish.quantity,"************************************");
                }
            })
            // console.log(dishclone,"newdata**********");

            return {
                ...state,
                Dishes: dishclone
            }

        }


        case 'addcart': {
            let selectedItem = action.payload

            let cartClone = state.myCart.slice(0)
            let chkbool = false

            cartClone.map((cartDish, i) => {
                if (selectedItem.dishId == cartDish.dishId) {
                    cartDish.quantity += selectedItem.quantity
                    console.log(cartDish.Price, "price!!");
                    let updPrice = +selectedItem.Price * cartDish.quantity
                    console.log(updPrice, "hehehehehhe");
                    cartDish.Price = updPrice

                    chkbool = true
                    console.log(cartDish);
                }


            })
            if (chkbool == false) {
                // console.log("2121");
                if (selectedItem.quantity > 1) {
                    let updPrice = +selectedItem.Price * selectedItem.quantity
                    selectedItem.Price = updPrice
                    cartClone.push(selectedItem)
                }
                else {
                    cartClone.push(selectedItem)
                }
            }
            return {
                ...state,
                myCart: cartClone
            }

        }

        case 'deleteOrder': {
            let deleteId = action.payload
            let cartclone = state.myCart.slice(0)

            console.log(deleteId, "****");
            cartclone.map((dish, i) => {
                if (dish.dishId == deleteId) {
                    cartclone.splice(i, 1)

                }
            })


            return {
                ...state,
                myCart: cartclone
            }

        }

        case 'emptyCart': {
            let deletecart = action.payload
            let cartclone = deletecart

            return {
                ...state,
                myCart: cartclone
            }

        }



        default:
            return state;

    }
}
// export function reducer(state,action){
//     switch (action.type) {
//         case "UPDATE_SNACK": {
//             return {
//                 ...state,
//                 snacks: action.payload
//             }
//         }
//         case 'ADD_USER':{
//             return{
//                 ...state,

//             }
//         }
//         default:
//             return state;

//     }
// }