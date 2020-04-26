import { BaseDemo } from "./BaseDemo";
import dragonBones from "../lib/dragonBones";
import { Loader } from "pixi.js";

export class ReplaceSkin extends BaseDemo {
	private _replaceSuitIndex: number = 0;
	private readonly _factory: dragonBones.PixiFactory = dragonBones.PixiFactory.factory;
	private readonly _suitConfigs: string[][] = [];
	private readonly _replaceSuitParts: string[] = [];
	private _armatureDisplay: dragonBones.PixiArmatureDisplay;

	public constructor() {
		super();

		this._suitConfigs.push([
			//"20509005", //! something about these two crash
			"2010600a",
			"2010600a_1",
			"20208003",
			"20208003_1",
			"20208003_2",
			"20208003_3",
			"20405006",
			"20703016",
			"20703016_1",
			"2080100c",
			"2080100e",
			"2080100e_1",
			"20803005",
			"2080500b",
			"2080500b_1",
		]);

		this._suitConfigs.push([
			//"20106010", //! something about these two crash
			"20106010_1",
			"20208006",
			"20208006_1",
			"20208006_2",
			"20208006_3",
			"2040600b",
			"2040600b_1",
			"20509007",
			"20703020",
			"20703020_1",
			"2080b003",
			"20801015",
		]);

		this._factory.parseDragonBonesData(Loader.shared.resources["dragon/you_xin/body/body_ske.json"].data);
		this._factory.parseTextureAtlasData(Loader.shared.resources["dragon/you_xin/body/body_tex.json"].data, Loader.shared.resources["dragon/you_xin/body/body_tex.png"].texture);

		for (let i = 0, l = this._suitConfigs.length; i < l; ++i) {
			for (const partArmatureName of this._suitConfigs[i]) {
				const path = "dragon/you_xin/" + "suit" + (i + 1) + "/" + partArmatureName + "/" + partArmatureName;
				const dragonBonesJSONPath = path + "_ske.json";
				const textureAtlasJSONPath = path + "_tex.json";
				const textureAtlasPath = path + "_tex.png";
				//
				this._factory.parseDragonBonesData(Loader.shared.resources[dragonBonesJSONPath].data);
				this._factory.parseTextureAtlasData(Loader.shared.resources[textureAtlasJSONPath].data, Loader.shared.resources[textureAtlasPath].texture);
			}
		}
		//
		this._armatureDisplay = this._factory.buildArmatureDisplay("body");
		this._armatureDisplay.on(dragonBones.EventObject.LOOP_COMPLETE, this._animationEventHandler, this);
		this._armatureDisplay.animation.play("idle", 0);
		//
		this._armatureDisplay.x = 0.0;
		this._armatureDisplay.y = 200.0;
		this._armatureDisplay.scale.x = this._armatureDisplay.scale.y = 0.25;
		this.addChild(this._armatureDisplay);
		// Init the first suit.
		for (const part of this._suitConfigs[1]) {
			const partArmatureData = this._factory.getArmatureData(part);
			this._factory.replaceSkin(this._armatureDisplay.armature, partArmatureData.defaultSkin);
		}
		for (const part of this._suitConfigs[0]) {
			const partArmatureData = this._factory.getArmatureData(part);
			this._factory.replaceSkin(this._armatureDisplay.armature, partArmatureData.defaultSkin);
		}
		//
		this.interactive = true;
		const touchHandler = () => {
			this._randomReplaceSkin();
		};
		this.addListener("touchstart", touchHandler, this);
		this.addListener("mousedown", touchHandler, this);
		//
		this.createText("Touch to replace armature skin.");
	}

	private _animationEventHandler(_event: dragonBones.EventObject): void {
		// Random animation index.
		const animationIndex = Math.floor(Math.random() * this._armatureDisplay.animation.animationNames.length);
		const animationName = this._armatureDisplay.animation.animationNames[animationIndex];
		// Play animation.
		this._armatureDisplay.animation.fadeIn(animationName, 0.3, 0);
	}

	private _randomReplaceSkin(): void {
		// This suit has been replaced, next suit.
		if (this._replaceSuitParts.length === 0) {
			this._replaceSuitIndex++;

			if (this._replaceSuitIndex >= this._suitConfigs.length) {
				this._replaceSuitIndex = 0;
			}

			// Refill the unset parits.
			for (const partArmatureName of this._suitConfigs[this._replaceSuitIndex]) {
				this._replaceSuitParts.push(partArmatureName);
			}
		}

		// Random one part in this suit.
		const partIndex = 0; // Math.floor(Math.random() * this._replaceSuitParts.length);
		const partArmatureName = this._replaceSuitParts[partIndex];
		const partArmatureData = this._factory.getArmatureData(partArmatureName);
		// Replace skin.
		this._factory.replaceSkin(this._armatureDisplay.armature, partArmatureData.defaultSkin);
		// Remove has been replaced
		this._replaceSuitParts.splice(partIndex, 1);
	}
}
