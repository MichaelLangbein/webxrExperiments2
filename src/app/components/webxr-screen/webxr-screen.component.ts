import { Component, OnInit } from '@angular/core';
import { CylinderGeometry, HemisphereLight, Mesh, MeshPhongMaterial, Scene, WebGLRenderer, XRFrame } from 'three';
import { PerspectiveCamera } from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';


@Component({
  selector: 'app-webxr-screen',
  templateUrl: './webxr-screen.component.html',
  styleUrls: ['./webxr-screen.component.css']
})
export class WebxrScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const scene = new Scene();

    const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);; 

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    document.body.appendChild(ARButton.createButton(renderer, {
    optionalFeatures: [ 'dom-overlay', 'dom-overlay-for-handheld-ar' ],
    domOverlay: { root: document.body },
    }));

    const light = new HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    const controller = renderer.xr.getController(0);
    controller.addEventListener('select', () => {
      const geometry = new CylinderGeometry(0, 0.05, 0.2, 32).rotateX(Math.PI / 2);
      const material = new MeshPhongMaterial({ color: 0xffffff * Math.random() });
      const mesh = new Mesh(geometry, material);
      mesh.position.set(0, 0, - 0.3).applyMatrix4(controller.matrixWorld);
      mesh.quaternion.setFromRotationMatrix(controller.matrixWorld);
      scene.add(mesh);
    });
    scene.add(controller);

    renderer.setAnimationLoop((timestamp: number, frame: XRFrame | undefined) => {
      renderer.render(scene, camera);
    });
  }

}
