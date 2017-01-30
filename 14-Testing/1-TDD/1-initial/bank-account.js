'use strict';


module.exports = class BankAccount {
	constructor() {
		console.log("create account");
		this.maximalWithdrawFactor = 0.25;
		this.balance = 0;
	}

	deposit(amount) {
		this.balance += amount;
		console.log(`Deposit ${amount}. Balance ${this.balance}.`);
		return true;
	}

	withdraw(amount) {
		if(!this.hasTooLessCredit(amount)) {
			this.balance -= amount;
			console.log(`Withdraw ${amount}. Balance ${this.balance}.`);
			return true;
		} else {
			console.log(`Withdraw of ${amount} failed.`);
			return false;
		}
	}

	hasTooLessCredit(amount) {
		return this.balance < Math.abs(amount) || amount > this.balance * this.maximalWithdrawFactor;
	}
};
