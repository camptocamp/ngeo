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

import user, {UserState} from '../../src/store/user';

describe('Test store user', () => {
  beforeEach(() => {
    const newUser = user.getEmptyUserProperties();
    user.setUser(newUser, UserState.NOT_INITIALIZED);
  });

  it('Get instance of the user', () => {
    expect(user).not.to.be.undefined;
    expect(user.getProperties().value).to.deep.equal(user.getEmptyUserProperties());
    expect(user.getState()).to.equal(UserState.NOT_INITIALIZED);
  });

  it('Set the user config', () => {
    const newUser = user.getEmptyUserProperties();
    newUser.username = 'Simone';
    user.setUser(newUser, UserState.LOGGED_IN);
    expect(user.getProperties().value).to.deep.equal(newUser);
    expect(user.getState()).to.equal(UserState.LOGGED_IN);
  });

  it('Set a wrong config', () => {
    const newUser = user.getEmptyUserProperties();
    delete newUser.email; // To test the case where the server gives a not complete user.
    user.setUser(newUser, UserState.LOGGED_OUT);
    expect(user.getState()).to.equal(UserState.NOT_INITIALIZED);
    expect(user.getProperties().value).to.deep.equal(user.getEmptyUserProperties());
  });
});
