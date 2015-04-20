import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isHover:hover'],
  isHover: false,

  dragOver: function () {
    this.set('isHover', true);
    return false;
  },
  dragLeave: function () {
    this.set('isHover', false);
    return false;
  },
  drop: function (e) {
    e.preventDefault();

    var self = this;
    var file = e.dataTransfer.files[0];
    var reader = new FileReader();
    
    reader.onload = function (event) {
      self.set('isHover', false);

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
