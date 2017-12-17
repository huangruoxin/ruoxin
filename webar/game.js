Config.isAlpha = true;
Laya3D.init(0, 0, true,true);

Laya.stage.bgColor = 'none'
Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;


// var d3s = new Laya.Scene()
// var scene = Laya.stage.addChild(d3s);

// var camera = scene.addChild(new Laya.Camera(0, 0.1, 100));
// camera.transform.translate(new Laya.Vector3(0, 0.5, 1));
// camera.transform.rotate(new Laya.Vector3( -15, 0, 0), true, false);
// camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;

// Laya.loader.create("./LayaMonkey.lh", Laya.Handler.create(this, onComplete));
// var layaMonkey
// function onComplete (argument) {
// 	layaMonkey = scene.addChild(Laya.Sprite3D.load("./LayaMonkey.lh"));
// 	Laya.timer.frameLoop(1, this, animate);

// }
// var _position = new Laya.Vector3();
// var _outPos = new Laya.Vector3();
// var scaleDelta = 0;
// function animate() {

//     _position.x = Math.sin(scaleDelta += 0.01);
//     layaMonkey.transform.position = _position;

//     camera.viewport.project(layaMonkey.transform.position, camera.projectionViewMatrix, _outPos);

   
// }

var d3s = new Laya.Scene()
var scene = Laya.stage.addChild(d3s);

var vrCamera = scene.addChild(new Laya.Camera(0, 0.1, 100));
vrCamera.transform.translate(new Laya.Vector3(0.1, 1, 0.2));
//vrCamera.transform.translate(new Laya.Vector3(0, 0.35, 1));
//vrCamera.transform.translate(new Laya.Vector3(0.5, 0, 0));
//vrCamera.transform.translate(new Laya.Vector3(0, 0.35, 1));
//vrCamera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
vrCamera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
vrCamera.addComponent(VRCameraMoveScript);

Laya.loader.create("./LayaMonkey.lh", Laya.Handler.create(this, onComplete));
var layaMonkey;
var ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
var point = new Laya.Vector2();
var _outHitAllInfo = new Array();
function onComplete (argument) {

	layaMonkey = scene.addChild(Laya.Sprite3D.load("./LayaMonkey.lh"));
	layaMonkey.name = 'monkey';
	Laya.timer.frameLoop(1, this, checkHit);
	Laya.stage.on(Laya.Event.MOUSE_UP, this, function () {
        console.log("==========333=" + _outHitAllInfo.length)
        for (var i = 0; i < _outHitAllInfo.length; i++) {
            console.log(_outHitAllInfo[i].name+"===========")
        }
        
    });



}

function checkHit(){
	point.elements[0] = Laya.MouseManager.instance.mouseX;
    point.elements[1] = Laya.MouseManager.instance.mouseY;
    vrCamera.viewportPointToRay(point, ray);

    //射线检测获取所有检测碰撞到的物体
    Laya.Physics.rayCast(ray, _outHitAllInfo, 330, 30);
}


if (!navigator.getUserMedia) {
	var skyDome = new Laya.SkyDome();
	vrCamera.sky = skyDome;
	skyDome.texture = Laya.Texture2D.load("./Assets/LayaMonkey/env.png");
}
