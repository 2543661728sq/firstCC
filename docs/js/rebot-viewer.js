(function () {
  const canvas = document.getElementById('rebotModelCanvas');
  const fallback = document.querySelector('.rebot-model-fallback');

  if (!canvas || !window.THREE || !THREE.GLTFLoader) {
    if (fallback) fallback.classList.add('is-visible');
    return;
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf3f7f4);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 1000);
  camera.position.set(4.8, 3.2, 6.2);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;

  const hemi = new THREE.HemisphereLight(0xffffff, 0x9aa7a0, 1.7);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(5, 6, 4);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xb9fff1, 0.75);
  fill.position.set(-5, 2, -3);
  scene.add(fill);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(3.2, 96),
    new THREE.MeshBasicMaterial({ color: 0xe0e9e4, transparent: true, opacity: 0.72 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.45;
  scene.add(floor);

  const group = new THREE.Group();
  scene.add(group);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(rect.width, 320);
    const height = Math.max(rect.height, 280);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function frameObject(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 3.8 / maxDim : 1;
    object.scale.setScalar(scale);
    object.rotation.set(-0.28, -0.65, 0.06);
  }

  new THREE.GLTFLoader().load(
    'images/case-rebot/rebot_b601_dm_from_step.glb',
    (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.metalness = Math.min(child.material.metalness || 0.15, 0.45);
            child.material.roughness = Math.max(child.material.roughness || 0.55, 0.42);
          }
        }
      });
      frameObject(model);
      group.add(model);
      if (fallback) fallback.classList.remove('is-visible');
    },
    undefined,
    () => {
      if (fallback) fallback.classList.add('is-visible');
    }
  );

  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += 0.0035;
    renderer.render(scene, camera);
  }

  resize();
  animate();
  window.addEventListener('resize', resize, { passive: true });
})();
