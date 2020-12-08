import {combineReducers} from 'redux';

const INITIAL_STATE = {
	transactions:[
		{ key: "a", amount:"3.00", type: "-", category: "Coffee"},
        { key: "b", amount: "550.00" ,type: "+", category: "Payday"},
        { key: "c", amount: "950.00", type: "-", category: "Rent"},
        { key: "d", amount: "50.00", type: "-", category: "Savings"},
        { key: "e", amount: "550.00", type: "+", category: "Payday"},
        { key: "f", amount: "35.00", type: "+", category: "Gift"},
	],
};

const transactionReducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case 'ADD_TRANSACTION':
			//adds new transaction to array
			const{
				transactions,
			} = state;
			const addedTransaction = action.payload;
			transactions.push(addedTransaction);
			const newState = {transactions};
			return newState;
		default:
			return state

	}
};

export default combineReducers({
	tns: transactionReducer
});