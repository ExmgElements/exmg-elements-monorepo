import {html, property, customElement, LitElement} from 'lit-element';
import {style as stepperStyles} from './styles/exmg-stepper-styles';
import '@exmg/exmg-button';
import '@polymer/iron-collapse';
import {classMap} from 'lit-html/directives/class-map';
import '@material/mwc-icon';

@customElement('exmg-stepper')
export class ExmgStepper extends LitElement {
  /**
   * Show backbutton?
   */
  @property({type: Boolean, attribute: 'enable-back-button'}) showBackButton = false;

  /**
   * Enable step edit?
   */
  @property({type: Boolean, attribute: 'enable-edit-mode'}) enableEdit = false;

  /**
   * Edit the last button text
   */
  @property({type: String, attribute: 'last-button-text'}) lastButtonText = 'submit';

  /**
   * Set the amount of steps that the stepper will have
   * the amount is dynamically set by the amount of slots the component has
   */
  @property({type: Number, attribute: false}) private stepAmount = 0;

  /**
   * Track what step is active
   */
  @property({type: Number, attribute: false}) private activeStep = 0;

  /**
   * Set the state of the collapsible
   */
  @property({type: Boolean, attribute: false}) private opened = true;

  /**
   * Steps array including all of the step's states
   */
  @property({type: Array, attribute: false}) steps: Array<boolean> = [];

  static styles = [stepperStyles];

  /**
   * Wait for the first update to populate the steps array with the right
   * amount of slots
   */
  firstUpdated() {
    const slottedElements = this.querySelectorAll('exmg-step')!;
    console.log(slottedElements);
    this.stepAmount = slottedElements!.length;
    for (let i = 0; i < this.stepAmount; i++) {
      // Populate with all the states
      this.steps.push(false);
    }
    this.querySelector('exmg-step')!.addEventListener('step-next', this.handleChange);
  }

  handleChange() {
    console.log('changed');
  }

  /**
   * Toggle the collapsible
   */
  toggle() {
    setTimeout(() => {
      // timeout for the animation to finish
      this.opened = !this.opened;
    }, 150);
  }

  /**
   * Set the step and the state of the step
   * the step parameter is only needed for the edit, otherwise
   * just use the activeStep for the parameter
   * types: 'next', 'back', 'edit'
   */
  setStep(step: number, type: string) {
    setTimeout(() => {
      switch (type) {
        case 'next': {
          // this.steps[this.activeStep] = true;
          this.step++;
          break;
        }
        case 'back': {
          this.step--;
          break;
        }
        case 'edit': {
          this.activeStep = step;
          break;
        }
        default: {
          return;
        }
      }
      this.toggle();
    }, 150);
  }

  /**
   * If edits are enabled make sure the right steps are edited
   * with the right states of the steps
   */
  handleEdit(step: number) {
    if (this.enableEdit && this.isActive === true) {
      this.opened = false;
      this.setStep(step, 'edit');
    } else {
      return;
    }
  }

  /**
   * Handle the 'next' button and shift the active step
   */
  handleNext() {
    if (this.activeStep >= 0) {
      this.opened = false;
      this.setStep(this.activeStep, 'next');
    } else {
      return;
    }
  }

  /**
   * Handle the 'back' button and shift the active step
   */
  handleBack() {
    if (this.activeStep > 0) {
      this.opened = false;
      this.setStep(this.activeStep, 'back');
    } else {
      return;
    }
  }

  /**
   * Render the buttons
   */
  private renderButtons() {
    if (this.showBackButton && this.activeStep !== 0) {
      return html`
        <exmg-button class="dark" unelevated @click="${this.handleBack}">Back</exmg-button>
        ${this.activeStep !== this.stepAmount - 1
          ? html`
              <exmg-button class="dark" unelevated @click="${this.handleNext}">Next</exmg-button>
            `
          : html`
              <exmg-button class="dark" unelevated @click="${this.handleNext}">${this.lastButtonText}</exmg-button>
            `}
      `;
    } else {
      return html`
        ${this.activeStep !== this.stepAmount - 1
          ? html`
              <exmg-button class="dark" unelevated @click="${this.handleNext}">Next</exmg-button>
            `
          : html`
              <exmg-button class="dark" unelevated @click="${this.handleNext}">${this.lastButtonText}</exmg-button>
            `}
      `;
    }
  }

  /**
   * Render the component
   */
  protected render() {
    return html`
      ${this.renderStepper()}
    `;
  }

  /**
   * Render the stepper and initialise it in order to
   * make sure the right steps are provided
   */
  private renderStepper() {
    return html`
      ${this.steps.map(
        (_, index) =>
          html`
            <slot name=${index + 1}> </slot>
          `,
      )}
    `;
  }
}
