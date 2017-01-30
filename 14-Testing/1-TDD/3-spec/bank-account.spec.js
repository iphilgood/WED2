var BankAccount = require(process.env.bankaccount || "./bank-account");


// new bank account test suite
describe("A new bank account", function() {
	beforeEach(function() {
		this.account = new BankAccount();
	});

	it("is initialized by a balance of 0", function() {
		expect(this.account.balance).toBe(0);
	});

	it("should not allow a withdraw without balance", function() {
		expect(this.account.withdraw(50)).toBeFalsy();
		expect(this.account.balance).toBe(0);
	});

	it("should have a balance of 50 after a deposit of 50", function() {
		expect(this.account.deposit(50)).toBeTruthy();
		expect(this.account.balance).toBe(50);
	});
});

// 50$ bank account test suite
describe("A bank account of balance 50", function() {
	beforeEach(function() {
		this.account = new BankAccount();
		this.account.balance = 50;
	});

	it("should not allow to withdraw 13 (26%)", function() {
		expect(this.account.withdraw(13)).toBeFalsy();
		expect(this.account.balance).toBe(50);
	});

	it("should allow to withdraw 12.5 (25%)", function() {
		expect(this.account.withdraw(12.5)).toBeTruthy();
		expect(this.account.balance).toBe(37.5);
	});
});