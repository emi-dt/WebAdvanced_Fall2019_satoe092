
var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
};

window.addEventListener('load', init, false);

var game;
var deltaTime = 0;
var newTime = new Date().getTime();
var oldTime = new Date().getTime();

function resetGame(){
	game = {speed:0,
			initSpeed:.00035,
			baseSpeed:.00035,
			targetBaseSpeed:.00035,
			incrementSpeedByTime:.0000025,
			incrementSpeedByLevel:.000005,
			distanceForSpeedUpdate:100,
			speedLastUpdate:0,
  
			distance:0,
			ratioSpeedDistance:50,
			energy:100,
			ratioSpeedEnergy:3,
  
			level:1,
			levelLastUpdate:0,
			distanceForLevelUpdate:1000,
  
			planeDefaultHeight:100,
			planeAmpHeight:80,
			planeAmpWidth:75,
			planeMoveSensivity:0.005,
			planeRotXSensivity:0.0008,
			planeRotZSensivity:0.0004,
			planeFallSpeed:.001,
			planeMinSpeed:1.2,
			planeMaxSpeed:1.6,
			planeSpeed:0,
			planeCollisionDisplacementX:0,
			planeCollisionSpeedX:0,
  
			planeCollisionDisplacementY:0,
			planeCollisionSpeedY:0,
  
			seaRadius:600,
			seaLength:800,
			//seaRotationSpeed:0.006,
			wavesMinAmp : 5,
			wavesMaxAmp : 20,
			wavesMinSpeed : 0.001,
			wavesMaxSpeed : 0.003,
  
			cameraFarPos:500,
			cameraNearPos:150,
			cameraSensivity:0.002,
  
			coinDistanceTolerance:15,
			coinValue:3,
			coinsSpeed:.5,
			coinLastSpawn:0,
			distanceForCoinsSpawn:100,
  
			ennemyDistanceTolerance:10,
			ennemyValue:10,
			ennemiesSpeed:.6,
			ennemyLastSpawn:0,
			distanceForEnnemiesSpawn:50,
  
			status : "playing",
		   };
	// fieldLevel.innerHTML = Math.floor(game.level);
  }

function init() {
	// set up the scene, the camera and the renderer
	resetGame();
	createScene();

	// add the lights
	createLights();

	// add the objects
	createPlane();

  // start a loop that will update the objects' positions 
	// and render the scene on each frame
	loop();
}

var scene,
		camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
		renderer, container;

function createScene() {
	// Get the width and the height of the screen,
	// use them to set up the aspect ratio of the camera 
	// and the size of the renderer.
	HEIGHT = 100;
	WIDTH = 130;

	// Create the scene
	scene = new THREE.Scene();

	// Add a fog effect to the scene; same color as the
	// background color used in the style sheet
	scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
	
	// Create the camera
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 60;
	nearPlane = .1;
	farPlane = 10000;
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
		);
	
	// Set the position of the camera
	camera.position.x = 0;
	camera.position.z = 200;
	camera.position.y = 100;
	
	// Create the renderer
	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.setSize(WIDTH, HEIGHT);
	
	// Enable shadow rendering
	renderer.shadowMap.enabled = true;
	
	// Add the DOM element of the renderer to the 
	// container we created in the HTML
	container = document.getElementById('character-world');
	container.appendChild(renderer.domElement);
}

var hemisphereLight, shadowLight;

function createLights() {
	// A hemisphere light is a gradient colored light; 
	// the first parameter is the sky color, the second parameter is the ground color, 
	// the third parameter is the intensity of the light
	hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
	
	// A directional light shines from a specific direction. 
	// It acts like the sun, that means that all the rays produced are parallel. 
	shadowLight = new THREE.DirectionalLight(0xffffff, .9);

	// Set the direction of the light  
	shadowLight.position.set(150, 350, 350);
	
	// Allow shadow casting 
	shadowLight.castShadow = true;

	// define the visible area of the projected shadow
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	// define the resolution of the shadow; the higher the better, 
	// but also the more expensive and less performant
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;
	
	// to activate the lights, just add them to the scene
	scene.add(hemisphereLight);  
	scene.add(shadowLight);
}

