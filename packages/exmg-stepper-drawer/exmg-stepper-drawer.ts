import {html, property, customElement, LitElement} from 'lit-element';
import {style as stepperStyles} from './styles/exmg-stepper-drawer-styles';
import '@exmg/exmg-button';
import '@polymer/iron-collapse/iron-collapse.js';

@customElement('exmg-stepper-drawer')
export class ExmgStepperDrawer extends LitElement {
  /**
   * Set the amount of steps that the stepper will have
   * DEFAULT IS 4
   */
  @property({type: Number}) amount = 4;

  /**
   * Set the active step
   */
  @property({type: Number}) private activeStep = 0;

  /**
   * Set the state of the collapsible
   */
  @property({type: Boolean}) opened = true;

  /**
   * Show backbutton?
   */
  @property({type: Boolean}) showBackButton = false;

  private steps = [...Array(this.amount)].map(() => false); // Add steps dynamically

  static styles = [stepperStyles];

  toggle() {
    setTimeout(() => {
      // timeout for the animation to finish
      this.opened = !this.opened;
    }, 150);
  }

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

  private renderStepper() {
    console.log(this.steps);
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
