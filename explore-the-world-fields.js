conf.fields = [];
game.fields.push({});
game.fields[0].generate = function(){};
game.fields[0].ground = {};
game.fields[0].ground.meshes = [];
conf.fields.push({});
conf.fields[0].ground = {};
conf.fields[0].ground.size = {};
conf.fields[0].ground.size.x = 50;
conf.fields[0].ground.size.y = 1;
conf.fields[0].ground.size.z = 50;
conf.fields[0].ground.cube = {};
conf.fields[0].ground.cube.texture = "assets/TODO.png";
conf.fields[0].ground.cube.size = 10;
conf.fields[0].cube = [];

game.fields[0].generate = function() {
  for (let z = 0; z < conf.fields[0].ground.size.z; z++) {
    let cz = z - Math.floor(conf.fields[0].ground.size.z / 2);
    game.fields[0].ground.meshes.push([]);
    for (let y = 0; y < conf.fields[0].ground.size.y; y++) {
      let cy = y - Math.floor(conf.fields[0].ground.size.y / 2);
      game.fields[0].ground.meshes[z].push([]);
      for (let x = 0; x < conf.fields[0].ground.size.x; x++) {
        let cx = x - Math.floor(conf.fields[0].ground.size.x / 2);
        game.fields[0].ground.meshes[z][y].push(null);
        game.fields[0].ground.meshes[z][y][x] = BABYLON.MeshBuilder.CreateBox('Cube', {
          width: conf.fields[0].ground.cube.size, 
          height: conf.fields[0].ground.cube.size, 
          depth: conf.fields[0].ground.cube.size
        }, game.scene);
        game.fields[0].ground.meshes[z][y][x].material = new BABYLON.StandardMaterial("cube", game.scene);
        game.fields[0].ground.meshes[z][y][x].material.diffuseTexture = new BABYLON.Texture(conf.fields[0].ground.cube.texture, game.scene);
        game.fields[0].ground.meshes[z][y][x].material.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
        game.fields[0].ground.meshes[z][y][x].material.specularColor = new BABYLON.Color3(0.0, 0.0, 0.0);
        game.fields[0].ground.meshes[z][y][x].position.x = cx * conf.fields[0].ground.cube.size;
        game.fields[0].ground.meshes[z][y][x].position.y = cy * conf.fields[0].ground.cube.size;
        game.fields[0].ground.meshes[z][y][x].position.z = cz * conf.fields[0].ground.cube.size;
      }
    }
  }
}

