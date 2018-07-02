import '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-styles/typography.js';
import '@polymer/paper-styles/color.js';
import '@polymer/paper-styles/shadow.js';

const documentContainer = document.createElement('div');
documentContainer.setAttribute('style', 'display: none;');

documentContainer.innerHTML = `<dom-module id="exmg-cms-form-styles">
  <template>
    <style>

      iron-form .error {
        color: var(--error-color);
        margin: 8px 0 4px;
      }

      iron-form label {
        @apply --paper-font-caption;
        display: block;
        margin: 8px 0 4px;
      }

      iron-form paper-checkbox {
        margin-right: 24px;
        margin-top: 24px;
      }

      iron-form {
        margin-top: 0px;
        padding: 0 24px;
      }

      exmg-paper-card > iron-form {
        margin-top: 0px;
        padding: 24px;
      }

      iron-form h4 {
        color: rgba(0, 0, 0, var(--light-secondary-opacity));
        margin-bottom: 0;
      }

      iron-form footer .actions{
        text-align: right;
        margin-top: 20px;
      }

      iron-form paper-button[submit]{
        background-color: var(--primary-color);
        color: var(--text-primary-color);
      }

      iron-form  paper-dropdown-menu{
        width: 100%;
      }

  </style>

</template></dom-module>`;

document.head.appendChild(documentContainer);

/* NOTE: This file needs work. Lots of it. */
