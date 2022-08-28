import mixin from './mixin';

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
}
 
interface Sprite extends Jumpable, Duckable {}

mixin(Sprite, [Jumpable, Duckable]);
 
let player = new Sprite();
console.log(player.x, player.y, player.z);
player.jump();
console.log(player.x, player.y, player.z);
