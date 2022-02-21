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

import BaseElement from 'gmfapi/elements/BaseElement';
import ToolButtonElement from 'gmfapi/elements/ToolButtonElement';
import ToolPanelElement from 'gmfapi/elements/ToolPanelElement';
import config from 'gmfapi/store/config';
import user from 'gmfapi/store/user';
import map from 'gmfapi/store/map';
import panels from 'gmfapi/store/panels';

export default {
  elements: {
    BaseElement: BaseElement,
    ToolButtonElement: ToolButtonElement,
    ToolPanelElement: ToolPanelElement,
  },
  store: {
    config: config,
    user: user,
    map: map,
    panels: panels,
  },
};
