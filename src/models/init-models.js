var DataTypes = require("sequelize").DataTypes;
var _note = require("./note");
var _note_tag = require("./note_tag");
var _priority = require("./priority");
var _tag = require("./tag");
var _timetable = require("./timetable");
var _user = require("./user");

function initModels(sequelize) {
  var note = _note(sequelize, DataTypes);
  var note_tag = _note_tag(sequelize, DataTypes);
  var priority = _priority(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var timetable = _timetable(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  note.belongsToMany(tag, { as: 'id_tag_tags', through: note_tag, foreignKey: "id_note", otherKey: "id_tag" });
  tag.belongsToMany(note, { as: 'id_note_notes', through: note_tag, foreignKey: "id_tag", otherKey: "id_note" });
  note_tag.belongsTo(note, { as: "id_note_note", foreignKey: "id_note"});
  note.hasMany(note_tag, { as: "note_tags", foreignKey: "id_note"});
  timetable.belongsTo(note, { as: "id_note_note", foreignKey: "id_note"});
  note.hasMany(timetable, { as: "timetables", foreignKey: "id_note"});
  note.belongsTo(priority, { as: "id_priority_priority", foreignKey: "id_priority"});
  priority.hasMany(note, { as: "notes", foreignKey: "id_priority"});
  note_tag.belongsTo(tag, { as: "id_tag_tag", foreignKey: "id_tag"});
  tag.hasMany(note_tag, { as: "note_tags", foreignKey: "id_tag"});
  note.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(note, { as: "notes", foreignKey: "id_user"});

  return {
    note,
    note_tag,
    priority,
    tag,
    timetable,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
