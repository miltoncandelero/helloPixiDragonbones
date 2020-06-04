import { BaseDemo } from "../demos/BaseDemo";
import dragonBones from "../lib/dragonBones";
import { Loader } from "pixi.js";

window.PIXI = PIXI;
import "../lib/pixi-spine";

/**
 * How to use
 * 1. Load data.
 *
 * 2. Parse data.
 *    factory.parseDragonBonesData();
 *    factory.parseTextureAtlasData();
 *
 * 3. Build armature.
 *    armatureDisplay = factory.buildArmatureDisplay("armatureName");
 *
 * 4. Play animation.
 *    armatureDisplay.animation.play("animationName");
 *
 * 5. Add armature to stage.
 *    addChild(armatureDisplay);
 */
export class TestOne extends BaseDemo {
	public constructor() {
    super();

    const data = Loader.shared.resources["spine/spineboy-pro.json"].spineData;
    const animation = new PIXI.spine.Spine( data );
    this.addChild(animation);
    
    if (animation.state.hasAnimation('run')) {
      animation.state.setAnimation(0, 'run', true);
      animation.state.timeScale = 0.1;
    }
    
		animation.y = 300.0;
  }
  
  public destroy( ...rest:any[] ) {
    super.destroy( ...rest )
  }
}
