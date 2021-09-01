import { BehaviorSubject } from "rxjs";

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
  otp_url: string;
}

export class UserModel {
  /**
   * The observable user's config.
   * @private
   */
  config_: BehaviorSubject<User>;

  constructor() {
    const defaultUser: User = {
      email: null,
      is_intranet: null,
      functionalities: null,
      is_password_changed: null,
      roles: null,
      username: null,
      otp_key: null,
      otp_url: null,
    }
    this.config_ = new BehaviorSubject<User>(defaultUser);
  }

  /**
   * Return the observable User's config.
   */
  getConfig(): BehaviorSubject<User> {
    return this.config_;
  }

  /**
   * Set the current User's config.
   */
  setConfig(config: User) {
    this.config_.next(config);
  }
}

// Export default user instantiated (to use it as a singleton).
const user = new UserModel();
export default user;
