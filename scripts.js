import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();

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