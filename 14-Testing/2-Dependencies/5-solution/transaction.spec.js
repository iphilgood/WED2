process.env.transaction = "../5-solution/transaction";

var Spec = require("../4-spec-completion/transaction.spec");

/**
 * We develop iteratively. So we
 * 1. create the spec
 * 2. check if tests are failing
 * 3. implement the fature
 * 4. check if the tests are passing
 * 5. Do the whole iteration for the next SMALL feature
 *
 * So we can implement, test, version & integrate iterative
 * -> reduces errors, improves quality, creates a clean history.
 */
