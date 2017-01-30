# Bank account

## User stories

* **As a** `bank agent` **I want to** `create accounts` **so that** customers `can deposit and withdraw amounts`.
* **As a** `bank customer` **I want to** `deposit amounts` **so that** I can `store my money`.
* **As a** `bank customer` **I want to** `withdraw amounts` **so that** I `get back my stored money`.
* **As a** `bank` **I want to** `prevent customers from overdrawing` their account **so that** I can `lower my risk`.


## Test scenarios (BDD)

### Scenario *New account*
**Given** a `new account` …
* … **then** the balance should be 0.
* … **when** the Account balance is 0 …
	* … **then** withdraw should be impossible.
	* … **and** deposit of 50 is made …
		* … **then** the balance should be 50.

### Scenario *Account balance 50*
**Given** an `account with balance 50` …
* … **when** withdrawed …
	* … **then** the maximal possible withdraw should be 50 * 25%.
* … **when** withdrawed 50 * 25% …
	* … **then** the balance should be 37.5.


<div style="page-break-after: always;"></div>

## Implementation

### 1. Implementation without test

```javascript
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
		return this.balance < Math.abs(amount) || amount > this.balance * this.maximalWithdrawFactor;
	}
};
```

<div style="page-break-after: always;"></div>

Usage:

```javascript
// ...1-TDD $
var BankAccount = require("./1-initial/bank-account");
// undefined

var account = new BankAccount();
// create account
// undefined

account.balance
// 0

account.deposit(50);
// Deposit 50. Balance 50.
// true

account.withdraw(50);
// Withdraw of 50 failed.
// false

account.withdraw(20);
// Withdraw 30. Balance 30.
// true
```

<div style="page-break-after: always;"></div>

### 2. Refactoring

```javascript
hasTooLessCredit(amount) {
	return
		this.balance < Math.abs(amount) ||
		amount > this.balance * this.maximalWithdrawFactor;
}
```

```javascript
// ...1-TDD $
var BankAccount = require("./2-refactoring/bank-account");
// undefined

var account = new BankAccount();
// create account
// undefined

account.balance
// 0

account.deposit(50);
// Deposit 50. Balance 50.
// true

account.withdraw(20);
// Withdraw 50. Balance -20.
// true
```

<div style="page-break-after: always;"></div>

### 3. First test

```javascript
var BankAccount = require("./bank-account");

describe("A new bank account", function() {
	// ...
});

// 50$ bank account test suite
describe("A bank account of balance 50", function() {
	beforeEach(function() {
		this.account = new BankAccount();
		this.account.balance = 50;
	});

	it("should allow to withdraw 12.5 (25%)", function() {
		expect(this.account.withdraw(12.5)).toBe(true);
		expect(this.account.balance).toBe(37.5);
	});

	it("should not allow to withdraw 13 (26%)", function() {
		expect(this.account.withdraw(13)).toBe(false);
		expect(this.account.balance).toBe(50);
	});
});
```
&rarr; Test reproduces the error!
