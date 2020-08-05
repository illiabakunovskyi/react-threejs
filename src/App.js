import React, { Component } from 'react';
import * as Stats from 'stats-js';
import * as THREE from 'three';

const mouse = new THREE.Vector2(-1, -1);
let mouseDown = false;
let mouseStartPositionX = 0;
let mouseStartPositionY = 0;

class App extends Component {
  onMouseDown(event) {
    event.preventDefault();
    mouseDown = true;
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouseStartPositionX = mouse.x;
    mouseStartPositionY = mouse.y;
  }

  onMouseUp(event) {
    event.preventDefault();
    mouseDown = false;
  }

  onMouseMove(event) {
    if (mouseDown) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      console.log(mouseStartPositionX, 'start');
      console.log(mouse.x, 'now');
    }
  }

  componentDidMount() {
    let raycaster = new THREE.Raycaster();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      1,
      120
    );

    // stats
    let stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    this.mount.appendChild(renderer.domElement);

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

      if (mouseDown) {
        if (mouseStartPositionX !== mouse.x)
          object.rotation.x += (mouse.x / 10000 - mouseStartPositionX / 10000);
        if (mouseStartPositionY !== mouse.y)
          object.rotation.y += (mouse.y / 10000 - mouseStartPositionY / 10000);
      }

      renderer.render(scene, camera);

      stats.end();
    };
    animate();
  }

  render() {
    return (
      <div
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        ref={(ref) => (this.mount = ref)}
      />
    );
  }
}

export default App;
