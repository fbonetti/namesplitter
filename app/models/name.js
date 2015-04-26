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
  },
  isBlank: function() {
    var attributes = [
      'salutation',
      'firstName',
      'middleInitial',
      'lastName',
      'suffix',
      'fullName'
    ];

    return attributes.every(attribute => (this.get(attribute) || '').length == 0);
  }.property('salutation', 'firstName', 'middleInitial', 'lastName', 'suffix', 'fullName')
});
