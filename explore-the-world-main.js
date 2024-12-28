let game = {};
game.init = function(){};
game.update = function(){};
game.engine = null;
game.scene = null;
game.camera = null;
game.skybox = null;
game.light = [];
game.fields = [];
game.active_field = 0;

let conf = {};
conf.camera = {};
conf.camera.radius = 30.0;
conf.camera.angle = {};
conf.camera.angle.origin = {};
conf.camera.angle.origin.x = 0.0;
conf.camera.angle.origin.y = Math.PI * 1.0 / 3.0;
conf.camera.angle.limit = {};
conf.camera.angle.limit.x = (Math.PI * 2.1);
conf.camera.angle.limit.y = Math.PI / 6.0;
conf.skybox = {};
conf.skybox.size = 1000;
conf.light = [];
conf.light.push({});
conf.light[0].x = 1000;
conf.light[0].y = 1000;
conf.light[0].z = 1000;
conf.light.push({});
conf.light[1].x = -1000;
conf.light[1].y = -1000;
conf.light[1].z = -1000;

game.update = function() {
  player.controller.action.handler.main();
  game.scene.render();
}

game.init = function() {
  game.canvas = document.getElementById("game-screen");
  game.engine = new BABYLON.Engine(game.canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true
  });
  game.scene = new BABYLON.Scene(game.engine);
  game.scene.actionManager = new BABYLON.ActionManager(game.scene);
  game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, player.controller.action.handler.keyboard));
  game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, player.controller.action.handler.keyboard));
  game.camera = new BABYLON.ArcRotateCamera("Camera", 0.0, 0.0, 0.0, new BABYLON.Vector3(0.0, 0.0, 0.0), game.scene);
  game.camera.position = new BABYLON.Vector3(0.0, 100.0, 0.0);
  game.camera.radius = conf.camera.radius;
  game.camera.lowerRadiusLimit = conf.camera.radius;
  game.camera.upperRadiusLimit = conf.camera.radius;
  game.camera.alpha = conf.camera.angle.origin.x;
  game.camera.lowerAlphaLimit = conf.camera.angle.origin.x - conf.camera.angle.limit.x;
  game.camera.upperAlphaLimit = conf.camera.angle.origin.x + conf.camera.angle.limit.x;
  game.camera.beta = conf.camera.angle.origin.y;
  game.camera.lowerBetaLimit = conf.camera.angle.origin.y - conf.camera.angle.limit.y;
  game.camera.upperBetaLimit = conf.camera.angle.origin.y + conf.camera.angle.limit.y;
  game.camera.attachControl(game.canvas, true);
  game.skybox = BABYLON.Mesh.CreateBox("SkyBox", conf.skybox.size, game.scene);
  game.skybox.material = new BABYLON.StandardMaterial("SkyBox", game.scene);
  game.skybox.material.backFaceCulling = false;
  game.skybox.material.reflectionTexture = new BABYLON.CubeTexture("assets/TODO", game.scene, [
    ".png", ".png", ".png", ".png", ".png", ".png"
  ]);
  game.skybox.material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  game.skybox.material.diffuseColor = new BABYLON.Color3(0.0, 0.0, 0.0);
  game.skybox.material.specularColor = new BABYLON.Color3(0.0, 0.0, 0.0);
  for (let a = 0; a < conf.light.length; a++) {
    game.light.push(null);
    game.light[a] = new BABYLON.DirectionalLight("Light", new BABYLON.Vector3(conf.light[a].x, conf.light[a].y, conf.light[a].z), game.scene);  
    game.light[a].intensity = 1.0;
  }
  game.fields[game.active_field].generate();
  player.init();
  game.camera.target = player.mesh;
  game.camera.lockedTarget = player.mesh;
  game.engine.runRenderLoop(game.update);
}

window.addEventListener("load", game.init);

