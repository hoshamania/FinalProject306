import {combineReducers} from 'redux';


const INITIAL_STATE = {
	transactions:[
		{ key: "0", amount:"3.00", type: "-", category: "Coffee"},
        { key: "1", amount: "550.00" ,type: "+", category: "Payday"},
        { key: "2", amount: "950.00", type: "-", category: "Rent"},
        { key: "3", amount: "50.00", type: "-", category: "Savings"},
        { key: "4", amount: "550.00", type: "+", category: "Payday"},
        { key: "5", amount: "35.00", type: "+", category: "Gift"},
	],
};


const transactionReducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case 'ADD_TRANSACTION':
			//adds new transaction object to array
			const{
				transactions,
			} = state;
			const addedTransaction = {key:transactions.length,amount:action.payload[0],type:action.payload[1],category:action.payload[2]};
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