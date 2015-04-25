import Ember from 'ember';
import Name from '../models/name';

export default Ember.Route.extend({
  model: function() {
    return Ember.A();
    // return Ember.A(Array(18)).map(function() {
    //   return Name.create({});
    // });
  }
});
