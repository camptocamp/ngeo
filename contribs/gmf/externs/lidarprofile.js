/**
 * Externs for a LIDARD profile web service.
 *
 * @externs
 */


/**
 * @type {Object}
 */
let lidarProfileServer;


/**
 * @typedef {Object.<number, !lidarProfileServer.ConfigClassification>}
 */
lidarProfileServer.ConfigClassifications;

/**
 * @constructor
 * @struct
 */
lidarProfileServer.ConfigClassification = function() {};

/**
 * @type string
 */
lidarProfileServer.ConfigClassification.prototype.color;

/**
 * @type string
 */
lidarProfileServer.ConfigClassification.prototype.name;

/**
 * @type string
 */
lidarProfileServer.ConfigClassification.prototype.value;

/**
 * @type boolean
 */
lidarProfileServer.ConfigClassification.prototype.visible;


/**
 * @typedef {!Object<number, !lidarProfileServer.ConfigLevel>}
 */
lidarProfileServer.ConfigLevels;

/**
 * @constructor
 * @struct
 */
lidarProfileServer.ConfigLevel = function() {};

/**
 * @type number
 */
lidarProfileServer.ConfigLevel.prototype.max;

/**
 * @type number
 */
lidarProfileServer.ConfigLevel.prototype.width;


/**
 * @typedef {Object.<string, !lidarProfileServer.ConfigPointAttribute>}
 */
lidarProfileServer.ConfigPointAttributes;

/**
 * @constructor
 * @struct
 */
lidarProfileServer.ConfigPointAttribute = function() {};

/**
 * @type number
 */
lidarProfileServer.ConfigPointAttribute.prototype.bytes;

/**
 * @type number
 */
lidarProfileServer.ConfigPointAttribute.prototype.elements;

/**
 * @type string
 */
lidarProfileServer.ConfigPointAttribute.prototype.name;

/**
 * @type string
 */
lidarProfileServer.ConfigPointAttribute.prototype.value;

/**
 * @type number
 */
lidarProfileServer.ConfigPointAttribute.prototype.visible;


/**
 * @constructor
 * @struct
 */
lidarProfileServer.Config = function() {};

/**
 * @type Object.<number, string>
 */
lidarProfileServer.Config.prototype.classes_names_normalized;

/**
 * @type Object.<number, string>
 */
lidarProfileServer.Config.prototype.classes_names_standard;

/**
 * @type lidarProfileServer.ConfigClassifications
 */
lidarProfileServer.Config.prototype.classification_colors;

/**
 * @type boolean
 */
lidarProfileServer.Config.prototype.debug;

/**
 * @type string
 */
lidarProfileServer.Config.prototype.default_attribute;

/**
 * @type string
 */
lidarProfileServer.Config.prototype.default_color;

/**
 * @type string
 */
lidarProfileServer.Config.prototype.default_point_attribute;

/**
 * @type string
 */
lidarProfileServer.Config.prototype.default_point_cloud;

/**
 * @type number
 */
lidarProfileServer.Config.prototype.initialLOD;

/**
 * @type lidarProfileServer.ConfigLevels
 */
lidarProfileServer.Config.prototype.max_levels;

/**
 * @type number
 */
lidarProfileServer.Config.prototype.max_point_number;

/**
 * @type number
 */
lidarProfileServer.Config.prototype.minLOD;

/**
 * @type lidarProfileServer.ConfigPointAttributes
 */
lidarProfileServer.Config.prototype.point_attributes;

/**
 * @type number
 */
lidarProfileServer.Config.prototype.point_size;

/**
 * @type number
 */
lidarProfileServer.Config.prototype.vertical_pan_tolerance;

/**
 * @type number
 */
lidarProfileServer.Config.prototype.width;
