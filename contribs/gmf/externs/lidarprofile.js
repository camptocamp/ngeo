/**
 * Externs for a LIDARD profile web service.
 *
 * @externs
 */


/**
 * @type {Object}
 */
let lidarprofileServer;


/**
 * @typedef {Object.<number, !lidarprofileServer.ConfigClassification>}
 */
lidarprofileServer.ConfigClassifications;

/**
 * @constructor
 */
lidarprofileServer.ConfigClassification = function() {};

/**
 * @type string
 */
lidarprofileServer.ConfigClassification.prototype.color;

/**
 * @type string
 */
lidarprofileServer.ConfigClassification.prototype.name;

/**
 * @type string
 */
lidarprofileServer.ConfigClassification.prototype.value;

/**
 * @type boolean
 */
lidarprofileServer.ConfigClassification.prototype.visible;


/**
 * @typedef {!Object<number, !lidarprofileServer.ConfigLevel>}
 */
lidarprofileServer.ConfigLevels;

/**
 * @constructor
 */
lidarprofileServer.ConfigLevel = function() {};

/**
 * @type number
 */
lidarprofileServer.ConfigLevel.prototype.max;

/**
 * @type number
 */
lidarprofileServer.ConfigLevel.prototype.width;


/**
 * @typedef {Object.<string, !lidarprofileServer.ConfigPointAttribute>}
 */
lidarprofileServer.ConfigPointAttributes;

/**
 * @constructor
 */
lidarprofileServer.ConfigPointAttribute = function() {};

/**
 * @type number
 */
lidarprofileServer.ConfigPointAttribute.prototype.bytes;

/**
 * @type number
 */
lidarprofileServer.ConfigPointAttribute.prototype.elements;

/**
 * @type string
 */
lidarprofileServer.ConfigPointAttribute.prototype.name;

/**
 * @type string
 */
lidarprofileServer.ConfigPointAttribute.prototype.value;

/**
 * @type number
 */
lidarprofileServer.ConfigPointAttribute.prototype.visible;


/**
 * @constructor
 */
lidarprofileServer.Config = function() {};

/**
 * @type Object.<number, string>
 */
lidarprofileServer.Config.prototype.classes_names_normalized;

/**
 * @type Object.<number, string>
 */
lidarprofileServer.Config.prototype.classes_names_standard;

/**
 * @type lidarprofileServer.ConfigClassifications
 */
lidarprofileServer.Config.prototype.classification_colors;

/**
 * @type boolean
 */
lidarprofileServer.Config.prototype.debug;

/**
 * @type string
 */
lidarprofileServer.Config.prototype.default_attribute;

/**
 * @type string
 */
lidarprofileServer.Config.prototype.default_color;

/**
 * @type string
 */
lidarprofileServer.Config.prototype.default_point_attribute;

/**
 * @type string
 */
lidarprofileServer.Config.prototype.default_point_cloud;

/**
 * @type number
 */
lidarprofileServer.Config.prototype.initialLOD;

/**
 * @type lidarprofileServer.ConfigLevels
 */
lidarprofileServer.Config.prototype.max_levels;

/**
 * @type number
 */
lidarprofileServer.Config.prototype.max_point_number;

/**
 * @type number
 */
lidarprofileServer.Config.prototype.minLOD;

/**
 * @type lidarprofileServer.ConfigPointAttributes
 */
lidarprofileServer.Config.prototype.point_attributes;

/**
 * @type number
 */
lidarprofileServer.Config.prototype.point_size;

/**
 * @type number
 */
lidarprofileServer.Config.prototype.vertical_pan_tolerance;

/**
 * @type number
 */
lidarprofileServer.Config.prototype.width;
