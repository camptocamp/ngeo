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

import {BehaviorSubject} from 'rxjs';

export interface AuthenticationFunctionalities {
  /**
   * Base maps to use by default.
   */
  default_basemap: string[];
  /**
   * Theme to use by default.
   */
  default_theme: string[];
  /**
   * A list of layer names that can be filtered.
   */
  filterable_layers?: string[];
  /**
   * When set, contains the name of the panel to open upon loading an application.
   */
  open_panel?: string[];
  /**
   * Default filtrable datasource name.
   */
  preset_layer_filter?: string[];
}

export interface RoleInfo {
  /**
   * Role identifier.
   */
  id: number;
  /**
   * Role name.
   */
  name: string;
}

export interface User {
  /**
   * User's email address.
   */
  email: string;
  /**
   * The user is in the intranet.
   */
  is_intranet: boolean;
  /**
   * Configured functionalities of the user.
   */
  functionalities: AuthenticationFunctionalities;
  /**
   * True if the password of the user has been changed. False otherwise.
   */
  is_password_changed: boolean;
  /**
   * Roles information.
   */
  roles: RoleInfo[];
  /**
   * The name of the user.
   */
  username: string;
  /**
   * FIXME no doc
   */
  otp_key: string;
  /**
   * FIXME no doc
   */
  otp_uri: string;
  /**
   * FIXME no doc
   */
  two_factor_totp_secret: string;
}

export enum UserState {
  /* eslint-disable no-unused-vars */
  LOGGED_IN = 'logged in',
  LOGGED_OUT = 'logged out',
  DISCONNECTED = 'disconnected',
  READY = 'ready',
  NOT_INITIALIZED = 'not initialized',
}

export class UserModel {
  /**
   * The observable user's properties. The default user is empty.
   *
   * @private
   */
  properties_: BehaviorSubject<User>;

  /**
   * The current state of the user. Default to NOT_INITIALIZED.
   *
   * @private
   */
  state_: UserState;

  constructor() {
    this.properties_ = new BehaviorSubject<User>(this.getEmptyUserProperties());
    this.state_ = UserState.NOT_INITIALIZED;
  }

  /**
   * @returns the observable user's properties.
   */
  getProperties(): BehaviorSubject<User> {
    return this.properties_;
  }

  /**
   * @returns the current user state.
   */
  getState(): UserState {
    return this.state_;
  }

  /**
   * Set the current User's properties and state.
   *
   * @param properties
   * @param state
   */
  setUser(properties: User, state: UserState) {
    const isValid = this.checkUserProperties_(properties);
    if (!isValid || state === null) {
      return;
    }
    this.state_ = state;
    this.properties_.next(properties);
  }

  /**
   * @returns an empty user.
   */
  getEmptyUserProperties(): User {
    return {
      email: null,
      is_intranet: null,
      functionalities: null,
      is_password_changed: null,
      roles: null,
      username: null,
      otp_key: null,
      otp_uri: null,
      two_factor_totp_secret: null,
    };
  }

  /**
   * Check if the user has at least all required properties.
   *
   * @param properties
   * @returns true if the properties are correct.
   * @private
   */
  checkUserProperties_(properties: User): boolean {
    if (properties === null || properties === undefined) {
      console.error('New properties of the user must be an object');
      return false;
    }
    let isValid = true;
    const keys = Object.keys(this.getEmptyUserProperties());
    keys.forEach((key) => {
      const newKeys = Object.keys(properties);
      if (!newKeys.includes(key)) {
        console.error(`User is missing property ${key}`);
        isValid = false;
      }
    });
    return isValid;
  }
}

// Export default user instantiated (to use it as a singleton).
const user = new UserModel();
export default user;
