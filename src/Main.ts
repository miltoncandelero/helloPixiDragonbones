import { Container } from "pixi.js";
import { Preloader } from "./demos/Preloader";
import dat from "dat.gui";
import { HelloDragonBones } from "./demos/HelloDragonBones";
import { AnimationBase } from "./demos/AnimationBase";
import { DragonBonesEvent } from "./demos/DragonBonesEvent";
import { AnimationLayer } from "./demos/AnimationLayer";
import { BoneOffset } from "./demos/BoneOffset";
import { InverseKinematics } from "./demos/InverseKinematics";
import { BoundingBox } from "./demos/BoundingBox";
import { MultiTextureAltas } from "./demos/MultiTextureAltas";
import { ReplaceSlotDisplay } from "./demos/ReplaceSlotDisplay";
import { ReplaceSkin } from "./demos/ReplaceSkin";
import { ReplaceAnimation } from "./demos/ReplaceAnimation";
import { Game } from "./demos/CoreElement";
import { PerformanceTest } from "./demos/PerformanceTest";
import { EyeTracking } from "./demos/EyeTracking";

export class Main extends Container {
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

		const gui = new dat.GUI();
		gui.add(this, "helloDragonBones");
		gui.add(this, "animationBase");
		gui.add(this, "dragonBonesEvent");
		gui.add(this, "animationLayer");
		gui.add(this, "boneOffset");
		gui.add(this, "inverseKinematics");
		gui.add(this, "boundingBox");
		gui.add(this, "multiTextureAltas");
		gui.add(this, "replaceSlotDisplay");
		gui.add(this, "replaceSkin");
		gui.add(this, "replaceAnimation");
		gui.add(this, "coreElement");
		gui.add(this, "eyeTracking");
		gui.add(this, "performanceTest");

		this.currentDemo = new HelloDragonBones();
		this.addChild(this.currentDemo);
	}

	public helloDragonBones() {
		this.removeChild(this.currentDemo);
		this.currentDemo.destroy({ children: true });
		this.currentDemo = new HelloDragonBones();
		this.addChild(this.currentDemo);
	}
	public animationBase() {
		this.removeChild(this.currentDemo);
		this.currentDemo.destroy({ children: true });
		this.currentDemo = new AnimationBase();
		this.addChild(this.currentDemo);
	}
	public dragonBonesEvent() {
		this.removeChild(this.currentDemo);
		this.currentDemo.destroy({ children: true });
		this.currentDemo = new DragonBonesEvent();
		this.addChild(this.currentDemo);
	}
	public animationLayer() {
		this.removeChild(this.currentDemo);
		this.currentDemo.destroy({ children: true });
		this.currentDemo = new AnimationLayer();
		this.addChild(this.currentDemo);
	}
	public boneOffset() {
		this.removeChild(this.currentDemo);
		this.currentDemo.destroy({ children: true });
		this.currentDemo = new BoneOffset();
		this.addChild(this.currentDemo);
	}
	public inverseKinematics() {
		this.removeChild(this.currentDemo);
		this.currentDemo.destroy({ children: true });
		this.currentDemo = new InverseKinematics();
		this.addChild(this.currentDemo);
	}
	public boundingBox() {
		this.removeChild(this.currentDemo);
		this.currentDemo.destroy({ children: true });
		this.currentDemo = new BoundingBox();
		this.addChild(this.currentDemo);
	}
	public multiTextureAltas() {
		this.removeChild(this.currentDemo);
		this.currentDemo.destroy({ children: true });
		this.currentDemo = new MultiTextureAltas();
		this.addChild(this.currentDemo);
	}
	public replaceSlotDisplay() {
		this.removeChild(this.currentDemo);
		this.currentDemo.destroy({ children: true });
		this.currentDemo = new ReplaceSlotDisplay();
		this.addChild(this.currentDemo);
	}
	public replaceSkin() {
		this.removeChild(this.currentDemo);
		this.currentDemo.destroy({ children: true });
		this.currentDemo = new ReplaceSkin();
		this.addChild(this.currentDemo);
	}
	public replaceAnimation() {
		this.removeChild(this.currentDemo);
		this.currentDemo.destroy({ children: true });
		this.currentDemo = new ReplaceAnimation();
		this.addChild(this.currentDemo);
	}
	public coreElement() {
		this.removeChild(this.currentDemo);
		this.currentDemo.destroy({ children: true });
		this.currentDemo = new Game();
		this.addChild(this.currentDemo);
	}
	public eyeTracking() {
		this.removeChild(this.currentDemo);
		this.currentDemo.destroy({ children: true });
		this.currentDemo = new EyeTracking();
		this.addChild(this.currentDemo);
	}
	public performanceTest() {
		this.removeChild(this.currentDemo);
		this.currentDemo.destroy({ children: true });
		this.currentDemo = new PerformanceTest();
		this.addChild(this.currentDemo);
	}
}
