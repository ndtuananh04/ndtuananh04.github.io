// import * as THREE from 'three';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;

// function animate() {
// 	requestAnimationFrame( animate );

// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;

// 	renderer.render( scene, camera );
// }

// animate();

// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// let scene, camera, renderer, hlight;

// function initScene(){
// 	scene = new THREE.Scene;

// 	camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 45, 30000);
// 	camera.position.set(-900, -200, -900);

// 	renderer = new THREE.WebGLRenderer({antialias:true});
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// 	document.body.appendChild(renderer.domElement);

// 	let controls = new OrbitControls(camera, renderer.domElement);
// 	controls.addEventListener('change', renderer);

// 	let materialArray = [];
// 	let texture_ft = new THREE.TextureLoader().load('images/arid_ft.jpg')
// 	let texture_bk = new THREE.TextureLoader().load('images/arid_bk.jpg')
// 	let texture_up = new THREE.TextureLoader().load('images/arid_up.jpg')
// 	let texture_dn = new THREE.TextureLoader().load('images/arid_dn.jpg')
// 	let texture_rt = new THREE.TextureLoader().load('images/arid_rt.jpg')
// 	let texture_lf = new THREE.TextureLoader().load('images/arid_lf.jpg')

// 	materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
// 	materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
// 	materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
// 	materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
// 	materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
// 	materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));

// 	for(let i=0; i<6; i++) {
// 		materialArray[i].side = THREE.BackSide;
// 	}

// 	let skyboxGeo = new THREE.BoxGeometry(10000,10000,10000);
// 	let skybox = new THREE.Mesh(skyboxGeo, materialArray);
// 	scene.add(skybox);

// 	animate();
// }
// function animate() {
// 	renderer.render(scene,camera);
// 	requestAnimationFrame(animate);
// }

// initScene();

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import  Stats  from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
        
        this.clock = new THREE.Clock();
        
		this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
		this.camera.position.set( 0, 1.6, 3 );
        
		this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x505050 );

		this.scene.add( new THREE.HemisphereLight( 0x606060, 0x404040 ) );

        const light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 1 ).normalize();
		this.scene.add( light );
			
		this.renderer = new THREE.WebGLRenderer({ antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        
		container.appendChild( this.renderer.domElement );
        
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.target.set(0, 1.6, 0);
        this.controls.update();
        
        this.stats = new Stats();
        container.appendChild( this.stats.dom );
        
        this.initScene();
        this.setupXR();
        
        window.addEventListener('resize', this.resize.bind(this) );
        
        this.renderer.setAnimationLoop( this.render.bind(this) );
	}	
    
    random( min, max ){
        return Math.random() * (max-min) + min;
    }
    
    initScene(){
        this.radius = 0.08;

		this.room = new THREE.LineSegments(
			new BoxLineGeometry(6,6,6,10,10,10),
			new THREE.LineBasicMaterial( {color: 0x808080} )
		);
		this.room.geometry.translate(0,3,0);
		this.scene.add(this.room);

		const geometry = new THREE.IcosahedronGeometry(this.radius, 2);

		for(let i = 0; i<200; i++) {
			const object = new THREE.Mesh( geometry, new
				THREE.MeshLambertMaterial( {
					color: Math.random() * 0xFFFFFF
				}));

				object.position.x = this.random(-2,2);
				object.position.y = this.random(-2,2);
				object.position.z = this.random(-2,2);

				this.room.add(object);
		}
    }
    
    setupXR(){
        this.renderer.xr.enabled = true;
		document.body.appendChild( VRButton.createButton(this.render));
    }
    
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );  
    }
    
	render( ) {   
        this.stats.update();
        
        this.renderer.render( this.scene, this.camera );
    }
}

export { App };