// The MIT License (MIT)
//
// Copyright (c) 2020-2022 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import {BehaviorSubject} from 'rxjs';

/**
 * A projection definitions.
 */
export type OpenPanelOptions = {
  /**
   * True to open the panel, false to close, undefined to toggle.
   */
  state?: boolean;
  /**
   * Automatically close the panel on tool panel change, for footer panel.
   */
  autoClose?: boolean;
  /**
   * Don't throw an error on closing an unopened panel.
   */
  noError?: boolean;
};

/**
 * Manage the panels of the DesktopCanvas.
 *
 * Example of usage:
 * ```js
 *    (window as any).gmfapi.store.panels.openToolPanel('name');
 *    (window as any).gmfapi.store.panels.openFooterPanel('name');
 *    (window as any).gmfapi.store.panels.closeToolPanel();
 *    (window as any).gmfapi.store.panels.closeFooterPanel();
 * ```
 */
export class PanelsModel {
  /**
   * The observable active tool panel.
   *
   * @private
   */
  activeToolPanel_: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  /**
   * The observable active footer panel.
   *
   * @private
   */
  activeFooterPanel_: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  /**
   * The observable active panels properties.
   *
   * @private
   */
  filterActive_: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * The current state of active tool panel.
   *
   * @private
   */
  activeToolPanelState_: string = null;

  /**
   * The current state of active footer panel.
   *
   * @private
   */
  activeFooterPanelState_: string = null;

  /**
   * Close the footer panel on tool panel change?
   *
   * @private
   */
  autoCloseFooterPanel_ = false;

  /**
   * @returns the behavior about the active panel in the tool.
   */
  getActiveToolPanel(): BehaviorSubject<string> {
    return this.activeToolPanel_;
  }

  /**
   * @returns the behavior about the active panel in the footer.
   */
  getActiveFooterPanel(): BehaviorSubject<string> {
    return this.activeFooterPanel_;
  }

  /**
   * Experimental.
   *
   * @returns the behavior about the active filter.
   */
  getFilterActive(): BehaviorSubject<boolean> {
    return this.filterActive_;
  }

  /**
   * Open a panel, or close if already open
   *
   * @param panel the panel
   * @param options the options
   */
  openToolPanel(panel: string, options?: OpenPanelOptions): void {
    options = options || {};
    let state = options.state;
    if (state === undefined) {
      state = this.activeToolPanelState_ != panel;
    } else if (state && this.activeToolPanelState_ == panel) {
      return;
    } else if (!state && this.activeToolPanelState_ != panel) {
      if (options.noError !== true) {
        throw new Error("You try to close a tool panel that's not open");
      }
    }
    this.activeToolPanelState_ = state ? panel : null;
    this.activeToolPanel_.next(this.activeToolPanelState_);
    if (this.autoCloseFooterPanel_ && this.activeFooterPanelState_) {
      this.activeFooterPanelState_ = null;
      this.activeFooterPanel_.next(null);
    }
  }

  /**
   * Open a panel, or close if already open
   *
   * @param panel the panel
   * @param options the options
   */
  openFooterPanel(panel: string, options?: OpenPanelOptions): void {
    options = options || {};
    let state = options.state;
    if (state === undefined) {
      state = this.activeFooterPanelState_ != panel;
    } else if (state && this.activeFooterPanelState_ == panel) {
      return;
    } else if (!state && this.activeFooterPanelState_ != panel) {
      if (options.noError !== true) {
        throw new Error("You try to close a footer panel that's not open");
      }
    }
    this.activeFooterPanelState_ = state ? panel : null;
    this.activeFooterPanel_.next(this.activeFooterPanelState_);
    this.autoCloseFooterPanel_ = options.autoClose === true;
  }

  /**
   * Close the tool panel.
   */
  closeToolPanel(): void {
    if (this.activeToolPanelState_) {
      this.openToolPanel(this.activeToolPanelState_, {state: false});
    }
  }

  /**
   * Close the footer panel.
   */
  closeFooterPanel(): void {
    if (this.activeFooterPanelState_) {
      this.openFooterPanel(this.activeFooterPanelState_, {state: false});
    }
  }

  /**
   * Set if there is some active filter.
   *
   * Experimental.
   *
   * @param active is active.
   */
  setFilterActive(active: boolean): void {
    this.filterActive_.next(active);
  }
}

const panels = new PanelsModel();
export default panels;
