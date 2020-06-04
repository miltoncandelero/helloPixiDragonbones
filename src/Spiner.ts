import { Container } from "pixi.js";
import { Preloader } from "./core/Preloader";
import { AnimationBase } from "./demos/AnimationBase";
import { EyeTracking } from "./demos/EyeTracking";
import TestOne from "./demos-spine/TestOne";
import TestOne_copy from "./demos-spine/TestOne_copy";
import dat from "dat.gui";

type DemoClass = new () => AnimationBase

export class Spiner extends Container {
	private preloader: Preloader;
	private currentDemo: Container;
	constructor() {
		super();
		this.preloader = new Preloader(this.onAssetsLoaded.bind(this));
		this.addChild(this.preloader);
	}

	private onAssetsLoaded() {
		this.removeChild(this.preloader);
    this.preloader.destroy({ children: true });

    const gui = new dat.GUI({ closed : false });
    const addDemo = ( DemoClass:DemoClass ) =>
      gui.add({ [DemoClass.name] : () => this.setDemo( DemoClass ) }, DemoClass.name );

    addDemo( <any>TestOne );
    addDemo( <any>TestOne_copy );
    addDemo( <any>AnimationBase );
    addDemo( <any>EyeTracking );

		this.setDemo( TestOne as any );
  }
  
	public setDemo( DemoClass:DemoClass ) {
    if ( this.currentDemo ) {
      this.removeChild(this.currentDemo);
      this.currentDemo.destroy({ children: true });
    }
    if ( DemoClass ) {
      this.currentDemo = new DemoClass();
      this.addChild(this.currentDemo);
    }
	}
}
