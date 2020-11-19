
const SignUpAsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_SIGN_AS_TYPE':
            return action.signAsType;
        
        default:
            return state;
    }
}

export default SignUpAsReducer;