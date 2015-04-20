import Ember from 'ember';

export default Ember.Component.extend({
  dragOver: function (e) { 
    return false;
  },
  dragEnd: function (e) {
    return false;
  },
  drop: function (e) {
    e.preventDefault();

    var self = this;
    var file = e.dataTransfer.files[0];
    var reader = new FileReader();

    var thing = 3;
    
    reader.onload = function (event) {
      self.set('file', {
        name: file.name,
        type: file.type,
        lastModified: file.lastModified,
        result: event.target.result
      });
    };

    reader.readAsText(file);

    return false;
  }
});
