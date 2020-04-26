import { Container } from "pixi.js";
import { Preloader } from "./demos/Preloader";

export class Main extends Container {
	private preloader: Preloader;
	constructor() {
		super();
		this.preloader = new Preloader(this.onAssetsLoaded.bind(this));
		this.addChild(this.preloader);
	}

	private onAssetsLoaded() {
		this.removeChild(this.preloader);
		this.preloader.destroy({ children: true });
	}
}