function normalize(v,vmin,vmax,tmin, tmax){
	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;
}

function loop(){
	newTime = new Date().getTime();
	deltaTime = newTime-oldTime;
	oldTime = newTime;

	updatePlane();  
	airplane.propeller.rotation.x +=.2 + game.planeSpeed * deltaTime*.005;

	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}

function updatePlane(){
	game.planeSpeed = normalize(0,-.5,.5,game.planeMinSpeed, game.planeMaxSpeed);
	var targetY = normalize(0,-.75,.75,game.planeDefaultHeight-game.planeAmpHeight, game.planeDefaultHeight+game.planeAmpHeight);
	var targetX = normalize(0,-1,1,-game.planeAmpWidth*.7, -game.planeAmpWidth);

	game.planeCollisionDisplacementX += game.planeCollisionSpeedX;
	targetX += game.planeCollisionDisplacementX;


	game.planeCollisionDisplacementY += game.planeCollisionSpeedY;
	targetY += game.planeCollisionDisplacementY;

	airplane.mesh.position.y += (targetY-airplane.mesh.position.y)*deltaTime*game.planeMoveSensivity;
	airplane.mesh.position.x += (targetX-airplane.mesh.position.x)*deltaTime*game.planeMoveSensivity + 2;

	airplane.mesh.rotation.z = (targetY-airplane.mesh.position.y)*deltaTime*game.planeRotXSensivity;
	airplane.mesh.rotation.x = (airplane.mesh.position.y-targetY)*deltaTime*game.planeRotZSensivity;
	var targetCameraZ = normalize(game.planeSpeed, game.planeMinSpeed, game.planeMaxSpeed, game.cameraNearPos, game.cameraFarPos);
	camera.fov = normalize(0,-1,1,40, 80);
	camera.updateProjectionMatrix ()
	camera.position.y += (airplane.mesh.position.y - camera.position.y)*deltaTime*game.cameraSensivity;

	game.planeCollisionSpeedX += (0-game.planeCollisionSpeedX)*deltaTime * 0.03;
	game.planeCollisionDisplacementX += (0-game.planeCollisionDisplacementX)*deltaTime *0.01;
	game.planeCollisionSpeedY += (0-game.planeCollisionSpeedY)*deltaTime * 0.03;
	game.planeCollisionDisplacementY += (0-game.planeCollisionDisplacementY)*deltaTime *0.01;
}

