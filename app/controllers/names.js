import Ember from 'ember';

export default Ember.Controller.extend({
  showSalutation: true,
  showFirstName: true,
  showMiddleInitial: true,
  showLastName: true,
  showSuffix: true,
  file: null,

  fileChanged: function() {
    var file = this.get('file');

    if (file && file.type === "text/csv") {
      this.get('model').forEach(function(name) {
        name.destroyRecord();
      });

      var csvParser = new SimpleExcel.Parser.CSV();
      csvParser.loadString(file.result);
      
      var rows = csvParser.getSheet(1);

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var cell = row[0];
        var fullName = cell.value;

        if (fullName.length === 0) { continue; }

        var parts = NameParse.parse(fullName);

        this.store.createRecord('name', {
          salutation: parts.salutation,
          firstName: parts.firstName,
          middleInitial: parts.intials,
          lastName: parts.lastName,
          suffix: parts.suffix,
          fullName: fullName
        });
      }
    }
  }.observes('file'),

  actions: {
    addRow: function() {
      this.store.createRecord('name', {});
    },
    deleteRow: function(name) {
      name.destroyRecord();
    },
    exportToCsv: function() {
      var self = this;
      var csvWriter = new SimpleExcel.Writer.CSV();
      var sheet = new SimpleExcel.Sheet();
      var Cell = SimpleExcel.Cell;

      var records = this.get('model').map(function(item) {
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

        return cells;
      });

      sheet.setRecords(records);
      csvWriter.insertSheet(sheet);
      csvWriter.saveFile();
    }
  }
});