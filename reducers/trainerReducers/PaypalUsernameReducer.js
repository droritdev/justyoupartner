
const PaypalUsernameReducer = (state, action) => {
    switch(action.type) {
        case 'SET_PAYPAL_USERNAME':
            return action.paypalUsername;
        
        default:
            return state;
    }
}

export default PaypalUsernameReducer;