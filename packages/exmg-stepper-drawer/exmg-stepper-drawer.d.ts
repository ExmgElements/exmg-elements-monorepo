import { LitElement } from 'lit-element';
import '@exmg/exmg-button';
import '@polymer/iron-collapse/iron-collapse.js';
import '@material/mwc-icon';
export declare class ExmgStepperDrawer extends LitElement {
    /**
     * Show backbutton?
     */
    showBackButton: boolean;
    /**
     * Enable step edit?
     */
    enableEdit: boolean;
    /**
     * Edit the last button text
     */
    lastButtonText: string;
    /**
     * Set the amount of steps that the stepper will have
     * the amount is dynamically set by the amount of slots the component has
     */
    private stepAmount;
    /**
     * Track what step is active
     */
    private activeStep;
    /**
     * Set the state of the collapsible
     */
    private opened;
    /**
     * Steps array including all of the step's states
     */
    steps: Array<boolean>;
    static styles: import("lit-element").CSSResult[];
    /**
     * Wait for the first update to populate the steps array with the right
     * amount of slots
     */
    firstUpdated(): void;
    /**
     * Toggle the collapsible
     */
    toggle(): void;
    /**
     * Set the step and the state of the step
     * the step parameter is only needed for the edit, otherwise
     * just use the activeStep for the parameter
     * types: 'next', 'back', 'edit'
     */
    setStep(step: number, type: string): void;
    /**
     * Handle the 'next' button and shift the active step
     */
    handleNext(): void;
    /**
     * Handle the 'back' button and shift the active step
     */
    handleBack(): void;
    /**
     * If edits are enabled make sure the right steps are edited
     * with the right states of the steps
     */
    handleEdit(step: number): void;
    /**
     * Render the component
     */
    protected render(): import("lit-element").TemplateResult;
    /**
     * Render the stepper and initialise it in order to
     * make sure the right steps are provided
     */
    private renderStepper;
    /**
     * Render the individual steps
     */
    private renderStep;
    /**
     * Render the buttons
     */
    private renderButtons;
}
