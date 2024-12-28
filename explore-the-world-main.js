let game = {};
game.init = function(){};
game.update = function(){};
game.engine = null;
game.scene = null;
game.camera = null;
game.skybox = null;
game.light = null;
game.ground = null;

let conf = {};
conf.skybox = {};
conf.skybox.size = 1000;
conf.ground = {};
conf.ground.size = {};
conf.ground.size.x = 100;
conf.ground.size.y = 100;
conf.ground.tile = {};
conf.ground.tile.texture = "assets/TODO.png";
conf.ground.tile.size = {};
conf.ground.tile.size.u = 20;
conf.ground.tile.size.v = 20;
conf.camera = {};
conf.camera.speed = 2.0;
conf.camera.angle = {};
conf.camera.angle.offset = {};
conf.camera.angle.offset.x = -Math.PI / 2.0;
conf.camera.angle.offset.y = Math.PI / 2.0;
conf.camera.angle.limit = {};
conf.camera.angle.limit.x = (Math.PI * 2.1);
conf.camera.angle.limit.y = (Math.PI / 2.0) * 0.9;
conf.camera.radius = 0.0;

game.update = function() {
  controller.action.handler.main();
  game.scene.render();
}

game.init = function() {
  game.canvas = document.getElementById("game-screen");
  game.engine = new BABYLON.Engine(game.canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true
  });
  game.scene = new BABYLON.Scene(game.engine);
  game.camera = new BABYLON.UniversalCamera("Camera");
  game.camera.position = new BABYLON.Vector3(10.0, 0.0, 0.0);
  game.camera.speed = conf.camera.speed;
  game.camera.alpha = conf.camera.angle.offset.x;
  game.camera.beta = conf.camera.angle.offset.y;
  game.camera.lowerAlphaLimit = conf.camera.angle.offset.x - conf.camera.angle.limit.x;
  game.camera.upperAlphaLimit = conf.camera.angle.offset.x + conf.camera.angle.limit.x;
  game.camera.lowerBetaLimit = conf.camera.angle.offset.y - conf.camera.angle.limit.y;
  game.camera.upperBetaLimit = conf.camera.angle.offset.y + conf.camera.angle.limit.y;
  game.camera.radius = conf.camera.radius;
  game.camera.attachControl(game.canvas, true);
  game.skybox = BABYLON.Mesh.CreateBox("SkyBox", conf.skybox.size, game.scene);
  game.skybox.material = new BABYLON.StandardMaterial("SkyBox", game.scene);
  game.skybox.material.backFaceCulling = false;
  game.skybox.material.reflectionTexture = new BABYLON.CubeTexture("assets/TODO", game.scene, [
    ".png", ".png", ".png", ".png", ".png", ".png"
  ]);
  game.skybox.material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  game.skybox.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
  game.skybox.material.specularColor = new BABYLON.Color3(0, 0, 0);
  game.light = new BABYLON.DirectionalLight("Light", new BABYLON.Vector3(1000, -1000, 1000), game.scene);  
  game.light.intensity = 1.0;
  game.ground = new BABYLON.Mesh.CreateGround("Ground", conf.ground.size.x, conf.ground.size.y, 1, game.scene, false);
  game.ground.material = new BABYLON.StandardMaterial("Ground", game.scene);
  game.ground.material.diffuseTexture = new BABYLON.Texture(conf.ground.tile.texture, game.scene);
  game.ground.material.diffuseTexture.uScale = conf.ground.tile.size.u;
  game.ground.material.diffuseTexture.vScale = conf.ground.tile.size.v;
  game.ground.material.specularColor = new BABYLON.Color3(0, 0, 0);
  game.engine.runRenderLoop(game.update);
}

window.addEventListener("load", game.init);

