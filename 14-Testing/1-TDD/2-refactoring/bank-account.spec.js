var BankAccount = require("./bank-account");

describe("A new bank account", function() {
  beforeEach(function() {
    this.account = new BankAccount();
  });

  it("has a initial balance of 0", function() {
    expect(this.account.balance).toBe(0);
  });

  it("is not possible to withdraw", function() {
    expect(this.account.withdraw(10)).toBeFalsy();
    expect(this.account.balance).toBe(0);
  });

  it("should have a balance of 50 after deposit 50", function() {
    expect(this.account.deposit(50)).toBeTruthy();
    expect(this.account.balance).toBe(50);
  });
});

describe("A new bank account with balance 50", function() {
  beforeEach(function() {
    this.account = new BankAccount();
    this.account.deposit(50);
  });

  it("should withdraw the maximal possible value (25% of $50)", function() {
    expect(this.account.withdraw(12.5)).toBeTruthy();
    expect(this.account.balance).toBe(37.5);
  });

  it("should not withdraw more than the maximal possible value", function() {
    expect(this.account.withdraw(13)).toBeFalsy();
    expect(this.account.balance).toBe(50);
  });
});
