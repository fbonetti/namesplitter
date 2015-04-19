import DS from 'ember-data';

var Name = DS.Model.extend({
  prefix: DS.attr('string'),
  firstName: DS.attr('string'),
  middleName: DS.attr('string'),
  lastName: DS.attr('string'),
  suffix: DS.attr('string'),
  fullName: DS.attr('string')
});

Name.reopenClass({
  FIXTURES: [
    {
      id: 1,
      prefix: '',
      firstName: 'Frank',
      middleName: 'Richard',
      lastName: 'Bonetti',
      suffix: 'Jr.',
      fullName: 'Frank Richard Bonetti Jr.'
    }
  ]
});

export default Name;