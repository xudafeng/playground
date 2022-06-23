'use strict';

const { DataTypes } = require('leoric');

const { INTEGER, STRING } = DataTypes;

module.exports = (db) => {
  class Test1 extends db.Bone {
  }

  Test1.init({
    id: {
      type: INTEGER,
      primaryKey: true
    },
    name: STRING,
  }, {
    tableName: 'test1',
  });

  return Test1;
};
