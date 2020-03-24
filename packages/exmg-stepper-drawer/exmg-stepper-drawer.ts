import {html, property, customElement, LitElement} from 'lit-element';
import {style as stepperStyles} from './styles/exmg-stepper-drawer-styles';
import '@exmg/exmg-button';
import '@polymer/iron-collapse/iron-collapse.js';

import {checkMark} from './exmg-stepper-icons';

@customElement('exmg-stepper-drawer')
export class ExmgStepperDrawer extends LitElement {
  /**
   * Set the amount of steps that the stepper will have
   * the amount is dynamically set by the amount of slots
   * the component has
   */
  @property({type: Number}) stepAmount = 0;

  /**
   * Show backbutton?
   */
  @property({type: Boolean, attribute: 'show-back-button'}) showBackButton = false;

  /**
   * Track what step is active
   */
  @property({type: Number}) private activeStep = 0;

  /**
   * Set the state of the collapsible
   */
  @property({type: Boolean}) private opened = true;

  private steps!: Array<boolean>;

  static styles = [stepperStyles];

  constructor() {
    super();
    this.steps = []; // Always start with an empty array
  }

  /**
   * Wait for the first update to populate the steps array with the right
   * amount of slots
   */
  firstUpdated() {
    const slottedElements = document.querySelector('exmg-stepper-drawer')!.querySelectorAll('[slot]');
    this.stepAmount = slottedElements!.length / 2; //Each step has 2 slots
    this.steps = [...Array(this.stepAmount)].map(() => false); //Populate step array with the states
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
    if (this.activeStep >= 0 && this.activeStep < this.stepAmount - 1) {
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
    if (this.activeStep > 0 && this.activeStep <= this.stepAmount) {
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
   * Logic for showing the checkmarks or steps
   */
  handleCompleted(step: number) {
    if (this.steps[step]) {
      return checkMark;
    } else {
      return step + 1;
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
                <span class="${this.steps[step] ? 'step-circle completed' : 'step-circle incomplete'}">${this.handleCompleted(step)}</span>
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
                <span class="${this.steps[step] ? 'step-circle incomplete' : 'step-circle completed'}">${this.handleCompleted(step)}</span>
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
    if (this.showBackButton && this.activeStep !== 0) {
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
}
