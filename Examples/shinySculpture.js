/*jshint esversion: 6 */
// @ts-check

/*
 * Graphics Town Example Objects
 *
 * Shiny Sculpture - really just a floating sphere, but the point is to
 * show how dynamic environment maps can be done within the framework with
 * very little code.
 * 
 * Some things to note:
 * - we need to pass the world to the object constructor so it knows what things
 *   to draw in the reflections
 * - we set the near plane of the cube camera to be outside of the "sculpture"
 *   so we don't just take a picture of the inside of the sculpture
 */

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("../THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

// we need the GrObject
import { GrObject } from "../Framework/GrObject.js";
// we only need this for type info
import { GrWorld } from "../Framework/GrWorld.js";

export class ShinySculpture extends GrObject {
    /**
     * 
     * @param {GrWorld} world 
     */
    constructor(world) {
        let group = new T.Group();
        super("ShinySculpture",group);

        this.world = world;
        this.cubecam = new T.CubeCamera(1,1000,128);
        this.sculptureGeom = new T.SphereBufferGeometry(2,20,10);
        this.sculptureMaterial = new T.MeshStandardMaterial(
            {
                color: "white",
                roughness : 0.2,
                // @ts-ignore   // envMap has the wrong type
                envMap : this.cubecam.renderTarget
            });
        this.sculpture = new T.Mesh(this.sculptureGeom, this.sculptureMaterial);
        group.add(this.cubecam);
        group.add(this.sculpture);

        group.translateY(2);
    }

    advance(delta, timeOfDay) {
        this.cubecam.update(this.world.renderer,this.world.scene);
    }
}