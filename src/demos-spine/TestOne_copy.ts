import { BaseDemo } from "../demos/BaseDemo";
import dragonBones from "../lib/dragonBones";
import { Loader } from "pixi.js";

window.PIXI = PIXI;
import "../lib/pixi-spine";

export default class Dragon extends BaseDemo {
	public constructor() {
    super();

    const data = Loader.shared.resources["spine/dragon.json"].spineData;
    const animation = new PIXI.spine.Spine( data );
    animation.state.setAnimation(0, 'flying', true);
    this.addChild(animation);
  }
  
  public destroy( ...rest:any[] ) {
    super.destroy( ...rest )
  }
}
