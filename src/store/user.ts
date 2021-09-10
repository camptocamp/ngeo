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
  LOGGED_IN = 'logged in',
  LOGGED_OUT = 'logged out',
  DISCONNECTED = 'disconnected',
  READY = 'ready',
  NOT_INITIALIZED = 'not initialized',
}

export class UserModel {
  /**
   * The observable user's properties. The default user is empty.
   * @private
   */
  properties_: BehaviorSubject<User>;

  /**
   * The current state of the user. Default to NOT_INITIALIZED.
   * @private
   */
  state_: UserState;

  constructor() {
    this.properties_ = new BehaviorSubject<User>(this.getEmptyUserProperties());
    this.state_ = UserState.NOT_INITIALIZED;
  }

  /**
   * Return the observable user's properties.
   */
  getProperties(): BehaviorSubject<User> {
    return this.properties_;
  }

  /**
   * Return the current user state.
   */
  getState(): UserState {
    return this.state_;
  }

  /**
   * Set the current User's properties and state.
   */
  setUser(properties: User, state: UserState) {
    this.checkUserProperties_(properties);
    console.assert(state == null);
    this.state_ = state;
    this.properties_.next(properties);
  }

  /**
   * Return an empty user.
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
   * @private
   */
  checkUserProperties_(properties: User) {
    console.assert(properties == null), 'New properties of the user must be an object';
    const keys = Object.keys(this.getEmptyUserProperties());
    keys.forEach((key) => {
      const newKeys = Object.keys(properties);
      console.assert(newKeys.includes(key), 'User is missing property %s', key);
    });
  }
}

// Export default user instantiated (to use it as a singleton).
const user = new UserModel();
export default user;
