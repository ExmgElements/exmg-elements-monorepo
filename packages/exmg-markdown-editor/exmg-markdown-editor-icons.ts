import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

const documentContainer = document.createElement('div');
documentContainer.setAttribute('style', 'display: none;');

// tslint:disable:max-line-length
documentContainer.innerHTML = `<iron-iconset-svg name="exmg-markdown-editor-icons" size="24">
  <svg>
    <defs>
      <g id="undo"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path></g>
      <g id="redo"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"></path></g>
      <g id="format-bold"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path></g>
      <g id="format-italic"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path></g>
      <g id="format-list-bulleted"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"></path></g>
      <g id="format-list-numbered"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"></path></g>
      <g id="link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
      <g id="image"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></g>
      <g id="format-quote"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></g>
      <g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>
      <g id="trending-flat"><path d="M22 14h18v-2H3v2z"></path></g>
      <g id="header-one"><path d="M11.5 13H5v5a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 3 0v5h6.5V5a1.5 1.5 0 0 1 3 0v13a1.5 1.5 0 0 1-3 0v-5zm8.5 6h-1.2v-6.535l-1.8.627v-1.046L19.82 11H20v8z"/></g>
      <g id="header-two"><path d="M11.5 13H5v5a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 3 0v5h6.5V5a1.5 1.5 0 0 1 3 0v13a1.5 1.5 0 0 1-3 0v-5zm7.142 4.948H22V19h-4.87v-.917l2.353-2.8c.203-.234.367-.45.497-.634a3.77 3.77 0 0 0 .316-.51c.079-.154.13-.296.163-.431a1.762 1.762 0 0 0-.028-.898 1.244 1.244 0 0 0-.209-.4.967.967 0 0 0-.333-.265 1.057 1.057 0 0 0-.457-.093c-.203 0-.39.037-.541.111a1.074 1.074 0 0 0-.384.302c-.096.129-.175.283-.226.461a2.298 2.298 0 0 0-.073.536H17c.006-.327.056-.634.158-.924.107-.307.265-.572.474-.8a2.14 2.14 0 0 1 .768-.541A2.66 2.66 0 0 1 19.444 11c.36 0 .682.05.97.148.277.104.52.246.711.437.192.184.339.412.44.683.102.27.153.572.153.898 0 .24-.034.486-.107.726-.074.24-.175.48-.305.72s-.282.48-.463.72c-.18.24-.372.486-.587.726l-1.614 1.89z"/></g>
      <g id="header-three"><path d="M11.5 13H5v5a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 3 0v5h6.5V5a1.5 1.5 0 0 1 3 0v13a1.5 1.5 0 0 1-3 0v-5zm9.815 2.217c.165.125.292.269.393.427.102.164.171.335.222.499.045.184.07.374.07.565 0 .361-.063.69-.19.972a1.997 1.997 0 0 1-.533.722 2.185 2.185 0 0 1-.8.447c-.31.098-.64.151-1.002.151-.33 0-.641-.046-.94-.138a2.334 2.334 0 0 1-.786-.414 1.982 1.982 0 0 1-.546-.69 2.158 2.158 0 0 1-.203-.952h1.263c0 .171.031.329.089.473.057.145.14.263.247.368.108.105.235.184.387.236a1.4 1.4 0 0 0 .508.086c.387 0 .698-.105.92-.322.222-.217.336-.525.336-.933a1.55 1.55 0 0 0-.102-.571 1 1 0 0 0-.279-.4 1.174 1.174 0 0 0-.438-.23 2.212 2.212 0 0 0-.577-.073h-.749V14.41h.743c.215 0 .406-.026.564-.086.16-.059.292-.137.4-.243a.966.966 0 0 0 .241-.374c.051-.144.076-.309.076-.486 0-.374-.088-.663-.279-.867-.19-.204-.476-.309-.863-.309-.171 0-.323.027-.463.08-.14.052-.26.124-.368.216a.998.998 0 0 0-.241.341 1.127 1.127 0 0 0-.089.454H17.07c0-.302.057-.591.184-.848.114-.262.285-.486.495-.676.21-.19.463-.342.761-.453.292-.105.616-.158.965-.158.355 0 .685.046.97.131.299.092.552.237.762.42.216.191.38.421.495.697.12.276.177.598.177.959 0 .158-.019.322-.07.48-.044.164-.12.315-.215.466a2.005 2.005 0 0 1-.87.748c.235.086.432.191.59.316z"/></g>
      <g id="text-fields"><path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"></path></g>
      <g id="grid-on"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"></path></g>
      <g id="format-strikethrough"><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"></path></g>
      <g id="chrome-reader-mode"><path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"></path></g>
      <g id="visibility"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></g>
      <g id="fullscreen"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></g>
    </defs>
  </svg>
</iron-iconset-svg>`;
// tslint:enable:max-line-length

document.head!.appendChild(documentContainer);
