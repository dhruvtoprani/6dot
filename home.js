window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("viewer");
  
    // Set up scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
  
    // Light
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0x222222, 1.2);
    scene.add(ambientLight);
  
    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
  
    // Load model
    const loader = new THREE.STLLoader();
    loader.load("assets/model.stl", geometry => {
      const material = new THREE.MeshStandardMaterial({
        color: 0xe63946,
        metalness: 0.3,
        roughness: 0.4,
      });
      const mesh = new THREE.Mesh(geometry, material);
  
      // Center model
      geometry.computeBoundingBox();
      const center = new THREE.Vector3();
      geometry.boundingBox.getCenter(center);
      mesh.position.sub(center);
  
      // Optional scale tweak
      mesh.scale.set(0.8, 0.8, 0.8);
  
      scene.add(mesh);
      animate();
    });
  
    camera.position.z = 5;
  
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
  
    window.addEventListener("resize", () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  });