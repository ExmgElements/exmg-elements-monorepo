import {customElement} from 'lit-element';
import {style} from './exmg-grid-checkbox-styles';
import {Checkbox} from '@material/mwc-checkbox/mwc-checkbox';

/**
 * ### Styling
 * The following custom properties  are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--exmg-grid-setting-checkbox-color` | checkbox fill color | `var(--mdc-theme-secondary, #0071dc);`
 */
@customElement('exmg-grid-checkbox')
export class ExmgGridCheckbox extends Checkbox {
  static styles = style;
}
