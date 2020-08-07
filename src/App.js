import React, { Component } from 'react';
import * as Stats from 'stats-js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const mouse = new THREE.Vector2(-1, -1);

class App extends Component {
  componentDidMount() {
    let raycaster = new THREE.Raycaster();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      1,
      120
    );

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    this.mount.appendChild(renderer.domElement);

    let controls = new OrbitControls(camera, renderer.domElement);

    // stats
    let stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    scene.background = new THREE.Color(0x000000);

    // light
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100, 200, 300);
    scene.add(spotLight);

    // object
    let material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    let geometry = new THREE.IcosahedronBufferGeometry(8, 1);
    let object = new THREE.Line(geometry, material);
    scene.add(object);
    camera.position.z = 20;

    let animate = () => {
      stats.begin();

      requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, camera);

      controls.update();

      renderer.render(scene, camera);

      stats.end();
    };
    animate();
  }

  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}

export default App;
