import { BaseDemo } from "./BaseDemo";
import dragonBones from "../lib/dragonBones";
import { Loader } from "pixi.js";
export class AnimationLayer extends BaseDemo {
	private _armatureDisplay: dragonBones.PixiArmatureDisplay;

	public constructor() {
		super();

		const factory = dragonBones.PixiFactory.factory;
		factory.parseDragonBonesData(Loader.shared.resources["dragon/mecha_1004d/mecha_1004d_ske.json"].data);
		factory.parseTextureAtlasData(
			Loader.shared.resources["dragon/mecha_1004d/mecha_1004d_tex.json"].data,
			Loader.shared.resources["dragon/mecha_1004d/mecha_1004d_tex.png"].texture
		);

		this._armatureDisplay = factory.buildArmatureDisplay("mecha_1004d");
		this._armatureDisplay.on(dragonBones.EventObject.LOOP_COMPLETE, this._animationEventHandler, this);
		this._armatureDisplay.animation.play("walk");

		this._armatureDisplay.x = 0.0;
		this._armatureDisplay.y = 100.0;
		this.addChild(this._armatureDisplay);
	}

	private _animationEventHandler(_event: dragonBones.EventObject): void {
		let attackState = this._armatureDisplay.animation.getState("attack_01");
		if (!attackState) {
			attackState = this._armatureDisplay.animation.fadeIn("attack_01", 0.1, 1, 1);
			attackState.resetToPose = false;
			attackState.autoFadeOutTime = 0.1;
			attackState.addBoneMask("chest");
			attackState.addBoneMask("effect_l");
			attackState.addBoneMask("effect_r");
		}
	}
}
