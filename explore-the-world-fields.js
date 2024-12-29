conf.fields = [];
game.fields.push({});
game.fields[0].map = [];
game.fields[0].generate = function(){};
game.fields[0].cubes = [];
game.fields[0].cubes.push({});
game.fields[0].cubes[0].meshes = [];
game.cube = {};
game.cube.vector3 = function(grid){};
game.cube.grid = function(position){};
game.cube.get = function(grid){};
conf.fields.push({});
conf.fields[0].map = {};
conf.fields[0].map.size = {};
conf.fields[0].map.size.x = 100;
conf.fields[0].map.size.y = 100;
conf.fields[0].map.size.z = 100;
conf.fields[0].cube = {};
conf.fields[0].cube.size = 10;
conf.fields[0].cubes = [];
conf.fields[0].cubes.push({});
conf.fields[0].cubes[0].texture = "assets/TODO.png";

game.cube.vector3 = function(grid) {
  let x = (grid.x - Math.ceil(conf.fields[0].map.size.x / 2)) * conf.fields[game.active_field].cube.size;
  let y = (grid.y - Math.ceil(conf.fields[0].map.size.y / 2)) * conf.fields[game.active_field].cube.size;
  let z = (grid.z - Math.ceil(conf.fields[0].map.size.z / 2)) * conf.fields[game.active_field].cube.size;
  let position = new BABYLON.Vector3(x, y, z);
  return position;
}
game.cube.grid = function(position) {
  let x, y, z;
  if (position.x > 0) {
    x = Math.ceil(position.x / conf.fields[game.active_field].cube.size) + Math.ceil(conf.fields[0].map.size.x / 2);
  } else {
    x = Math.floor(position.x / conf.fields[game.active_field].cube.size) + Math.ceil(conf.fields[0].map.size.x / 2);
  }
  if (position.y > 0) {
    y = Math.floor(position.y / conf.fields[game.active_field].cube.size) + Math.ceil(conf.fields[0].map.size.y / 2);
  } else {
    y = Math.ceil(position.y / conf.fields[game.active_field].cube.size) + Math.ceil(conf.fields[0].map.size.y / 2);
  }
  if (position.z > 0) {
    z = Math.ceil(position.z / conf.fields[game.active_field].cube.size) + Math.ceil(conf.fields[0].map.size.z / 2);
  } else {
    z = Math.floor(position.z / conf.fields[game.active_field].cube.size) + Math.ceil(conf.fields[0].map.size.z / 2);
  }
  return {x:x, y:y, z:z};
}
game.cube.get = function(x, y, z) {
  if (typeof game.fields[game.active_field].map[z] !== 'undefined') {
    if (typeof game.fields[game.active_field].map[z][y] !== 'undefined') {
      if (typeof game.fields[game.active_field].map[z][y][x] !== 'undefined') {
        return game.fields[game.active_field].map[z][y][x];
      }
    }
  }
  return 65535;
}

game.fields[0].generate = function() {
  for (let z = 0; z < conf.fields[0].map.size.z; z++) {
    game.fields[0].map.push([]);
    game.fields[0].cubes[0].meshes.push([]);
    for (let y = 0; y < conf.fields[0].map.size.y; y++) {
      game.fields[0].map[z].push([]);
      for (let x = 0; x < conf.fields[0].map.size.x; x++) {
        game.fields[0].map[z][y].push(-1);
        if (y == 0 || (y == 1 && (x == 0 || x == conf.fields[0].map.size.x - 1 || z == 0 || z == conf.fields[0].map.size.z - 1))) {
          game.fields[0].cubes[0].meshes[z].push(null);
          game.fields[0].cubes[0].meshes[z][x] = BABYLON.MeshBuilder.CreateBox('Cube', {
            width: conf.fields[0].cube.size, 
            height: conf.fields[0].cube.size, 
            depth: conf.fields[0].cube.size
          }, game.scene);
          game.fields[0].cubes[0].meshes[z][x].material = new BABYLON.StandardMaterial("cube", game.scene);
          game.fields[0].cubes[0].meshes[z][x].material.diffuseTexture = new BABYLON.Texture(conf.fields[0].cubes[0].texture, game.scene);
          game.fields[0].cubes[0].meshes[z][x].material.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
          game.fields[0].cubes[0].meshes[z][x].material.specularColor = new BABYLON.Color3(0.0, 0.0, 0.0);
          game.fields[0].cubes[0].meshes[z][x].position = game.cube.vector3({x:x, y:y, z:z});
          game.fields[0].map[z][y][x] = 0; 
        }
      }
    }
  }
}

