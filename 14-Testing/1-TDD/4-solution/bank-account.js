'use strict';


module.exports = class BankAccount {
	constructor() {
		this.maximalWithdrawFactor = 0.25;
		this.balance = 0;
	}

	deposit(amount) {
		this.balance += amount;
		return true;
	}

	withdraw(amount) {
		if(!this.hasTooLessCredit(amount)) {
			this.balance -= amount;
			return true;
		} else {
			return false;
		}
	}

	hasTooLessCredit(amount) {
		return (
			this.balance < Math.abs(amount) ||
			amount > this.balance * this.maximalWithdrawFactor
		);
	}
};
