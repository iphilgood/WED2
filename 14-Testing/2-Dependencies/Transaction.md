# Transaction

## User stories

* **As a** `bank customer` **I want to** `send amounts` to other accounts **so that** I can `pay someone`.
* **As a** `bank customer` **I want to** `receive amounts` from other accounts **so that** someone can `pay me`.
* **As a** `bank` **I want to** `see time and date of every transaction` **so that** I have an `overview about the transaction history`.


## Test scenarios (BDD)

### Scenario *new transaction*
**Given** a `new transaction` about 25 of Account A (balance 100) to Account B (balance 25) …
* … **then** the transaction date should be *now*
* … **then** the transaction amount should be 25
* … **then** the transaction should not be completed yet

### Scenario *transaction execution*
**Given** a `new transaction` about 25 of Account A (balance 100) to Account B (balance 25) …
* … **and** the transaction is executed …
	* … **then** Account A should be withdrawed 25.
	* … **then** Account B should be deposited 25.
	* … **then** the transaction should be completed.


<div style="page-break-after: always;"></div>

## Implementation

### Test first (scenario *new transaction*)

```javascript
var Transaction = require("./transaction");

describe("A new transaction", function() {
	beforeEach(function() {
		// Methodstub for Date.now()
		spyOn(Date, 'now').andReturn(new Date("2016-11-22T09:49:51.010Z"));

		// Banc account spy
		var BankAccountSpy = class {
			withdraw() {}
			deposit() {}
		};

		this.accountA = new BankAccountSpy();
		this.accountB = new BankAccountSpy();
		this.transaction = new Transaction(this.accountA, this.accountB, 25);
	});

	it("has transaction date 2016-11-22T09:49:51.010Z", function() {
		expect(this.transaction.date).toEqual(new Date("2016-11-22T09:49:51.010Z"));
	});

	// ...
});
```

<div style="page-break-after: always;"></div>

### Transaction

```javascript
module.exports = class Transaction {
	constructor(accountA, accountB, amount) {
		this.date = Date.now();
		// ...
	}
};
```
