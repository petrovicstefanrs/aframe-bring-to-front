/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* eslint-disable */

/**
 * Bring To Front Component
 */

if (typeof AFRAME === 'undefined') {
	throw new Error(
		'Component attempted to register before AFRAME was available.'
	);
}

AFRAME.registerComponent('bring-to-front', {
	schema: {
		trigger: {
			default: 'keydown',
		},
		keyCode: {
			default: 72,
		},
		triggerElement: {
			default: 'a-scene',
		},
		distance: {
			default: -1,
		},
	},

	play: function() {
		if (AFRAME.utils.device.checkHeadsetConnected()) {
			document
				.querySelector(this.data.triggerElement)
				.addEventListener('click', this.eventHandler.bind(this));
		} else if (
			!AFRAME.utils.device.checkHeadsetConnected() &&
			AFRAME.utils.device.isMobile()
		) {
			document
				.querySelector(this.data.triggerElement)
				.addEventListener('click', this.eventHandler.bind(this));
		} else {
			if (this.data.trigger === 'click') {
				document
					.querySelector(this.data.triggerElement)
					.addEventListener(
						this.data.trigger,
						this.eventHandler.bind(this)
					);
			} else {
				document.addEventListener(
					this.data.trigger,
					this.eventHandler.bind(this)
				);
			}
		}

		this.cameraEl = document.querySelector('a-entity[camera]');

		this.yaxis = new THREE.Vector3(0, 1, 0);
		this.zaxis = new THREE.Vector3(0, 0, 1);
		this.pivot = new THREE.Object3D();

		this.el.object3D.position.set(
			0,
			this.cameraEl.object3D.getWorldPosition().y,
			this.data.distance
		);

		this.el.sceneEl.object3D.add(this.pivot);
		this.pivot.add(this.el.object3D);
	},

	eventHandler: function(evt) {
		console.log(evt);
		if (this.data.trigger === 'keydown' || this.data.trigger === 'keyup') {
			var code = evt.keyCode ? evt.keyCode : evt.which;
			if (code !== this.data.keyCode) {
				return;
			}
		}

		var direction = this.zaxis.clone();
		direction.applyQuaternion(this.cameraEl.object3D.quaternion);
		var ycomponent = this.yaxis
			.clone()
			.multiplyScalar(direction.dot(this.yaxis));
		direction.sub(ycomponent);
		direction.normalize();

		this.pivot.quaternion.setFromUnitVectors(this.zaxis, direction);
		this.pivot.position.copy(this.cameraEl.object3D.getWorldPosition());

		if (this.el.getAttribute('visible') === false) {
			this.el.setAttribute('visible', true);
		}
	},

	update: function(oldData) {},

	remove: function() {},
});


/***/ })
/******/ ]);