const Attendance = sequelize.define('Attendance', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    clockIn: { type: DataTypes.DATE, allowNull: false },
    clockOut: { type: DataTypes.DATE, allowNull: true },
  }, { timestamps: true });
  
  module.exports = Attendance;