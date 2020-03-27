import {customElement, html, LitElement, property} from 'lit-element';
import '@polymer/marked-element';
import {AvailableMarkdownExtension} from 'exmg-custom-types';
//@ts-ignore
import marked = require('marked');

@customElement('exmg-markdown-renderer')
export class ExmgMarkdownRenderer extends LitElement {
  @property({type: Array})
  private enabledExtensions: AvailableMarkdownExtension[] = [];

  // Disable shadow root
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    const fetchedExtensions = window.markdownEditorConfig.extensions;
    if (fetchedExtensions) {
      this.enabledExtensions = fetchedExtensions;
    }
  }

  private customRenderer() {
    console.log(marked);
  }

  protected render() {
    return html`
      <marked-element .renderer=${this.customRenderer}>
        <div slot="markdown-html" class="markdown-body"></div>
        <script type="text/markdown">
          +Bonjour je suis souligné !+
        </script>
      </marked-element>
    `;
  }
}
