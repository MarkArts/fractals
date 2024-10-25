function time(f, name, times) {
  if (!times) {
    times = 1;
  }

  begin = Date.now();
  var ret = null;
  for (var i = 0; i < times; i++) {
    ret = f();
  }
  console.log("function " + name + " took:", (Date.now() - begin) / times);
  return ret;
}
