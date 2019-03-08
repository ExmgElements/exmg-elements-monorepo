import '@polymer/iron-iconset-svg/iron-iconset-svg';
const documentContainer = document.createElement('div');
documentContainer.setAttribute('style', 'display: none;');

documentContainer.innerHTML = `<iron-iconset-svg name="exmg-cms-breadcrumbs-icons" size="24">
<svg>
  <defs>
    <g id="arrow-separator">
      <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
    </g>
  </defs>
</svg>
</iron-iconset-svg>`;

document.head.appendChild(documentContainer);
