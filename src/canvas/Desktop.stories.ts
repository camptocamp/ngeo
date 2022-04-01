// The MIT License (MIT)
//
// Copyright (c) 2021-2022 Camptocamp SA
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

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import ToolButtonElement, {ToolButtonDefault} from 'gmfapi/elements/ToolButtonElement';
import {css, html, TemplateResult} from 'lit';
import {property, customElement} from 'lit/decorators';
import './DesktopElement';
import ToolPanelElement from 'gmfapi/elements/ToolPanelElement';
import panels from 'gmfapi/store/panels';
import config, {Configuration} from 'gmfapi/store/config';
import 'bootstrap/js/src/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default {
  title: 'Desktop canvas',
  component: 'gmf-desktop-canvas',
};

type Args = {
  /**
   * The tool panel.
   */
  tool_panel: string;
  /**
   * The footer panel.
   */
  footer_panel: string;
  /**
   * Auto close footer panel.
   */
  auto_close_footer_panel: boolean;
  /**
   * Show the infobar
   */
  show_info_bar: boolean;
};

/**
 * @param args The arguments used to fill the stores
 * @returns The HTML of the story
 */
function Template(args: Args): string {
  if (args.tool_panel) {
    panels.openToolPanel(args.tool_panel, {state: true});
  } else {
    panels.closeToolPanel();
  }
  if (args.footer_panel) {
    panels.openFooterPanel(args.footer_panel, {state: true, autoClose: args.auto_close_footer_panel});
  } else {
    panels.closeFooterPanel();
  }
  config.setConfig({
    gmfOptions: {
      showInfobar: args.show_info_bar,
    },
  } as Configuration);
  return [
    '<style>',
    ':root {',
    '  --infobar-height: 3.5rem;',
    '  --right-panel-width-2: 20rem;',
    '}',
    '</style>',
    '<gmf-desktop-canvas style="height: 25rem; display: block;">',
    '<p slot="header">header</p>',
    '<p slot="data">data 1</p>',
    '<p slot="data">data 1</p>',
    '<p slot="map">map 1</p>',
    '<p slot="map">map 2</p>',
    '<gmf-tool-button slot="tool-button" panelName="1">',
    '  <span>',
    '    <i class="fa fa-mouse-pointer"></i>',
    '  </span>',
    '</gmf-tool-button>',
    '<gmf-tool-panel slot="tool-panel-1" panelName="Title 1"><div>content 1</div></gmf-tool-panel>',
    '<gmf-tool-button slot="tool-button" iconClasses="fa fa-print" panelName="2"></gmf-tool-button>',
    '<gmf-tool-panel slot="tool-panel-2" panelName="Title 2"><div>content 2</div></gmf-tool-panel>',
    '<gmf-button-3 slot="tool-button-separate" iconClasses="fa fa-paint-brush" panelName="3"></gmf-button-3>',
    '<gmf-tool-panel slot="tool-panel-3" panelName="Title 3"><div>content 3</div></gmf-tool-panel>',
    '<p slot="footer-3">panel 3</p>',
    '<span slot="infobar-left">left</span>',
    '<span slot="infobar-right">right</span>',
    '<span slot="infobar-footer">footer</span>',
    '</gmf-desktop-canvas>',
  ].join('\n');
}

@customElement('gmf-button-3')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ToolButton3 extends ToolButtonDefault {
  static styles = [
    ...ToolButtonElement.styles,
    css`
      button.btn {
        border: none;
        line-height: 1;
      }
    `,
  ];
  constructor() {
    super('3');
  }
}

@customElement('gmf-tool-panel')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ToolPanelDefault extends ToolPanelElement {
  @property({type: String})
  panelName: string;

  render(): TemplateResult {
    return html`${this.getTitle(this.panelName)}<slot></slot>`;
  }
}

const defaultProperties: Args = {
  tool_panel: '',
  footer_panel: '',
  auto_close_footer_panel: false,
  show_info_bar: false,
};

export const PanelsClosed: any = Template.bind({});
PanelsClosed.args = {...defaultProperties};

export const ToolOpen: any = Template.bind({});
ToolOpen.args = {...defaultProperties};
ToolOpen.args.tool_panel = '1';

export const FooterOpen: any = Template.bind({});
FooterOpen.args = {...defaultProperties};
FooterOpen.args.footer_panel = '3';

export const FooterAutoClose: any = Template.bind({});
FooterAutoClose.args = {...defaultProperties};
FooterAutoClose.args.footer_panel = '3';
FooterAutoClose.args.autoclose_footer_panel = true;

export const InfoBarOpen: any = Template.bind({});
InfoBarOpen.args = {...defaultProperties};
InfoBarOpen.args.show_info_bar = true;