var Pilot = function(){
	this.mesh = new THREE.Object3D();
	this.mesh.name = "pilot";
	this.angleHairs=0;
  
	var bodyGeom = new THREE.BoxGeometry(15,15,15);
	var bodyMat = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
	var body = new THREE.Mesh(bodyGeom, bodyMat);
	body.position.set(2,-12,0);
  
	this.mesh.add(body);
  
	var faceGeom = new THREE.BoxGeometry(10,10,10);
	var faceMat = new THREE.MeshLambertMaterial({color:Colors.pink});
	var face = new THREE.Mesh(faceGeom, faceMat);
	this.mesh.add(face);
  
	var hairGeom = new THREE.BoxGeometry(4,4,4);
	var hairMat = new THREE.MeshLambertMaterial({color:Colors.brown});
	var hair = new THREE.Mesh(hairGeom, hairMat);
	hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,2,0));
	var hairs = new THREE.Object3D();
  
	this.hairsTop = new THREE.Object3D();
  
	for (var i=0; i<12; i++){
	  var h = hair.clone();
	  var col = i%3;
	  var row = Math.floor(i/3);
	  var startPosZ = -4;
	  var startPosX = -4;
	  h.position.set(startPosX + row*4, 0, startPosZ + col*4);
	  h.geometry.applyMatrix(new THREE.Matrix4().makeScale(1,1,1));
	  this.hairsTop.add(h);
	}
	hairs.add(this.hairsTop);
  
	var hairSideGeom = new THREE.BoxGeometry(12,4,2);
	hairSideGeom.applyMatrix(new THREE.Matrix4().makeTranslation(-6,0,0));
	var hairSideR = new THREE.Mesh(hairSideGeom, hairMat);
	var hairSideL = hairSideR.clone();
	hairSideR.position.set(8,-2,6);
	hairSideL.position.set(8,-2,-6);
	hairs.add(hairSideR);
	hairs.add(hairSideL);
  
	var hairBackGeom = new THREE.BoxGeometry(2,8,10);
	var hairBack = new THREE.Mesh(hairBackGeom, hairMat);
	hairBack.position.set(-1,-4,0)
	hairs.add(hairBack);
	hairs.position.set(-5,5,0);
  
	this.mesh.add(hairs);
  
	var glassGeom = new THREE.BoxGeometry(5,5,5);
	var glassMat = new THREE.MeshLambertMaterial({color:Colors.brown});
	var glassR = new THREE.Mesh(glassGeom,glassMat);
	glassR.position.set(6,0,3);
	var glassL = glassR.clone();
	glassL.position.z = -glassR.position.z
  
	var glassAGeom = new THREE.BoxGeometry(11,1,11);
	var glassA = new THREE.Mesh(glassAGeom, glassMat);
	this.mesh.add(glassR);
	this.mesh.add(glassL);
	this.mesh.add(glassA);
  
	var earGeom = new THREE.BoxGeometry(2,3,2);
	var earL = new THREE.Mesh(earGeom,faceMat);
	earL.position.set(0,0,-6);
	var earR = earL.clone();
	earR.position.set(0,0,6);
	this.mesh.add(earL);
	this.mesh.add(earR);
  }
  
  Pilot.prototype.updateHairs = function(){
	//*
	 var hairs = this.hairsTop.children;
  
	 var l = hairs.length;
	 for (var i=0; i<l; i++){
		var h = hairs[i];
		h.scale.y = .75 + Math.cos(this.angleHairs+i/3)*.25;
	 }
	this.angleHairs += game.speed*deltaTime*40;
	//*/
  }

