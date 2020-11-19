
const CompanyNameReducer = (state, action) => {
    switch(action.type) {
        case 'SET_COMPANY_NAME':
            return action.companyName;
            
        default:
            return state;
    }
}

export default CompanyNameReducer;