let player = {};
player.init = function(){};
player.mesh = null;
player.controller = {};
player.controller.action = {};
player.controller.action.handler = {};
player.controller.action.handler.main = function(){};
player.controller.action.handler.keyboard = function(e){};
player.controller.action.handler.gamepad = function(){};
player.controller.action.move = {};
player.controller.action.move.x = 0.0;
player.controller.action.move.y = 0.0;
player.controller.action.move.z = 0.0;
player.controller.action.angle = {};
player.controller.action.angle.x = 0.0;
player.controller.action.angle.y = 0.0;

conf.keyboard = {};
conf.keyboard.move = {};
conf.keyboard.move.forward = "w";
conf.keyboard.move.backward = "s";
conf.keyboard.move.left = "a";
conf.keyboard.move.right = "d";
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

player.init = function() {
  player.mesh = BABYLON.MeshBuilder.CreateBox('Cube', {
    width: 10, height: 10, depth: 10
  }, game.scene);
  player.mesh.material = new BABYLON.StandardMaterial("cube", game.scene);
}

player.controller.action.handler.keyboard = function(e) {
  if (e.sourceEvent.type == "keydown") {
    if (e.sourceEvent.key == conf.keyboard.move.left) {
      player.controller.action.move.x = 1.0;
    } else if (e.sourceEvent.key == conf.keyboard.move.right) {
      player.controller.action.move.x = -1.0;
    } else {
      player.controller.action.move.x = 0.0;
    }
    if (e.sourceEvent.key == conf.keyboard.move.forward) {
      player.controller.action.move.z = -1.0;
    } else if (e.sourceEvent.key == conf.keyboard.move.backward) {
      player.controller.action.move.z = 1.0;
    } else {
      player.controller.action.move.z = 0.0;
    }
  } else {
    player.controller.action.move.x = 0.0;
    player.controller.action.move.z = 0.0;
  }
}

player.controller.action.handler.gamepad = function() {
  let gamepad = navigator.getGamepads()[0];
  if (gamepad) {
    if (conf.gamepad.move.reversed.x) {
      player.controller.action.move.x = -gamepad.axes[conf.gamepad.move.axis.x];
    } else {
      player.controller.action.move.x = gamepad.axes[conf.gamepad.move.axis.x];
    }
    if (conf.gamepad.move.reversed.z) {
      player.controller.action.move.z = -gamepad.axes[conf.gamepad.move.axis.z];
    } else {
      player.controller.action.move.z = gamepad.axes[conf.gamepad.move.axis.z];
    }
    if (conf.gamepad.angle.reversed.x) {
      player.controller.action.angle.x = -gamepad.axes[conf.gamepad.angle.axis.x];
    } else {
      player.controller.action.angle.x = gamepad.axes[conf.gamepad.angle.axis.x];
    }
    if (conf.gamepad.angle.reversed.y) {
      player.controller.action.angle.y = -gamepad.axes[conf.gamepad.angle.axis.y];
    } else {
      player.controller.action.angle.y = gamepad.axes[conf.gamepad.angle.axis.y];
    }
  }
}

player.controller.action.handler.main = function() {
  player.controller.action.handler.gamepad();
  player.mesh.position.x += player.controller.action.move.x;
  player.mesh.position.z += player.controller.action.move.z;
  game.camera.alpha += conf.gamepad.angle.step * player.controller.action.angle.x;
  if (game.camera.alpha > conf.camera.angle.origin.x + Math.PI * 2.0) {
    game.camera.alpha = game.camera.alpha - Math.PI * 2.0;
  } else if (game.camera.alpha < conf.camera.angle.origin.x - Math.PI * 2.0) {
    game.camera.alpha = game.camera.alpha + Math.PI * 2.0;
  }
  game.camera.beta += conf.gamepad.angle.step * player.controller.action.angle.y;
}

