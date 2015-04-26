import Ember from 'ember';
import Name from '../models/name';

export default Ember.Route.extend({
  model: function() {
    var blankRows = Ember.A();

    for (var i = 0; i < 18; i++) {
      blankRows.pushObject(Name.create({}));
    }

    return blankRows;
  }
});
