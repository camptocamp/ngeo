// The MIT License (MIT)
//
// Copyright (c) 2021 Camptocamp SA
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

import './entrypoint.ts';
import configuration, {Configuration} from 'ngeo/store/config';

export default {
  title: 'Entry points',
  component: 'gmf-header',
};

type Args = {
  /**
   * The content.
   */
  gmfHeaderEntrypoint: string;
  /**
   * The content URL
   */
  gmfHeaderEntrypointUrl: string;
  /**
   * The content.
   */
  gmfThemeHeaderEntrypoint: string;
  /**
   * The content URL
   */
  gmfThemeHeaderEntrypointUrl: string;
};

const Template = (args: Args) => {
  configuration.setConfig(args as unknown as Configuration);
  return '<gmf-header-entrypoint></gmf-header-entrypoint>';
};

export const Story: any = Template.bind({});
Story.args = {
  gmfHeaderEntrypoint: 'inner: <gmf-theme-header-entrypoint></gmf-theme-header-entrypoint>',
  gmfHeaderEntrypointUrl: null,
  gmfThemeHeaderEntrypoint: '<b>text</b>',
  gmfThemeHeaderEntrypointUrl: null,
};
