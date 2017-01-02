var loop = function(res, from, to) {
  i = (typeof(i) === 'undefined' ?  from : i);
  res.write(String(i++) + " ");
  i > to || loop(res, i, to);
}

module.exports.loop = loop;
