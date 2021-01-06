const db = require("./models/index");

const getAllItemsFor = async instrumentName => {
    switch (instrumentName) {
        case "ABL":
            try {
                const abl = await db.instrument.findOne({ attributes: ["id"], where: { name: "ABL"} });
                const items = await db.item.findAll({
                    where: {
                        instrumentId: abl.id
                    },
                    include: [{
                        model: db.transaction
                    }]
                });
                return items;
            } catch(err) {
                console.error(`Unable to find ABL items: ${err}`);
            }
        default:
            return;
    }
}

module.exports = { getAllItemsFor };