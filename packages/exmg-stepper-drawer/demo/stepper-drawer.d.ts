import { LitElement } from 'lit-element';
import '@exmg/exmg-form/exmg-form';
import '@exmg/exmg-form-drawer/exmg-drawer';
import '../exmg-stepper-drawer';
export declare class StepperDrawer extends LitElement {
    opened: boolean;
    handleOpenedChanged(e: CustomEvent): void;
    openDialog(): void;
    render(): import("lit-element").TemplateResult;
}
