import {html, property, customElement, LitElement} from 'lit-element';
import {style as stepperStyles} from './styles/exmg-stepper-drawer-styles';
import '@exmg/exmg-button';
import '@polymer/iron-collapse/iron-collapse.js';

@customElement('exmg-stepper-drawer')
export class ExmgStepperDrawer extends LitElement {
  /**
   * Set the amount of steps that the stepper will have
   * Default: 4
   */
  @property({type: Number, attribute: 'step-amount'}) amount = 4;

  /**
   * Show backbutton?
   */
  @property({type: Boolean, attribute: 'step-show-back-button'}) showBackButton = false;

  /**
   * Track what step is active
   */
  @property({type: Number}) private activeStep = 0;

  /**
   * Set the state of the collapsible
   */
  @property({type: Boolean}) private opened = true;

  private steps!: Array<boolean>;
  private initialised = false;

  static styles = [stepperStyles];

  /**
   * Initialise the stepper to prevent properties to be set before they're loaded.
   */
  initStepper() {
    if (!this.initialised) {
      this.steps = [...Array(this.amount)].map(() => false);
    }
    this.initialised = true;
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
   * Handle the 'next' button and shift the active step
   */
  handleNext() {
    if (this.activeStep >= 0 && this.activeStep < this.amount - 1) {
      this.opened = false;
      setTimeout(() => {
        // timeout for the animation to finish
        this.steps[this.activeStep] = true;
        this.activeStep++;
        this.toggle();
      }, 150);
    } else {
      return;
    }
  }

  /**
   * Handle the 'back' button and shift the active step
   */
  handleBack() {
    if (this.activeStep > 0 && this.activeStep <= this.amount) {
      this.opened = false;
      setTimeout(() => {
        // timeout for the animation to finish
        this.activeStep--;
        this.steps[this.activeStep] = false;
        this.toggle();
      }, 150);
    } else {
      return;
    }
  }

  /**
   * Render the stepper and initialise it in order to
   * make sure the right steps are provided
   */
  private renderStepper() {
    this.initStepper();
    return html`
      ${this.steps.map(
        (_, index) =>
          html`
            <div class="container">
              ${this.renderStep(index)}
            </div>
          `,
      )}
    `;
  }

  /**
   * Render the individual steps
   * TODO: Clean up
   */
  private renderStep(step: number) {
    return html`
      ${step === this.activeStep
        ? html`
            <li class="step-container">
              <div class="step-head">
                <span class="${this.steps[step] ? 'step-circle completed' : 'step-circle incomplete'}">${step + 1}</span>
                <slot class="step-head-text" name="head-${step + 1}"></slot>
              </div>
              <iron-collapse ?opened="${this.opened}">
              <div class="step-content-container" >
                <slot class="step-content" name="content-${step + 1}"></slot>
                ${this.renderButtons()}
              </div>
              <iron-collapse>
            </li>
          `
        : html`
            <li>
              <div class="step-head">
                <span class="${this.steps[step] ? 'step-circle incomplete' : 'step-circle completed'}">${step + 1}</span>
                <slot class="step-head-text" name="head-${step + 1}"></slot>
              </div>
            </li>
          `}
    `;
  }

  /**
   * Render the buttons
   * TODO: add logic when buttons are shown, show submit button on last step
   * and hide back button on first step
   */
  private renderButtons() {
    if (this.showBackButton) {
      return html`
        <exmg-button class="dark" unelevated @click="${this.handleBack}">Back</exmg-button>
        <exmg-button class="dark" unelevated @click="${this.handleNext}">Next</exmg-button>
      `;
    } else {
      return html`
        <exmg-button class="dark" unelevated @click="${this.handleNext}">Next</exmg-button>
      `;
    }
  }

  protected render() {
    return html`
      ${this.renderStepper()}
    `;
  }
}
