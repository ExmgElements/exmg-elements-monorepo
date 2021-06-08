import { LitElement } from 'lit-element';
export declare class ExmgTooltipBase extends LitElement {
    /**
     * The id of the element that the tooltip is anchored to. This element
     * must be a sibling of the tooltip.
     */
    for?: string;
    /**
     * Positions the tooltip to the top, right, bottom, left of its content.
     */
    position: string;
    /**
     * If true, no parts of the tooltip will ever be shown offscreen.
     */
    fitToVisibleBounds: boolean;
    /**
     * X axis offset from the parent's center
     */
    xOffset?: number;
    /**
     * Y axis offset from the parent's center
     */
    yOffset?: number;
    _showing: boolean;
    tooltip?: HTMLElement;
    private _target?;
    private _boundShow;
    private _boundHide;
    /**
     * Returns the target element that this tooltip is anchored to. It is
     * either the element given by the `for` attribute, or the immediate parent
     * of the tooltip.
     */
    get target(): any;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    show(): void;
    /**
     * Toggles a CSS class on or off.
     */
    toggleClass(name: string, bool: boolean, node: HTMLElement): void;
    hide(): void;
    updatePosition(): void;
    _addListeners(): void;
    _findTarget(): void;
    _removeListeners(): void;
    protected render(): import("lit-element").TemplateResult;
}
