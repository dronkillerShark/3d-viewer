import "./App.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import * as THREE from "three";
import * as Stats from "stats.js";

function App() {
  return (
    <div className="App">
      <input type="file" id="file" onChange={newModel} hidden="hidden" />
      <button type="button" onClick={btn} className="btn">
        add a 3d model
      </button>
      <span className="spn">no file chosen, yet</span>
    </div>
  );
}

let path = require("./ggfggf.fbx");
const stats = new Stats();
stats.showPanel(1);
document.body.appendChild(stats.dom);

const btn = function (e) {
  e.preventDefault();
  scene.remove(thr);
  document.getElementById("file").click();
};

const newModel = function () {
  if (document.getElementById("file").value) {
    path = require("./" +
      document
        .getElementById("file")
        .value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]);
    document.querySelector(".spn").innerHTML = document
      .getElementById("file")
      .value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];

    loader.load(
      path,
      function (fbx) {
        thr = fbx;
        scene.add(thr);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  } else {
    document.querySelector(".spn").innerHTML = "no file chosen, yet";
  }
};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2);

const light3 = new THREE.DirectionalLight(0xffffff, 1.0);
scene.add(light3);

let thr = new THREE.Object3D();
const loader = new FBXLoader();
loader.load(
  path,
  function (fbx) {
    thr = fbx;
    scene.add(thr);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio * 0.5);
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);
scene.background = new THREE.Color(0xffffff);
const animate = function () {
  const time = performance.now() / 1000;
  stats.begin();
  renderer.render(scene, camera);
  stats.end();
  requestAnimationFrame(animate);
};

animate();

export default App;