var AirPlane = function(){
	this.mesh = new THREE.Object3D();
	this.mesh.name = "airPlane";
  
	// Cabin
  
	var geomCabin = new THREE.BoxGeometry(80,50,50,1,1,1);
	var matCabin = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
  
	geomCabin.vertices[4].y-=10;
	geomCabin.vertices[4].z+=20;
	geomCabin.vertices[5].y-=10;
	geomCabin.vertices[5].z-=20;
	geomCabin.vertices[6].y+=30;
	geomCabin.vertices[6].z+=20;
	geomCabin.vertices[7].y+=30;
	geomCabin.vertices[7].z-=20;
  
	var cabin = new THREE.Mesh(geomCabin, matCabin);
	cabin.castShadow = true;
	cabin.receiveShadow = true;
	this.mesh.add(cabin);
  
	// Engine
  
	var geomEngine = new THREE.BoxGeometry(20,50,50,1,1,1);
	var matEngine = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
	var engine = new THREE.Mesh(geomEngine, matEngine);
	engine.position.x = 50;
	engine.castShadow = true;
	engine.receiveShadow = true;
	this.mesh.add(engine);
  
	// Tail Plane
  
	var geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
	var matTailPlane = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
	tailPlane.position.set(-40,20,0);
	tailPlane.castShadow = true;
	tailPlane.receiveShadow = true;
	this.mesh.add(tailPlane);
  
	// Wings
  
	var geomSideWing = new THREE.BoxGeometry(30,5,120,1,1,1);
	var matSideWing = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
	sideWing.position.set(0,15,0);
	sideWing.castShadow = true;
	sideWing.receiveShadow = true;
	this.mesh.add(sideWing);
  
	var geomWindshield = new THREE.BoxGeometry(3,15,20,1,1,1);
	var matWindshield = new THREE.MeshPhongMaterial({color:Colors.white,transparent:true, opacity:.3, shading:THREE.FlatShading});;
	var windshield = new THREE.Mesh(geomWindshield, matWindshield);
	windshield.position.set(5,27,0);
  
	windshield.castShadow = true;
	windshield.receiveShadow = true;
  
	this.mesh.add(windshield);
  
	var geomPropeller = new THREE.BoxGeometry(20,10,10,1,1,1);
	geomPropeller.vertices[4].y-=5;
	geomPropeller.vertices[4].z+=5;
	geomPropeller.vertices[5].y-=5;
	geomPropeller.vertices[5].z-=5;
	geomPropeller.vertices[6].y+=5;
	geomPropeller.vertices[6].z+=5;
	geomPropeller.vertices[7].y+=5;
	geomPropeller.vertices[7].z-=5;
	var matPropeller = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
	this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
  
	this.propeller.castShadow = true;
	this.propeller.receiveShadow = true;
  
	var geomBlade = new THREE.BoxGeometry(1,80,10,1,1,1);
	var matBlade = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});
	var blade1 = new THREE.Mesh(geomBlade, matBlade);
	blade1.position.set(8,0,0);
  
	blade1.castShadow = true;
	blade1.receiveShadow = true;
  
	var blade2 = blade1.clone();
	blade2.rotation.x = Math.PI/2;
  
	blade2.castShadow = true;
	blade2.receiveShadow = true;
  
	this.propeller.add(blade1);
	this.propeller.add(blade2);
	this.propeller.position.set(60,0,0);
	this.mesh.add(this.propeller);
  
	var wheelProtecGeom = new THREE.BoxGeometry(30,15,10,1,1,1);
	var wheelProtecMat = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	var wheelProtecR = new THREE.Mesh(wheelProtecGeom,wheelProtecMat);
	wheelProtecR.position.set(25,-20,25);
	this.mesh.add(wheelProtecR);
  
	var wheelTireGeom = new THREE.BoxGeometry(24,24,4);
	var wheelTireMat = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});
	var wheelTireR = new THREE.Mesh(wheelTireGeom,wheelTireMat);
	wheelTireR.position.set(25,-28,25);
  
	var wheelAxisGeom = new THREE.BoxGeometry(10,10,6);
	var wheelAxisMat = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
	var wheelAxis = new THREE.Mesh(wheelAxisGeom,wheelAxisMat);
	wheelTireR.add(wheelAxis);
  
	this.mesh.add(wheelTireR);
  
	var wheelProtecL = wheelProtecR.clone();
	wheelProtecL.position.z = -wheelProtecR.position.z ;
	this.mesh.add(wheelProtecL);
  
	var wheelTireL = wheelTireR.clone();
	wheelTireL.position.z = -wheelTireR.position.z;
	this.mesh.add(wheelTireL);
  
	var wheelTireB = wheelTireR.clone();
	wheelTireB.scale.set(.5,.5,.5);
	wheelTireB.position.set(-35,-5,0);
	this.mesh.add(wheelTireB);
  
	var suspensionGeom = new THREE.BoxGeometry(4,20,4);
	suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,10,0))
	var suspensionMat = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	var suspension = new THREE.Mesh(suspensionGeom,suspensionMat);
	suspension.position.set(-35,-5,0);
	suspension.rotation.z = -.3;
	this.mesh.add(suspension);
  
	this.pilot = new Pilot();
	this.pilot.mesh.position.set(-10,27,0);
	this.mesh.add(this.pilot.mesh);
  
  
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;
  
  };

var airplane;

function createPlane(){ 
	airplane = new AirPlane();
	airplane.mesh.scale.set(1.5,1.5,1.5);
	airplane.mesh.position.y = 100;
	scene.add(airplane.mesh);
}



