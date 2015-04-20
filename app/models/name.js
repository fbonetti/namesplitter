import DS from 'ember-data';

var Name = DS.Model.extend({
  salutation: DS.attr('string'),
  firstName: DS.attr('string'),
  middleInitial: DS.attr('string'),
  lastName: DS.attr('string'),
  suffix: DS.attr('string'),
  fullName: DS.attr('string')
});

Name.reopenClass({
  FIXTURES: [{id: 1}]
});

export default Name;
