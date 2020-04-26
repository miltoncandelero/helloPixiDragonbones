import { BaseDemo } from "./BaseDemo";
import dragonBones from "../lib/dragonBones";
import { Loader } from "pixi.js";

export class DragonBonesEvent extends BaseDemo {
	private _armatureDisplay: dragonBones.PixiArmatureDisplay;

	public constructor() {
		super();

		const factory = dragonBones.PixiFactory.factory;
		factory.parseDragonBonesData(Loader.shared.resources["dragon/mecha_1004d/mecha_1004d_ske.json"].data);
		factory.parseTextureAtlasData(
			Loader.shared.resources["dragon/mecha_1004d/mecha_1004d_tex.json"].data,
			Loader.shared.resources["dragon/mecha_1004d/mecha_1004d_tex.png"].texture
		);
		factory.soundEventManager.on(dragonBones.EventObject.SOUND_EVENT, this._soundEventHandler, this);

		this._armatureDisplay = factory.buildArmatureDisplay("mecha_1004d");
		this._armatureDisplay.on(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);
		this._armatureDisplay.animation.play("walk");

		this._armatureDisplay.x = 0.0;
		this._armatureDisplay.y = 100.0;
		this.addChild(this._armatureDisplay);
		//
		this.interactive = true;
		const touchHandler = () => {
			this._armatureDisplay.animation.fadeIn("skill_03", 0.2);
		};
		this.addListener("mousedown", touchHandler, this);
		this.addListener("touchstart", touchHandler, this);
		//
		this.createText("Touch to play animation.");
	}

	private _soundEventHandler(event: dragonBones.EventObject): void {
		console.log(event.name);
	}

	private _animationEventHandler(event: dragonBones.EventObject): void {
		if (event.animationState.name === "skill_03") {
			this._armatureDisplay.animation.fadeIn("walk", 0.2);
		}
	}
}
