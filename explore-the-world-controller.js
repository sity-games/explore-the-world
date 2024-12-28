let controller = {};
controller.action = {};
controller.action.handler = {};
controller.action.handler.main = function(){};
controller.action.handler.gamepad = function(){};
controller.action.move = {};
controller.action.move.x = 0.0;
controller.action.move.y = 0.0;
controller.action.angle = {};
controller.action.angle.x = 0.0;
controller.action.angle.y = 0.0;

conf.gamepad = {};
conf.gamepad.move = {};
conf.gamepad.move.axis = {};
conf.gamepad.move.axis.x = 0;
conf.gamepad.move.axis.z = 1;
conf.gamepad.move.reversed = {};
conf.gamepad.move.reversed.x = false;
conf.gamepad.move.reversed.z = true;
conf.gamepad.angle = {};
conf.gamepad.angle.step = 0.1;
conf.gamepad.angle.axis = {};
conf.gamepad.angle.axis.x = 2;
conf.gamepad.angle.axis.y = 3;
conf.gamepad.angle.reversed = {};
conf.gamepad.angle.reversed.x = true;
conf.gamepad.angle.reversed.y = true;

controller.action.handler.gamepad = function() {
  let gamepad = navigator.getGamepads()[0];
  if (gamepad) {
    if (conf.gamepad.move.reversed.x) {
      controller.action.move.x = -gamepad.axes[conf.gamepad.move.axis.x];
    } else {
      controller.action.move.x = gamepad.axes[conf.gamepad.move.axis.x];
    }
    if (conf.gamepad.move.reversed.z) {
      controller.action.move.z = -gamepad.axes[conf.gamepad.move.axis.z];
    } else {
      controller.action.move.z = gamepad.axes[conf.gamepad.move.axis.z];
    }
    if (conf.gamepad.angle.reversed.x) {
      controller.action.angle.x = -gamepad.axes[conf.gamepad.angle.axis.x];
    } else {
      controller.action.angle.x = gamepad.axes[conf.gamepad.angle.axis.x];
    }
    if (conf.gamepad.angle.reversed.y) {
      controller.action.angle.y = -gamepad.axes[conf.gamepad.angle.axis.y];
    } else {
      controller.action.angle.y = gamepad.axes[conf.gamepad.angle.axis.y];
    }
  }
}

controller.action.handler.main = function() {
  controller.action.handler.gamepad();
  game.camera.alpha += conf.gamepad.angle.step * controller.action.angle.x;
  if (game.camera.alpha > conf.camera.angle.offset.x + Math.PI * 2.0) {
    game.camera.alpha = game.camera.alpha - Math.PI * 2.0;
  } else if (game.camera.alpha < conf.camera.angle.offset.x - Math.PI * 2.0) {
    game.camera.alpha = game.camera.alpha + Math.PI * 2.0;
  }
  game.camera.beta += conf.gamepad.angle.step * controller.action.angle.y;
}

