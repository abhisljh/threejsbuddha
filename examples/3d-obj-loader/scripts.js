var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.5, 1000 );
camera.position.z = 10;


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('/examples/3d-obj-loader/assets/');
mtlLoader.setPath('/examples/3d-obj-loader/assets/');
mtlLoader.load('r2-d2.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/examples/3d-obj-loader/assets/');
    objLoader.load('Buddha.obj', function (object) {
		
		
		
        scene.add(object);
        object.position.y -= 2;
		
		
		
		var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
	//object.rotation.x += 0.001;
		object.rotation.y += 0.01;
	
};

animate();






		
		


	
    });
	
	
	//adding stars here 
		
		let starGeo, stars;
		
		starGeo = new THREE.Geometry();
for(let i=0;i<6000;i++) {
     star = new THREE.Vector3(
    Math.random() * 600 - 300,
    Math.random() * 600 - 300,
    Math.random() * 600 - 300
  );
  
  
  star.velocity = 0;
star.acceleration = 0.02;
  starGeo.vertices.push(star);
}


let sprite = new THREE.TextureLoader().load( '/examples/3d-obj-loader/assets/starn.png' );
let starMaterial = new THREE.PointsMaterial({
  color: 0xaaaaaa,
  size: 0.7,
  map: sprite
});


stars = new THREE.Points(starGeo,starMaterial);
scene.add(stars);
		
	animate();	
		
		    function animate() {
      starGeo.vertices.forEach(p => {
        p.velocity += p.acceleration
        p.y -= p.velocity;
        
        if (p.y < -200) {
          p.y = 200;
          p.velocity = 0;
        }
      });
      starGeo.verticesNeedUpdate = true; 
	  stars.rotation.x +=0.003;
	  renderer.render(scene,camera);
	  requestAnimationFrame(animate);
			}
		
		
		
		//ending stars here 

});

