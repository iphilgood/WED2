module.exports = class Transaction {
	constructor(accountA, accountB, amount) {
		this.date = Date.now();
		this.amount = amount;
		this.completed = false;
	}
};
