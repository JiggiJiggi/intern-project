export default (sequelize, DataTypes) => {
    const Availability0s = sequelize.define("Availability0s", {
        AvailabilityID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        MentorID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Ensure this matches the model name
                key: 'UserID'
            }
        },
        DayOfWeek: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        StartTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        EndTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        IsBooked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Availability0s;
};
