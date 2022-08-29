import mixin from './mixin';

const Utils = {
  foo() {
    console.log('foo');
  }
};

class Jumpable {
  z = 0;
  jump() {
    this.z = 1;
  }
}
 
class Duckable {
  duck() {}
}
 
class Sprite {
  x = 0;
  y = 0;
  static Utils = Utils;
}

interface Sprite extends Jumpable, Duckable {}

mixin(Sprite, [
  Jumpable,
  Duckable,
]);
 
let player = new Sprite();
console.log(player.x, player.y, player.z);
player.jump();
console.log(player.x, player.y, player.z);

Sprite.Utils.foo();
