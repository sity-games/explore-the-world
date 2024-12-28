let game = {};
game.engine = null;
game.scene = null;
game.camera = null;
game.ground = null;
game.skybox = null;

function rad(degree) {
  return degree / 180 * Math.PI;
}

function game_screen_update() {
  game.scene.render();
}

function game_init() {
  game.canvas = document.getElementById("game-screen");
  game.engine = new BABYLON.Engine(game.canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true
  });
  game.scene = new BABYLON.Scene(game.engine);
  game.camera = new BABYLON.ArcRotateCamera("Camera", rad(30), rad(30), 10, new BABYLON.Vector3(0, 8, 0), game.scene);
  game.camera.setPosition(new BABYLON.Vector3(0.0, 0.0, 0.0));
  game.ground = BABYLON.Mesh.CreateGround("Ground", 1000, 1000, game.scene, false);
  game.ground.material = new BABYLON.StandardMaterial("Ground", game.scene);
  game.ground.material.diffuseTexture = new BABYLON.Texture("assets/TODO.png", game.scene);
  game.ground.material.diffuseTexture.uScale = 1000;
  game.ground.material.diffuseTexture.vScale = 1000;
  game.ground.material.specularColor = new BABYLON.Color3(1, 0, 0);
  game.skybox = BABYLON.Mesh.CreateBox("SkyBox", 800.0, game.scene);
  game.skybox.material = new BABYLON.StandardMaterial("SkyBox", game.scene);
  game.skybox.material.backFaceCulling = false;
  game.skybox.material.reflectionTexture = new BABYLON.CubeTexture("assets/TODO", game.scene, [
    ".png", ".png", ".png", ".png", ".png", ".png"
  ]);
  game.skybox.material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  game.skybox.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
  game.skybox.material.specularColor = new BABYLON.Color3(0, 0, 0);
  game.camera.attachControl(game.canvas, true);
  game.engine.runRenderLoop(game_screen_update);
}

function init() {
  game_init();
}

window.addEventListener("load", init);

