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
