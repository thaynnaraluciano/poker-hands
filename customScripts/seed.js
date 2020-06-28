var seeder = require('mongoose-seed');
var mongoose = require('mongoose');

seeder.connect('mongodb+srv://' + process.env.MONGO_ATLAS_CONNECTION_STRING, function(){

    seeder.loadModels(['api/models/cards.js']);

    seeder.clearModels(['Cards'], function(){
        seeder.populateModels(data, function(){
            seeder.disconnect();
        })
    });
});

var data = [
    {
        'model': 'Cards',
        'documents': [
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "A",
                "suit": "Copas",
                "sequential": 14
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "2",
                "suit": "Copas",
                "sequential": 2
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "3",
                "suit": "Copas",
                "sequential": 3
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "4",
                "suit": "Copas",
                "sequential": 4
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "5",
                "suit": "Copas",
                "sequential": 5
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "6",
                "suit": "Copas",
                "sequential": 6
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "7",
                "suit": "Copas",
                "sequential": 7
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "8",
                "suit": "Copas",
                "sequential": 8
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "9",
                "suit": "Copas",
                "sequential": 9
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "10",
                "suit": "Copas",
                "sequential": 10
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "J",
                "suit": "Copas",
                "sequential": 11
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "Q",
                "suit": "Copas",
                "sequential": 12
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "K",
                "suit": "Copas",
                "sequential": 13
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "A",
                "suit": "Ouros",
                "sequential": 14
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "2",
                "suit": "Ouros",
                "sequential": 2
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "3",
                "suit": "Ouros",
                "sequential": 3
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "4",
                "suit": "Ouros",
                "sequential": 4
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "5",
                "suit": "Ouros",
                "sequential": 5
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "6",
                "suit": "Ouros",
                "sequential": 6
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "7",
                "suit": "Ouros",
                "sequential": 7
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "8",
                "suit": "Ouros",
                "sequential": 8
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "9",
                "suit": "Ouros",
                "sequential": 9
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "10",
                "suit": "Ouros",
                "sequential": 10
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "J",
                "suit": "Ouros",
                "sequential": 11
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "Q",
                "suit": "Ouros",
                "sequential": 12
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "K",
                "suit": "Ouros",
                "sequential": 13
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "A",
                "suit": "Espadas",
                "sequential": 14
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "2",
                "suit": "Espadas",
                "sequential": 2
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "3",
                "suit": "Espadas",
                "sequential": 3
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "4",
                "suit": "Espadas",
                "sequential": 4
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "5",
                "suit": "Espadas",
                "sequential": 5
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "6",
                "suit": "Espadas",
                "sequential": 6
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "7",
                "suit": "Espadas",
                "sequential": 7
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "8",
                "suit": "Espadas",
                "sequential": 8
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "9",
                "suit": "Espadas",
                "sequential": 9
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "10",
                "suit": "Espadas",
                "sequential": 10
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "J",
                "suit": "Espadas",
                "sequential": 11
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "Q",
                "suit": "Espadas",
                "sequential": 12
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "K",
                "suit": "Espadas",
                "sequential": 13
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "A",
                "suit": "Paus",
                "sequential": 14
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "2",
                "suit": "Paus",
                "sequential": 2
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "3",
                "suit": "Paus",
                "sequential": 3
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "4",
                "suit": "Paus",
                "sequential": 4
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "5",
                "suit": "Paus",
                "sequential": 5
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "6",
                "suit": "Paus",
                "sequential": 6
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "7",
                "suit": "Paus",
                "sequential": 7
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "8",
                "suit": "Paus",
                "sequential": 8
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "9",
                "suit": "Paus",
                "sequential": 9
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "10",
                "suit": "Paus",
                "sequential": 10
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "J",
                "suit": "Paus",
                "sequential": 11
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "Q",
                "suit": "Paus",
                "sequential": 12
            },
            {
                 "_id": new mongoose.Types.ObjectId(),
                "symbol": "K",
                "suit": "Paus",
                "sequential": 13
            }
        ]
    }
]
