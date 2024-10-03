export default (sequelize, DataTypes) => {
    const MentorshipRequest = sequelize.define("MentorshipRequest", {
        RequestID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        MentorID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Name of the Users model
                key: 'UserID'
            }
        },
        MenteeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Name of the Users model
                key: 'UserID'
            }
        },
        AvailabilityID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Availability0s', // Name of the Availability0 model
                key: 'AvailabilityID'
            }
        },
        ServiceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Services', // Name of the Services model
                key: 'ServiceID'
            }
        },
        RequestedDate: {
            type: DataTypes.DATEONLY, // For DATE type in SQL
            allowNull: false
        },
        RequestedTime: {
            type: DataTypes.TIME, // For TIME type in SQL
            allowNull: false
        },
        Status0: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });

    // Define associations here if needed

    return MentorshipRequest;
};
