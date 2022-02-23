// The MIT License (MIT)
//
// Copyright (c) 2022 Camptocamp SA
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

import './PanelElement';

import line from './line';
import storeMap from 'gmfapi/store/map';
import panels from 'gmfapi/store/panels';
import config, {Configuration} from 'gmfapi/store/config';

import OlGeomLineString from 'ol/geom/LineString';
import olMap from 'ol/Map';

export default {
  title: 'Lidar panel',
  component: 'gmf-lidar-panel',
};

type Args = {
  /**
   * The line used to display a LIDAR profile.
   */
  line: OlGeomLineString;
};

const Template = (args: Args) => {
  // Set the config in the store
  config.setConfig({pytreeLidarprofileJsonUrl: 'https://sitn.ne.ch/pytree'} as Configuration);

  // Set the panel to always open lidar in the store
  panels.openToolPanel('lidar', {state: true});

  // Create and set a map in the store
  const map = new olMap({});
  storeMap.setMap(map);

  // Set a line in the store
  line.setLine(args.line);

  return '<gmf-lidar-panel></gmf-lidar-panel>';
};

export const Empty: any = Template.bind({});
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Empty.args = {line: null};

export const WithLine: any = Template.bind({});
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
WithLine.args = {line: new OlGeomLineString([1, 20])};
