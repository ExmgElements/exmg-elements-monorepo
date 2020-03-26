import {html, property, customElement, LitElement} from 'lit-element';
import {style as stepperStyles} from './styles/exmg-stepper-drawer-styles';
import '@exmg/exmg-button';
import '@polymer/iron-collapse/iron-collapse.js';
import {classMap} from 'lit-html/directives/class-map.js';
import '@material/mwc-icon';

@customElement('exmg-stepper-drawer')
export class ExmgStepperDrawer extends LitElement {
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
    const slottedElements = this.querySelectorAll('*[slot]')!;
    this.stepAmount = slottedElements!.length / 2; //Each step has 2 slots
    for (let i = 0; i < this.stepAmount; i++) {
      // Populate with all the states
      this.steps.push(false);
    }
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
          this.steps[this.activeStep] = true;
          this.activeStep++;
          break;
        }
        case 'back': {
          this.activeStep--;
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
   * Handle the 'next' button and shift the active step
   */
  handleNext() {
    if (this.activeStep >= 0 && this.activeStep < this.stepAmount - 1) {
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
    if (this.activeStep > 0 && this.activeStep <= this.stepAmount) {
      this.opened = false;
      this.setStep(this.activeStep, 'back');
    } else {
      return;
    }
  }

  /**
   * If edits are enabled make sure the right steps are edited
   * with the right states of the steps
   */
  handleEdit(step: number) {
    if (this.enableEdit && this.steps[step] === true) {
      this.opened = false;
      this.setStep(step, 'edit');
    } else {
      return;
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
   */
  private renderStep(step: number) {
    const circleClasses = {incompletecircle: !this.steps[step], completedcircle: this.steps[step]};
    const textClasses = {incompletetext: !this.steps[step]};
    const iconClasses = {completed: this.steps[step] && step !== this.activeStep, edit: this.enableEdit};
    const showStep = !this.steps[step];
    const shownStep = step + 1;

    return html`
      ${step === this.activeStep
        ? html`
            <li class="step-container">
              <div class="step-head">
                <span class="step-circle completedcircle">${shownStep}</span>
                <slot class="step-head-text" name="head-${shownStep}"></slot>
              </div>
              <iron-collapse ?opened="${this.opened}">
              <div class="step-content-container" >
                <slot class="step-content" name="content-${shownStep}"></slot>
                ${this.renderButtons()}
              </div>
              <iron-collapse>
            </li>
          `
        : html`
            <li>
              <div class="step-head" @click=${() => this.handleEdit(step)}>
                <div class="step-circle ${classMap(circleClasses)}">
                  ${!showStep
                    ? html`
                        <mwc-icon class="${classMap(iconClasses)}"></mwc-icon>
                      `
                    : html`
                        ${shownStep}
                      `}
                </div>
                <slot class="step-head-text ${classMap(textClasses)}" name="head-${shownStep}"></slot>
              </div>
            </li>
          `}
    `;
  }

  /**
   * Render the buttons
   */
  private renderButtons() {
    console.log(this.stepAmount - 1);
    console.log(this.activeStep);
    if (this.showBackButton && this.activeStep !== 0) {
      return html`
        <exmg-button class="dark" unelevated @click="${this.handleBack}">Back</exmg-button>
        <exmg-button class="dark" unelevated @click="${this.handleNext}"
          >${this.activeStep === this.stepAmount - 1 ? this.lastButtonText : 'Next'}</exmg-button
        >
      `;
    } else {
      return html`
        <exmg-button class="dark" unelevated @click="${this.handleNext}"
          >${this.activeStep === this.stepAmount - 1 ? this.lastButtonText : 'Next'}</exmg-button
        >
      `;
    }
  }
}
