module.exports = class Transaction {
	constructor(accountA, accountB, amount) {
		this.accountA = accountA;
		this.accountB = accountB;
		this.date = Date.now();
		this.amount = amount;
		this.completed = false;
	}

	execute() {
		this.accountA.withdraw(this.amount);
		this.accountB.deposit(this.amount);
		this.completed = true;
	}
};
