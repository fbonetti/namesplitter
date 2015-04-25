import DS from 'ember-data';

var idGenerator = (function() {
  var id = 0;

  return function() {
    return id++;
  }
})();

export default Ember.Object.extend({
  init: function() {
    this.set('id', idGenerator());
  }
});
