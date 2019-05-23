import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';

const template = html`<iron-iconset-svg name="exmg-paper-stepper-icons" size="24">
  <svg>
    <defs>
      <g id="check"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g>
    </defs>
  </svg>
</iron-iconset-svg>`;

document.head.appendChild(template.content);
