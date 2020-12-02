
const CompanyNumberReducer = (state, action) => {
    switch(action.type) {
        case 'SET_COMPANY_NUMBER':
            return action.companyNumber;
            
        default:
            return state;
    }
}

export default CompanyNumberReducer;