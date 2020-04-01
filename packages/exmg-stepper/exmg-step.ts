import {html, property, customElement, LitElement} from 'lit-element';
import {style as stepperStyles} from './styles/exmg-stepper-styles';
import '@exmg/exmg-button';
import '@polymer/iron-collapse';
import {classMap} from 'lit-html/directives/class-map';
import '@material/mwc-icon';

@customElement('exmg-step')
export class ExmgStep extends LitElement {
  /**
   * Show backbutton?
   */
  @property({type: Number, attribute: 'step'}) step = 0;

  @property({type: Number, attribute: 'active-step'}) activeStep = 0;

  @property({type: Boolean, attribute: 'active'}) isActive = false;

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
   * Set the state of the collapsible
   */
  @property({type: Boolean, attribute: false}) private opened = true;

  static styles = [stepperStyles];

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
   * Render the component
   */
  protected render() {
    const circleClasses = {incompletecircle: !this.isActive, completedcircle: this.isActive};
    const textClasses = {incompletetext: !this.isActive};
    const iconClasses = {completed: this.isActive && this.step !== this.activeStep, edit: this.enableEdit};
    const showStep = !this.isActive;
    const shownStep = this.step;
    return html`
      ${this.isActive
        ? html`
            <li class="step-container">
              <div class="step-head">
                <span class="step-circle completedcircle">${this.step}</span>
                <slot class="step-head-text" name="head"></slot>
              </div>
              <iron-collapse ?opened="${this.opened}">
              <div class="step-content-container" >
                <slot class="step-content" name="content"></slot>
                ${this.renderButtons()}
              </div>
              <iron-collapse>
            </li>
          `
        : html`
            <li>
              <div class="step-head" @click=${() => this.handleEdit(this.step)}>
                <div class="step-circle ${classMap(circleClasses)}">
                  ${!showStep
                    ? html`
                        <mwc-icon class="${classMap(iconClasses)}"></mwc-icon>
                      `
                    : html`
                        ${shownStep}
                      `}
                </div>
                <slot class="step-head-text ${classMap(textClasses)}" name="head"></slot>
              </div>
            </li>
          `}
    `;
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
      const stepNext = new CustomEvent('step-next', {
        detail: {message: 'step-changed happened.'},
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(stepNext);
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
}
