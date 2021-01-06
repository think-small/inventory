module.exports = (sequelize, DataTypes) => {
    const Instrument = sequelize.define("instrument", {
        name: DataTypes.STRING(100),
        displayName: DataTypes.STRING(100),
        manufacturer: DataTypes.STRING(100),
        serviceHotline: {
            type: DataTypes.STRING,
            is: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i
        }
    });

    Instrument.associate = models => {
        Instrument.hasMany(models.item);
    }

    return Instrument;
}