goog.provide('ngeo.extendedProfile.config');


ngeo.extendedProfile.config.profileConfig = {};
ngeo.extendedProfile.config.profileConfig.pointclouds = {};
ngeo.extendedProfile.config.profileConfig.classification = {};

/***
@SITN/OM 2017
Read client app config from server
***/

ngeo.extendedProfile.config.getProfileConfig = function (pytreeserver_url) {
  
  // Classification colors
  $.ajax({
    url: pytreeserver_url + '/get_classification_colors',
  })
  .done(function(data) {
    ngeo.extendedProfile.config.profileConfig.classification = data;
    let html = '';
    for (let i in data) {
      html += '<input checked type="checkbox" onchange="setClassActive(this);" value=\''+ i +'\'>classe: '+  data[i].name
    }
    $('#classes').html(html);        
  });

  // Default material
  $.ajax({
    url: pytreeserver_url + '/get_default_material',
  })
  .done(function(data) {
      ngeo.extendedProfile.config.profileConfig.defautMaterial = data;
  });

}

ngeo.extendedProfile.config.plotParams = {};
ngeo.extendedProfile.config.plotParams.currentScaleX = {};
ngeo.extendedProfile.config.plotParams.currentScaleY = {};
ngeo.extendedProfile.config.plotParams.currentZoom = 1;

ngeo.extendedProfile.config.pointAttributes = {};

ngeo.extendedProfile.config.pointAttributes.POSITION_CARTESIAN = {
  name: 'POSITION_CARTESIAN',
  elements: 3,
  bytes: 12
}

ngeo.extendedProfile.config.pointAttributes.POSITION_PROJECTED_PROFILE = {
  name: 'POSITION_PROJECTED_PROFILE',
  elements: 2,
  bytes: 8
}

ngeo.extendedProfile.config.pointAttributes.COLOR_PACKED = {
  name: 'COLOR_PACKED',
  elements: 4,
  bytes: 4
}

ngeo.extendedProfile.config.pointAttributes.RGB = {
  name: 'RGB',
  elements: 3,
  bytes: 3
}

ngeo.extendedProfile.config.pointAttributes.RGBA = {
  name: 'RGBA',
  elements: 4,
  bytes: 4
}

ngeo.extendedProfile.config.pointAttributes.INTENSITY = {
  name: 'INTENSITY',
  elements: 1,
  bytes: 2
}

ngeo.extendedProfile.config.pointAttributes.CLASSIFICATION = {
  name: 'CLASSIFICATION',
  elements: 1,
  bytes: 1
}
