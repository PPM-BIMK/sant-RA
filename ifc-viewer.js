import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.140.0/examples/jsm/controls/OrbitControls.js';
import { IFCLoader } from 'https://cdn.jsdelivr.net/npm/three@0.140.0/examples/jsm/loaders/IFCLoader.js';

// web-ifc.wasm lives alongside IFCLoader.js in three's own examples tree at this version.
const WASM_PATH = 'https://cdn.jsdelivr.net/npm/three@0.140.0/examples/jsm/loaders/ifc/';

// IFCSITE — hidden after load so the flat terrain/site slab doesn't clutter the view.
const IFCSITE = 4097777520;

// Creates a self-contained IFC viewer bound to one <canvas>.
// onStatus(text) is called with short human-readable status/error strings.
export function createIfcViewer(canvas, onStatus = () => {}) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 5000);
  camera.position.set(15, 15, 15);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x555555, 1.2));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(10, 20, 10);
  scene.add(dirLight);

  const ifcLoader = new IFCLoader();
  ifcLoader.ifcManager.setWasmPath(WASM_PATH);

  const loadedModels = [];

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / Math.max(rect.height, 1);
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  function frameAll() {
    if (!loadedModels.length) return;
    const box = new THREE.Box3();
    loadedModels.forEach(m => box.expandByObject(m));
    const size = box.getSize(new THREE.Vector3()).length() || 10;
    const center = box.getCenter(new THREE.Vector3());
    camera.position.copy(center).add(new THREE.Vector3(size, size, size).multiplyScalar(0.6));
    controls.target.copy(center);
    controls.update();
  }

  function clearModels() {
    loadedModels.forEach(m => scene.remove(m));
    loadedModels.length = 0;
  }

  async function loadModels(files) {
    clearModels();
    if (!files.length) { onStatus('Ingen modell valgt.'); return; }

    const loadable = files.filter(f => f.url);
    const missing = files.filter(f => !f.url);

    if (!loadable.length) {
      onStatus(`Ikke tilgjengelig: ${missing.map(f => f.label).join(', ')}`);
      return;
    }

    onStatus(`Laster ${loadable.length} modell${loadable.length > 1 ? 'er' : ''} …`);
    try {
      for (const file of loadable) {
        const model = await ifcLoader.loadAsync(file.url);
        model.name = file.label;
        scene.add(model);
        loadedModels.push(model);

        try {
          const siteIds = ifcLoader.ifcManager.getAllItemsOfType(model.modelID, IFCSITE, false);
          if (siteIds && siteIds.length) ifcLoader.ifcManager.hideItems(model.modelID, siteIds);
        } catch (e) {
          console.warn('Kunne ikke skjule site-elementer:', e);
        }
      }
      frameAll();
      let status = `Lastet: ${loadable.map(f => f.label).join(', ')}`;
      if (missing.length) status += ` — ikke tilgjengelig: ${missing.map(f => f.label).join(', ')}`;
      onStatus(status);
    } catch (err) {
      console.error(err);
      onStatus(`Kunne ikke laste modell: ${err.message || err}`);
    }
  }

  (function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  })();

  return { loadModels, clearModels, resize };
}
