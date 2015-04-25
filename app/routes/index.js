import Ember from 'ember';
import Name from '../models/name';

export default Ember.Route.extend({
  model: function() {
    return Ember.A([
      Name.create({firstName: 'Frank', lastName: 'Bonetti'}),
      Name.create({firstName: 'Amanda', lastName: 'LaPointe'}),
      Name.create({firstName: 'Frank', lastName: 'Bonetti'}),
      Name.create({firstName: 'Amanda', lastName: 'LaPointe'}),
      Name.create({firstName: 'Frank', lastName: 'Bonetti'}),
      Name.create({firstName: 'Amanda', lastName: 'LaPointe'}),
      Name.create({firstName: 'Frank', lastName: 'Bonetti'}),
      Name.create({firstName: 'Amanda', lastName: 'LaPointe'}),
      Name.create({firstName: 'Frank', lastName: 'Bonetti'}),
      Name.create({firstName: 'Amanda', lastName: 'LaPointe'}),
      Name.create({firstName: 'Frank', lastName: 'Bonetti'}),
      Name.create({firstName: 'Amanda', lastName: 'LaPointe'}),
      Name.create({firstName: 'Frank', lastName: 'Bonetti'}),
      Name.create({firstName: 'Amanda', lastName: 'LaPointe'}),
      Name.create({firstName: 'Frank', lastName: 'Bonetti'}),
      Name.create({firstName: 'Amanda', lastName: 'LaPointe'}),
      Name.create({firstName: 'Frank', lastName: 'Bonetti'}),
      Name.create({firstName: 'Amanda', lastName: 'LaPointe'}),
      Name.create({firstName: 'Frank', lastName: 'Bonetti'}),
      Name.create({firstName: 'Amanda', lastName: 'LaPointe'}),
      Name.create({firstName: 'Frank', lastName: 'Bonetti'}),
      Name.create({firstName: 'Amanda', lastName: 'LaPointe'})
    ]);
  }
});
