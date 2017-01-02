const Datastore = require("nedb");
const db = new Datastore({ filename: "./data/order.db", autoload: true });

function Order(pizzaName, orderedBy) {
  this.orderedBy = orderedBy;
  this.pizzaName = pizzaName;
  this.orderDate = JSON.stringify(new Date());
  this.state = "OK";
}

function publicAddOrder(pizzaName, orderedBy, callback) {
  var order = new Order(pizzaName, orderedBy);
  db.insert(order, function(err, newDoc) {
    if (callback) {
      callback(err, newDoc);
    }
  });
}

function publicRemove(id, callback) {
  db.update({ _id: id }, { $set: { "state": "DELETED" } }, {}, function (err, doc) {
    publicGet(id, callback);
  });
}

function publicGet(id, callback) {
  db.findOne({ _id: id }, function(err, doc) {
    callback(err, doc);
  });
}

function publicAll(callback) {
  db.find({}, function(err, doc) {
    callback(err, doc);
  });
}

module.exports = {
  add: publicAddOrder,
  delete: publicRemove,
  get: publicGet,
  all: publicAll
};
