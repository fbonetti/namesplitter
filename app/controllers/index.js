import Ember from 'ember';
import Name from '../models/name';

export default Ember.Controller.extend({
  showSalutation: true,
  showFirstName: true,
  showMiddleInitial: true,
  showLastName: true,
  showSuffix: true,
  file: null,

  fileChanged: function() {
    var file = this.get('file');
    var model = this.get('model');

    if (file && file.type === "text/csv") {
      model.clear();

      var csvParser = new SimpleExcel.Parser.CSV();
      csvParser.loadString(file.result);
      
      var rows = csvParser.getSheet(1);

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var cell = row[0];
        var fullName = cell.value;

        if (fullName.length === 0) { continue; }

        var parts = NameParse.parse(fullName);

        model.pushObject(
          Name.create({
            salutation: parts.salutation,
            firstName: parts.firstName,
            middleInitial: parts.intials,
            lastName: parts.lastName,
            suffix: parts.suffix,
            fullName: fullName
          })
        );
      }
    }
  }.observes('file'),

  actions: {
    addRow: function() {
      this.get('model').pushObject(Name.create({}));
    },
    deleteRow: function(name) {
      this.get('model').removeObject(name);
    },
    exportToCsv: function() {
      var self = this;
      var csvWriter = new SimpleExcel.Writer.CSV();
      var sheet = new SimpleExcel.Sheet();
      var Cell = SimpleExcel.Cell;

      var records = [[]];

      // Set up the header row
      if (self.get('showSalutation')) {
        records[0].push(new Cell('Salutation', 'TEXT'));
      }
      if (self.get('showFirstName')) {
        records[0].push(new Cell('First Name', 'TEXT'));
      }
      if (self.get('showMiddleInitial')) {
        records[0].push(new Cell('Middle Initial', 'TEXT'));
      }
      if (self.get('showLastName')) {
        records[0].push(new Cell('Last Name', 'TEXT'));
      }
      if (self.get('showSuffix')) {
        records[0].push(new Cell('Suffix', 'TEXT'));
      }

      // Insert each name as a row
      this.get('model').forEach(function(item) {
        var cells = [];

        if (self.get('showSalutation')) {
          cells.push(new Cell(item.get('salutation') || '', 'TEXT'));
        }
        if (self.get('showFirstName')) {
          cells.push(new Cell(item.get('firstName') || '', 'TEXT'));
        }
        if (self.get('showMiddleInitial')) {
          cells.push(new Cell(item.get('middleInitial') || '', 'TEXT'));
        }
        if (self.get('showLastName')) {
          cells.push(new Cell(item.get('lastName') || '', 'TEXT'));
        }
        if (self.get('showSuffix')) {
          cells.push(new Cell(item.get('suffix') || '', 'TEXT'));
        }

        records.push(cells);
      });

      sheet.setRecords(records);
      csvWriter.removeSheet(1);
      csvWriter.insertSheet(sheet);
      csvWriter.saveFile();
    }
  }
});
