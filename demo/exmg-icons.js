import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
const documentContainer = document.createElement('div');
documentContainer.setAttribute('style', 'display: none;');
documentContainer.innerHTML = `<iron-iconset-svg name="exmg-icons" size="24">
	<svg>
		<defs>
			<g id="close">
				<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
			</g>
			<g id="warning"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
		</defs>
	</svg>
</iron-iconset-svg>`;

document.head.appendChild(documentContainer);
