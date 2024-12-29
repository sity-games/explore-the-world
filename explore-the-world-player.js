let player = {};
player.init = function(){};
player.mesh = null;
player.position = function(){};
player.position.current = {};
player.position.current.vector3 = null;
player.position.current.grid = {};
player.position.current.grid.x = 0.0;
player.position.current.grid.y = 0.0;
player.position.current.grid.z = 0.0;
player.position.next = {};
player.position.next.vector3 = null;
player.position.next.grid = {};
player.position.next.grid.x = 0.0;
player.position.next.grid.y = 0.0;
player.position.next.grid.z = 0.0;
player.fallSpeed = 0.1;
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
player.controller.action.jump = false;
player.controller.action.angle = {};
player.controller.action.angle.x = 0.0;
player.controller.action.angle.y = 0.0;

conf.keyboard = {};
conf.keyboard.move = {};
conf.keyboard.move.forward = "w";
conf.keyboard.move.backward = "s";
conf.keyboard.move.left = "a";
conf.keyboard.move.right = "d";
conf.keyboard.jump = " ";
conf.gamepad = {};
conf.gamepad.move = {};
conf.gamepad.move.axis = {};
conf.gamepad.move.axis.x = 0;
conf.gamepad.move.axis.z = 1;
conf.gamepad.move.reversed = {};
conf.gamepad.move.reversed.x = false;
conf.gamepad.move.reversed.z = true;
conf.gamepad.jump = 1;
conf.gamepad.angle = {};
conf.gamepad.angle.step = 0.1;
conf.gamepad.angle.axis = {};
conf.gamepad.angle.axis.x = 2;
conf.gamepad.angle.axis.y = 3;
conf.gamepad.angle.reversed = {};
conf.gamepad.angle.reversed.x = true;
conf.gamepad.angle.reversed.y = true;
conf.player = {};
conf.player.speed = 0.1;

player.init = function() {
  player.mesh = BABYLON.MeshBuilder.CreateBox('Cube', {
    width: 10, height: 10, depth: 10
  }, game.scene);
  player.mesh.material = new BABYLON.StandardMaterial("cube", game.scene);
  player.mesh.material.specularColor = new BABYLON.Color3(0.0, 0.0, 0.0);
}

player.controller.action.handler.keyboard = function(e) {
  if (e.sourceEvent.type == "keydown") {
    if (e.sourceEvent.key == conf.keyboard.move.left) {
      player.controller.action.move.x = 1.0;
    } else if (e.sourceEvent.key == conf.keyboard.move.right) {
      player.controller.action.move.x = -1.0;
    }
    if (e.sourceEvent.key == conf.keyboard.move.forward) {
      player.controller.action.move.z = -1.0;
    } else if (e.sourceEvent.key == conf.keyboard.move.backward) {
      player.controller.action.move.z = 1.0;
    }
    if (e.sourceEvent.key == conf.keyboard.jump) {
      player.controller.action.jump = true;
    }
  } else {
    if (e.sourceEvent.key == conf.keyboard.move.left) {
      player.controller.action.move.x = 0.0;
    } else if (e.sourceEvent.key == conf.keyboard.move.right) {
      player.controller.action.move.x = 0.0;
    }
    if (e.sourceEvent.key == conf.keyboard.move.forward) {
      player.controller.action.move.z = 0.0;
    } else if (e.sourceEvent.key == conf.keyboard.move.backward) {
      player.controller.action.move.z = 0.0;
    }
    if (e.sourceEvent.key == conf.keyboard.jump) {
      player.controller.action.jump = false;
    }
  }
}

player.controller.action.handler.gamepad = function() {
  let gamepads = navigator.getGamepads();
  for (let a = 0; a < gamepads.length; a++) {
    if (gamepads[a]) {
      if (conf.gamepad.move.reversed.x) {
        player.controller.action.move.x = -gamepads[a].axes[conf.gamepad.move.axis.x];
      } else {
        player.controller.action.move.x = gamepads[a].axes[conf.gamepad.move.axis.x];
      }
      if (conf.gamepad.move.reversed.z) {
        player.controller.action.move.z = -gamepads[a].axes[conf.gamepad.move.axis.z];
      } else {
        player.controller.action.move.z = gamepads[a].axes[conf.gamepad.move.axis.z];
      }
      if (conf.gamepad.angle.reversed.x) {
        player.controller.action.angle.x = -gamepads[a].axes[conf.gamepad.angle.axis.x];
      } else {
        player.controller.action.angle.x = gamepads[a].axes[conf.gamepad.angle.axis.x];
      }
      if (conf.gamepad.angle.reversed.y) {
        player.controller.action.angle.y = -gamepads[a].axes[conf.gamepad.angle.axis.y];
      } else {
        player.controller.action.angle.y = gamepads[a].axes[conf.gamepad.angle.axis.y];
      }
      if (gamepads[a].buttons[conf.gamepad.jump].pressed) {
        player.controller.action.jump = true;
      } else {
        player.controller.action.jump = false;
      }
    }
  }
}

player.controller.action.handler.main = function() {
  player.controller.action.handler.gamepad();
  player.position.current.vector3 = player.mesh.position.clone();
  player.position.current.grid = game.cube.grid(player.position.current.vector3);
  player.position.next.vector3 = player.mesh.position.clone();
  player.position.next.vector3.x += Math.sin(game.camera.alpha - conf.camera.angle.origin.x) * player.controller.action.move.x;
  player.position.next.vector3.x += Math.cos(game.camera.alpha - conf.camera.angle.origin.x) * player.controller.action.move.z;
  player.position.next.vector3.z -= Math.cos(game.camera.alpha - conf.camera.angle.origin.x) * player.controller.action.move.x;
  player.position.next.vector3.z += Math.sin(game.camera.alpha - conf.camera.angle.origin.x) * player.controller.action.move.z;
  if (game.fields[game.active_field].map[player.position.current.grid.z][player.position.current.grid.y - 1][player.position.current.grid.x] == -1) {
    player.position.next.vector3.y = player.position.next.vector3.y - conf.fields[game.active_field].cube.size * player.fallSpeed;
    player.fallSpeed += 0.01; 
  } else {
    if (player.controller.action.jump) {
      player.position.next.vector3.y = player.position.next.vector3.y + conf.fields[game.active_field].cube.size;
    }
    player.fallSpeed = 0.1;
  }
  player.position.next.grid = game.cube.grid(player.position.next.vector3);
  if (game.cube.get(player.position.next.grid.x, player.position.current.grid.y, player.position.current.grid.z) < 0) {
    player.mesh.position.x = player.position.next.vector3.x;
  }
  if (game.cube.get(player.position.current.grid.x, player.position.next.grid.y, player.position.current.grid.z) < 0) {
    player.mesh.position.y = player.position.next.vector3.y;
  }
  if (game.cube.get(player.position.current.grid.x, player.position.current.grid.y, player.position.next.grid.z) < 0) {
    player.mesh.position.z = player.position.next.vector3.z;
  }
  game.camera.alpha += conf.gamepad.angle.step * player.controller.action.angle.x;
  if (game.camera.alpha > conf.camera.angle.origin.x + Math.PI * 2.0) {
    game.camera.alpha = game.camera.alpha - Math.PI * 2.0;
  } else if (game.camera.alpha < conf.camera.angle.origin.x - Math.PI * 2.0) {
    game.camera.alpha = game.camera.alpha + Math.PI * 2.0;
  }
  player.mesh.rotation.y = -game.camera.alpha;
  game.camera.beta += conf.gamepad.angle.step * player.controller.action.angle.y;
}

