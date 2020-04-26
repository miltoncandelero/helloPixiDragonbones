import { DisplayObject, Point, interaction } from "pixi.js";
import dragonBones from "../lib/dragonBones";

export class DragHelper {
	private static _instance: DragHelper = new DragHelper();
	public static getInstance(): DragHelper {
		return DragHelper._instance;
	}

	public stage: DisplayObject;

	private readonly _helpPoint: Point = new Point();
	private readonly _dragOffset: Point = new Point();
	private _dragDisplayObject: DisplayObject | null = null;

	public enableDrag(displayObject: DisplayObject): void {
		displayObject.interactive = true;
		displayObject.addListener("touchstart", this._dragHandler, this);
		displayObject.addListener("touchend", this._dragHandler, this);
		displayObject.addListener("mousedown", this._dragHandler, this);
		displayObject.addListener("mouseup", this._dragHandler, this);
	}

	public disableDrag(displayObject: DisplayObject): void {
		displayObject.removeListener("touchstart", this._dragHandler, this);
		displayObject.removeListener("touchend", this._dragHandler, this);
		displayObject.removeListener("mousedown", this._dragHandler, this);
		displayObject.removeListener("mouseup", this._dragHandler, this);
	}

	private _dragHandler(event: interaction.InteractionEvent): void {
		switch (event.type) {
			case "touchstart":
			case "mousedown":
				if (this._dragDisplayObject) {
					return;
				}

				this._dragDisplayObject = event.target;

				const armatureDisplay = this._dragDisplayObject.parent as dragonBones.PixiArmatureDisplay;
				const bone = armatureDisplay.armature.getBoneByDisplay(this._dragDisplayObject);

				if (bone) {
					this._helpPoint.x = event.data.global.x;
					this._helpPoint.y = event.data.global.y;
					armatureDisplay.toLocal(this._helpPoint, this.stage, this._helpPoint);

					if (bone.offsetMode !== dragonBones.OffsetMode.Override) {
						bone.offsetMode = dragonBones.OffsetMode.Override;
						bone.offset.x = bone.global.x;
						bone.offset.y = bone.global.y;
					}

					this._dragOffset.x = bone.offset.x - this._helpPoint.x;
					this._dragOffset.y = bone.offset.y - this._helpPoint.y;

					this.stage.addListener("touchmove", this._dragHandler, this);
					this.stage.addListener("mousemove", this._dragHandler, this);
				}
				break;

			case "touchend":
			case "mouseup":
				if (this._dragDisplayObject) {
					this.stage.removeListener("touchmove", this._dragHandler, this);
					this.stage.removeListener("mousemove", this._dragHandler, this);
					this._dragDisplayObject = null;
				}
				break;

			case "touchmove":
			case "mousemove":
				if (this._dragDisplayObject) {
					const armatureDisplay = this._dragDisplayObject.parent as dragonBones.PixiArmatureDisplay;
					const bone = armatureDisplay.armature.getBoneByDisplay(this._dragDisplayObject);

					if (bone) {
						this._helpPoint.x = event.data.global.x;
						this._helpPoint.y = event.data.global.y;
						armatureDisplay.toLocal(this._helpPoint, this.stage, this._helpPoint);
						bone.offset.x = this._helpPoint.x + this._dragOffset.x;
						bone.offset.y = this._helpPoint.y + this._dragOffset.y;
						bone.invalidUpdate();
					}
				}
				break;
		}
	}
}
