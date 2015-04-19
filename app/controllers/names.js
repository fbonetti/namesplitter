import Ember from 'ember';

export default Ember.Controller.extend({
  showPrefix: true,
  showFirstName: true,
  showMiddleName: true,
  showLastName: true,
  showSuffix: true,
  file: null,

  fileChanged: function() {
    debugger;
  }.observes('file'),

  actions: {
    addRow: function() {
      this.store.createRecord('name', {});
    },
    deleteRow: function(name) {
      name.destroyRecord();
    }
  }
});
