import Ember from 'ember';
import Name from '../models/name';

export default Ember.Controller.extend({
  showSalutation: true,
  showFirstName: true,
  showMiddleInitial: true,
  showLastName: true,
  showSuffix: true,
  file: null,
  list: "",

  inputCellClass: function() {
    var columns = 0;

    if (this.get('showSalutation')) {
      columns += 1;
    }

    if (this.get('showFirstName')) {
      columns += 1;
    }

    if (this.get('showMiddleInitial')) {
      columns += 1;
    }

    if (this.get('showLastName')) {
      columns += 1;
    }

    if (this.get('showSuffix')) {
      columns += 1;
    }

    return `cell-width-${columns}`;
  }.property('showSalutation', 'showFirstName', 'showMiddleInitial', 'showLastName', 'showSuffix'),

  fileChanged: function() {
    var file = this.get('file');
    var model = this.get('model');

    if (file && file.type === "text/csv") {
      var csvParser = new SimpleExcel.Parser.CSV();
      csvParser.loadString(file.result);
      
      var rows = csvParser.getSheet(1);
      var fullNames = [];

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var cell = row[0];
        var fullName = $.trim(cell.value);

        if (fullName.length === 0) { continue; }

        fullNames.push(fullName)
      }

      this.set('list', fullNames.join("\n"));
    }
  }.observes('file'),

  listChanged: function() {
    var model = this.get('model');
    model.clear();

    var fullNames = this.get('list').split("\n");

    for (var i = 0; i < fullNames.length; i++) {
      var fullName = fullNames[i];

      if (fullName.length === 0) { continue; }

      // Skip invalid names
      try {
        var parts = NameParse.parse(fullName);
      } catch (e) {
        continue;
      }

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
  }.observes('list'),

  actions: {
    addRow: function() {
      this.get('model').pushObject(Name.create({}));
      
      // I know this is bad practice.. but whatever
      setTimeout(function() {
        var $listElement = $(".ember-list-view-list");
        var height = $listElement[0].scrollHeight;
        $listElement.scrollTop(height);
      }, 1);
    },
    deleteRow: function(name) {
      var model = this.get('model');
      var obj = model.findBy('id', name.get('id'));

      model.removeObject(obj);
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
