var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rsvpSchema = new Schema({
  name: Array,
  attending: Boolean,
});

var RSVP = mongoose.model('RSVP', rsvpSchema);

module.exports = RSVP;
