var alarms = []; 

function runAll(steps) {
  var index = 0;
  SimpleTest.waitForExplicitFinish();
  function callNext() {
    if (index >= steps.length - 1) {
      steps[index]();
      SimpleTest.finish();
      return;
    }
    debug("index = " + index);
    var func = steps[index];
    index++;
    func(callNext);
  }
  callNext();
}

function verify_pending(next) {
  var alarm_pending = navigator.mozHasPendingMessage("alarm");
  if (alarm_pending == true) {
    ok(true, "There is an alarm pending");
  }
  ok(false, "There is not an alarm pending");
}

function verify_not_pending(next) {
  var alarm_pending = navigator.mozHasPendingMessage("alarm");
  if (alarm_pending == true) {
    ok(false, "There is an alarm pending");
  }
  ok(true, "There is not an alarm pending");
}

function setUp(next) {
  SpecialPowers.pushPrefEnv({"set": [["dom.mozAlarms.enabled", true]]}, function() {
    SpecialPowers.addPermission("alarms", true, document);
    next();
  };
}

function tearDown() {
  for (alarm in alarms) {
    navigator.mozAlarms.remove(alarm);
  }
  SpecialPowers.removePermission("alarms", true, document);
  SpecialPowers.pushPrefEnv({"set": [["dom.mozAlarms.enabled", fakse]]}, function() {
    SimpleTest.finish();
  }
}

