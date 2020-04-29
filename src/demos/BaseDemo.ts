import { Container, Sprite, Text } from "pixi.js";
import { WIDTH, HEIGHT } from "..";
import dragonBones from "../lib/dragonBones";

export abstract class BaseDemo extends Container {
	protected readonly _background: Sprite = Sprite.from("dragon/background.png");
	protected readonly _resources: string[] = [];

	public constructor() {
		super();
		dragonBones.PixiFactory.factory.clear();

		this.x = this.stageWidth * 0.5;
		this.y = this.stageHeight * 0.5;
		this._background.anchor.set(0.5);
		this.addChild(this._background);
	}

	public createText(string: string): Text {
		const text = new Text(string, { align: "center" });
		text.text = string;
		text.x = -text.width * 0.5;
		text.y = this.stageHeight * 0.5 - 100.0;
		this.addChild(text);

		return text;
	}

	public get stageWidth(): number {
		return WIDTH;
	}

	public get stageHeight(): number {
		return HEIGHT;
	}
}
