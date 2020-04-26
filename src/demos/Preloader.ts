import { Container, Loader, LoaderResource } from "pixi.js";
import dragonBones from "../lib/dragonBones";
import { WIDTH, HEIGHT } from "..";

export class Preloader extends Container {
	private _armatureDisplay: dragonBones.PixiArmatureDisplay;

	private preloader: Loader;

	private allDragonBonesFiles = [
		// for AnimationBase
		"dragon/progress_bar/progress_bar_ske.json",
		"dragon/progress_bar/progress_bar_tex.json",
		"dragon/progress_bar/progress_bar_tex.png",

		// for AnimationLayer & DragonBonesEvents
		"dragon/mecha_1004d/mecha_1004d_ske.json",
		"dragon/mecha_1004d/mecha_1004d_tex.json",
		"dragon/mecha_1004d/mecha_1004d_tex.png",

		// for BaseDemo
		"dragon/background.png",

		// for BoneOffset
		"dragon/bullet_01/bullet_01_ske.json",
		"dragon/bullet_01/bullet_01_tex.json",
		"dragon/bullet_01/bullet_01_tex.png",

		// for BoundingBox and ReplaceAnimation
		"dragon/mecha_2903/mecha_2903_ske.json",
		"dragon/mecha_2903/mecha_2903_tex.json",
		"dragon/mecha_2903/mecha_2903_tex.png",
		"dragon/bounding_box_tester/bounding_box_tester_ske.json",
		"dragon/bounding_box_tester/bounding_box_tester_tex.json",
		"dragon/bounding_box_tester/bounding_box_tester_tex.png",

		// for CoreElement
		"dragon/mecha_1502b/mecha_1502b_ske.json",
		"dragon/mecha_1502b/mecha_1502b_tex.json",
		"dragon/mecha_1502b/mecha_1502b_tex.png",
		"dragon/skin_1502b/skin_1502b_ske.json",
		"dragon/skin_1502b/skin_1502b_tex.json",
		"dragon/skin_1502b/skin_1502b_tex.png",
		"dragon/weapon_1000/weapon_1000_ske.json",
		"dragon/weapon_1000/weapon_1000_tex.json",
		"dragon/weapon_1000/weapon_1000_tex.png",

		// for EyeTracking
		"dragon/shizuku/shizuku_ske.json",
		"dragon/shizuku/shizuku.1024/texture_00.png",
		"dragon/shizuku/shizuku.1024/texture_01.png",
		"dragon/shizuku/shizuku.1024/texture_02.png",
		"dragon/shizuku/shizuku.1024/texture_03.png",

		// for HelloDragonBones
		"dragon/mecha_1002_101d_show/mecha_1002_101d_show_ske.json",
		"dragon/mecha_1002_101d_show/mecha_1002_101d_show_ske.dbbin",
		"dragon/mecha_1002_101d_show/mecha_1002_101d_show_tex.json",
		"dragon/mecha_1002_101d_show/mecha_1002_101d_show_tex.png",

		// for InverseKinematics && PerformanceTest
		"dragon/mecha_1406/mecha_1406_ske.json",
		"dragon/mecha_1406/mecha_1406_tex.json",
		"dragon/mecha_1406/mecha_1406_tex.png",
		"dragon/floor_board/floor_board_ske.json",
		"dragon/floor_board/floor_board_tex.json",
		"dragon/floor_board/floor_board_tex.png",

		// for MultiTextureAtlas
		"dragon/effect/effect_ske.json",
		"dragon/effect/effect_tex.json",
		"dragon/effect/effect_tex.png",
		"dragon/effect/effect_sd_tex.json",
		"dragon/effect/effect_sd_tex.png",

		// for ReplaceSkins
		"dragon/you_xin/body/body_ske.json",
		"dragon/you_xin/body/body_tex.json",
		"dragon/you_xin/body/body_tex.png",

		// for ReplaceSlotDisplay
		"dragon/mecha_1004d_show/mecha_1004d_show_ske.json",
		"dragon/mecha_1004d_show/mecha_1004d_show_tex.json",
		"dragon/mecha_1004d_show/mecha_1004d_show_tex.png",
		"dragon/weapon_1004_show/weapon_1004_show_ske.json",
		"dragon/weapon_1004_show/weapon_1004_show_tex.json",
		"dragon/weapon_1004_show/weapon_1004_show_tex.png",
	];
	private onComplete: Function;

	public constructor(onComplete: Function) {
		super();

		this.onComplete = onComplete;

		LoaderResource.setExtensionLoadType("dbbin", LoaderResource.LOAD_TYPE.XHR);
		LoaderResource.setExtensionXhrType("dbbin", LoaderResource.XHR_RESPONSE_TYPE.BUFFER);

		this.preloader = new Loader();
		this.preloader.add(["dragon/progress_bar/progress_bar_ske.json", "dragon/progress_bar/progress_bar_tex.json", "dragon/progress_bar/progress_bar_tex.png"]);
		this.preloader.onComplete.once(this.buildPreloader, this);
		this.preloader.load();
	}

	protected buildPreloader(): void {
		console.log("loaded");
		const factory = dragonBones.PixiFactory.factory;
		factory.parseDragonBonesData(this.preloader.resources["dragon/progress_bar/progress_bar_ske.json"].data);
		factory.parseTextureAtlasData(
			this.preloader.resources["dragon/progress_bar/progress_bar_tex.json"].data,
			this.preloader.resources["dragon/progress_bar/progress_bar_tex.png"].texture
		);
		//
		this._armatureDisplay = factory.buildArmatureDisplay("progress_bar");
		this._armatureDisplay.x = 0.0;
		this._armatureDisplay.y = 0.0;
		this.addChild(this._armatureDisplay);
		// Add animation event listener.
		this._armatureDisplay.animation.gotoAndStopByProgress("idle", 0);
		this._armatureDisplay.x = WIDTH / 2;
		this._armatureDisplay.y = HEIGHT / 2;

		//Preloader built. Loading real assets...
		Loader.shared.add(this.allDragonBonesFiles);
		const detach = Loader.shared.onProgress.add(this.onProgress, this);
		Loader.shared.onComplete.once(() => {
			Loader.shared.onProgress.detach(detach);
			this.onComplete();
		});

		Loader.shared.load();
	}
	onProgress(loader: Loader) {
		this._armatureDisplay.animation.gotoAndStopByProgress("idle", loader.progress / 100);
	}
}
