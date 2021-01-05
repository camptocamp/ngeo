// The MIT License (MIT)
//
// Copyright (c) 2014-2021 Camptocamp SA
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

import angular from 'angular';
describe('ngeo.statemanager.Location', () => {
  /** @type {Object<string, *>} */
  let win;
  /** @type {import("ngeo/statemanager/Location.js").StatemanagerLocation} */
  let ngeoLocation;

  beforeEach(() => {
    win = {
      'location': new URL('http://domain.com/some/path?some=param'),
      'history': {'replaceState': function () {}},
    };
    spyOn(win.history, 'replaceState');
    angular.mock.module(
      /**
       * @param {angular.IModule} $provide
       */
      ($provide) => {
        $provide.value('$window', win);
      }
    );
    angular.mock.inject((_ngeoLocation_) => {
      ngeoLocation = _ngeoLocation_;
    });
  });

  describe('#getUriString', () => {
    it('returns the URI', () => {
      const uri = ngeoLocation.getUriString();
      expect(uri).toBe('http://domain.com/some/path?some=param');
    });
    it('returns the URI with additional params', () => {
      const uri = ngeoLocation.getUriString();
      expect(uri).toBe('http://domain.com/some/path?some=param');
    });
  });

  describe('#hasParam', () => {
    it('returns true if the param exists', () => {
      let value = ngeoLocation.hasParam('some');
      expect(value).toBe(true);
      value = ngeoLocation.hasParam('missing');
      expect(value).toBe(false);
    });
  });

  describe('#getParam', () => {
    it('returns the param value', () => {
      const value = ngeoLocation.getParam('some');
      expect(value).toBe('param');
    });
  });

  describe('#getParamAsInt', () => {
    it('returns the param value as integer', () => {
      ngeoLocation.updateParams({'key2': '2'});
      const value = ngeoLocation.getParamAsInt('key2');
      expect(value).toBe(2);
    });

    it('returns undefined if no integer', () => {
      const value = ngeoLocation.getParamAsInt('key1');
      expect(value).toBe(undefined);
    });

    it('returns undefined if no integer', () => {
      const value = ngeoLocation.getParamAsInt('wrong-key');
      expect(value).toBe(undefined);
    });
  });

  describe('#getParamAsFloat', () => {
    it('returns the param value as float', () => {
      ngeoLocation.updateParams({'key2': '2.45678'});
      const value = ngeoLocation.getParamAsFloat('key2');
      expect(value).toBe(2.45678);
    });

    it('returns undefined if no float', () => {
      const value = ngeoLocation.getParamAsFloat('key1');
      expect(value).toBe(undefined);
    });

    it('returns undefined if no float', () => {
      ngeoLocation.updateParams({'key2': 'NaN'});
      const value = ngeoLocation.getParamAsFloat('key2');
      expect(value).toBe(undefined);
    });
  });

  describe('#getParamKeys', () => {
    it('returns the param keys', () => {
      const keys = ngeoLocation.getParamKeys();
      expect(keys).toEqual(['some']);
    });
  });

  describe('#updateParams', () => {
    it('updates an existing param key', () => {
      ngeoLocation.updateParams({'key1': 'new value'});
      const value = ngeoLocation.getParam('key1');
      expect(value).toBe('new value');
    });

    it('adds a new param key', () => {
      ngeoLocation.updateParams({'key3': 'value3'});
      const value = ngeoLocation.getParam('key3');
      expect(value).toBe('value3');
    });
  });

  describe('#deleteParam', () => {
    it('delete the params', () => {
      ngeoLocation.deleteParam('some');
      const uri = ngeoLocation.getUriString();
      expect(uri).toBe('http://domain.com/some/path');
    });
  });

  describe('#refresh', () => {
    it('calls history.replaceState with expected args', () => {
      ngeoLocation.refresh();
      expect(win.history.replaceState).toHaveBeenCalledWith(
        null,
        '',
        'http://domain.com/some/path?some=param'
      );
    });
  });

  describe('fragment parameters', () => {
    beforeEach(() => {
      // change url to 'http://domain.com/some/path?some=param#key1=value1&key2=2'
      ngeoLocation.updateFragmentParams({
        'key1': 'value1',
        'key2': '2',
      });
    });

    describe('#hasFragmentParam', () => {
      it('returns true if the param exists', () => {
        let value = ngeoLocation.hasFragmentParam('key1');
        expect(value).toBe(true);
        value = ngeoLocation.hasFragmentParam('missing');
        expect(value).toBe(false);
      });
    });

    describe('#getFragmentParam', () => {
      it('returns the param value', () => {
        const value = ngeoLocation.getFragmentParam('key1');
        expect(value).toBe('value1');
      });

      it('returns undefined for missing keys', () => {
        const value = ngeoLocation.getFragmentParam('no-existing-key');
        expect(value).toBe(undefined);
      });
    });

    describe('#getFragmentParamAsInt', () => {
      it('returns the param value as integer', () => {
        const value = ngeoLocation.getFragmentParamAsInt('key2');
        expect(value).toBe(2);
      });

      it('returns undefined if no integer', () => {
        const value = ngeoLocation.getFragmentParamAsInt('key1');
        expect(value).toBe(undefined);
      });

      it('returns undefined if no integer', () => {
        const value = ngeoLocation.getFragmentParamAsInt('wrong-key');
        expect(value).toBe(undefined);
      });
    });

    describe('#getFragmentParamKeys', () => {
      it('returns the param keys', () => {
        const keys = ngeoLocation.getFragmentParamKeys();
        expect(keys).toEqual(['key1', 'key2']);
      });
    });

    describe('#getFragmentParamKeysWithPrefix', () => {
      it('returns the param keys', () => {
        const keys = ngeoLocation.getFragmentParamKeysWithPrefix('key');
        expect(keys).toEqual(['key1', 'key2']);
      });
    });

    describe('#updateFragmentParams', () => {
      it('updates an existing param key', () => {
        ngeoLocation.updateFragmentParams({'key1': 'new value'});
        const value = ngeoLocation.getFragmentParam('key1');
        expect(value).toBe('new value');
      });

      it('updates an existing param key with special chars', () => {
        ngeoLocation.updateFragmentParams({'key1': '6+,7a+'});
        const value = ngeoLocation.getFragmentParam('key1');
        expect(value).toBe('6+,7a+');
      });

      it('adds a new param key', () => {
        ngeoLocation.updateFragmentParams({'key3': 'value3'});
        const value = ngeoLocation.getFragmentParam('key3');
        expect(value).toBe('value3');
      });
    });

    describe('#deleteFragmentParam', () => {
      it('delete the params', () => {
        ngeoLocation.deleteFragmentParam('key1');
        const value = ngeoLocation.getFragmentParam('key1');
        expect(value).toBe(undefined);
      });
    });
  });
});
