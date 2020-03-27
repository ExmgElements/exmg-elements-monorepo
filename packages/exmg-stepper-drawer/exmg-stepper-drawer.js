var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, property, customElement, LitElement } from 'lit-element';
import { style as stepperStyles } from './styles/exmg-stepper-drawer-styles';
import '@exmg/exmg-button';
import '@polymer/iron-collapse/iron-collapse.js';
import { classMap } from 'lit-html/directives/class-map.js';
import '@material/mwc-icon';
let ExmgStepperDrawer = class ExmgStepperDrawer extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Show backbutton?
         */
        this.showBackButton = false;
        /**
         * Enable step edit?
         */
        this.enableEdit = false;
        /**
         * Edit the last button text
         */
        this.lastButtonText = 'submit';
        /**
         * Set the amount of steps that the stepper will have
         * the amount is dynamically set by the amount of slots the component has
         */
        this.stepAmount = 0;
        /**
         * Track what step is active
         */
        this.activeStep = 0;
        /**
         * Set the state of the collapsible
         */
        this.opened = true;
        /**
         * Steps array including all of the step's states
         */
        this.steps = [];
    }
    /**
     * Wait for the first update to populate the steps array with the right
     * amount of slots
     */
    firstUpdated() {
        const slottedElements = this.querySelectorAll('*[slot]');
        this.stepAmount = slottedElements.length / 2; //Each step has 2 slots
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
    setStep(step, type) {
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
        }
        else {
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
        }
        else {
            return;
        }
    }
    /**
     * If edits are enabled make sure the right steps are edited
     * with the right states of the steps
     */
    handleEdit(step) {
        if (this.enableEdit && this.steps[step] === true) {
            this.opened = false;
            this.setStep(step, 'edit');
        }
        else {
            return;
        }
    }
    /**
     * Render the component
     */
    render() {
        return html `
      ${this.renderStepper()}
    `;
    }
    /**
     * Render the stepper and initialise it in order to
     * make sure the right steps are provided
     */
    renderStepper() {
        return html `
      ${this.steps.map((_, index) => html `
            <div class="container">
              ${this.renderStep(index)}
            </div>
          `)}
    `;
    }
    /**
     * Render the individual steps
     */
    renderStep(step) {
        const circleClasses = { incompletecircle: !this.steps[step], completedcircle: this.steps[step] };
        const textClasses = { incompletetext: !this.steps[step] };
        const iconClasses = { completed: this.steps[step] && step !== this.activeStep, edit: this.enableEdit };
        const showStep = !this.steps[step];
        const shownStep = step + 1;
        return html `
      ${step === this.activeStep
            ? html `
            <li class="step-container">
              <div class="step-head">
                <span class="step-circle completedcircle">${shownStep}</span>
                <slot class="step-head-text" name="head-${shownStep}"></slot>
              </div>
              <iron-collapse ?opened="${this.opened}">
                <div class="step-content-container">
                  <slot class="step-content" name="content-${shownStep}"></slot>
                  ${this.renderButtons()}
                </div>
              </iron-collapse>
            </li>
          `
            : html `
            <li>
              <div class="step-head" @click=${() => this.handleEdit(step)}>
                <div class="step-circle ${classMap(circleClasses)}">
                  ${!showStep
                ? html `
                        <mwc-icon class="${classMap(iconClasses)}"></mwc-icon>
                      `
                : html `
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
    renderButtons() {
        console.log(this.stepAmount - 1);
        console.log(this.activeStep);
        if (this.showBackButton && this.activeStep !== 0) {
            return html `
        <exmg-button class="dark" unelevated @click="${this.handleBack}">Back</exmg-button>
        <exmg-button class="dark" unelevated @click="${this.handleNext}"
          >${this.activeStep === this.stepAmount - 1 ? this.lastButtonText : 'Next'}</exmg-button
        >
      `;
        }
        else {
            return html `
        <exmg-button class="dark" unelevated @click="${this.handleNext}"
          >${this.activeStep === this.stepAmount - 1 ? this.lastButtonText : 'Next'}</exmg-button
        >
      `;
        }
    }
};
ExmgStepperDrawer.styles = [stepperStyles];
__decorate([
    property({ type: Boolean, attribute: 'enable-back-button' })
], ExmgStepperDrawer.prototype, "showBackButton", void 0);
__decorate([
    property({ type: Boolean, attribute: 'enable-edit-mode' })
], ExmgStepperDrawer.prototype, "enableEdit", void 0);
__decorate([
    property({ type: String, attribute: 'last-button-text' })
], ExmgStepperDrawer.prototype, "lastButtonText", void 0);
__decorate([
    property({ type: Number, attribute: false })
], ExmgStepperDrawer.prototype, "stepAmount", void 0);
__decorate([
    property({ type: Number, attribute: false })
], ExmgStepperDrawer.prototype, "activeStep", void 0);
__decorate([
    property({ type: Boolean, attribute: false })
], ExmgStepperDrawer.prototype, "opened", void 0);
__decorate([
    property({ type: Array, attribute: false })
], ExmgStepperDrawer.prototype, "steps", void 0);
ExmgStepperDrawer = __decorate([
    customElement('exmg-stepper-drawer')
], ExmgStepperDrawer);
export { ExmgStepperDrawer };
