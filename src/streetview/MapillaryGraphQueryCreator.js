/**
 * Mapillary GraphQueryCreator which allow filtering by organisation_id.
 */
export default class MapillaryGraphQueryCreator {
  /**
   * @param {string} organizationId The id of the organization to get images from.
   */
  constructor(organizationId) {
    this.organizationId = organizationId;

    this.imagesPath = 'images';
    this.sequencePath = 'image_ids';
    this._imageTilesPath = 'tiles';

    this.coreFields = ['computed_geometry', 'geometry', 'sequence'];
    this.idFields = ['id'];
    this.spatialFields = [
      'altitude',
      'atomic_scale',
      'camera_parameters',
      'camera_type',
      'captured_at',
      'compass_angle',
      'computed_altitude',
      'computed_compass_angle',
      'computed_rotation',
      'creator',
      'exif_orientation',
      'height',
      'merge_cc',
      'mesh',
      'organization',
      'quality_score',
      'sfm_cluster',
      'thumb_1024_url',
      'thumb_2048_url',
      'width',
    ];
    this.imageTileFields = ['url', 'z', 'x', 'y'];
  }

  images(imageIds, fields) {
    return `image_ids=${imageIds.join(',')}&fields=${fields.join(',')}`;
  }

  imagesS2(cellId, fields) {
    return `organization_id=${this.organizationId}&s2=${cellId}&fields=${fields.join(',')}`;
  }

  imageTiles(z, fields) {
    return `z=${z}&fields=${fields.join(',')}`;
  }

  imageTilesPath(imageId) {
    return `${imageId}/${this._imageTilesPath}`;
  }

  sequence(sequenceId) {
    return `sequence_id=${sequenceId}`;
  }
}
