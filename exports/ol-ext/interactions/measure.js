goog.require('ngeo.interaction.Measure');
goog.require('ngeo.interaction.MeasureArea');
goog.require('ngeo.interaction.MeasureAzimut');
goog.require('ngeo.interaction.MeasureLength');


goog.exportSymbol('ngeo.interaction.Measure.getFormattedArea',
    ngeo.interaction.Measure.getFormattedArea);
goog.exportSymbol('ngeo.interaction.Measure.getFormattedLength',
    ngeo.interaction.Measure.getFormattedLength);
goog.exportSymbol('ngeo.interaction.MeasureArea',
    ngeo.interaction.MeasureArea);
goog.exportSymbol('ngeo.interaction.MeasureAzimut',
    ngeo.interaction.MeasureAzimut);
goog.exportSymbol('ngeo.interaction.MeasureLength',
    ngeo.interaction.MeasureLength);

goog.exportProperty(
    ngeo.interaction.Measure.prototype,
    'getTooltipElement',
    ngeo.interaction.Measure.prototype.getTooltipElement);
