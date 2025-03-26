
// 1

// INSERTION 

db.lego.insertMany([
    {
        'nom': 'Lego Creator 3-in-1',
        'annee_sortie': 2020,
        'nombre_de_pieces': 564,
        'prix': 59.99,
        'evaluations': [
            { 'utilisateur': 'Charlie', 'note': 4 }
        ]
    },
    {
        'nom': 'Faucon Millenium',
        'annee_sortie': 2019,
        'nombre_de_pieces': 1050,
        'prix': 89.99,
        'theme': 'Star Wars',
        'evaluations': [
            { 'utilisateur': 'David', 'note': 5 },
            { 'utilisateur': 'Eve', 'note': 3 }
        ]

    }

])

// 2

// a 

db.lego.updateOne(
    {
        _id: ObjectId('67e3fbde31e6d6f245552f25')
    },
    {
        $set: { 'prix': 49.99 }
    }
)

//b 

db.lego.updateOne(
    {
        _id: ObjectId('67e3fbca6b81345650bf5c8e')
    },
    {
        $push: { 'evaluations': { 'utilisateur': 'Frank', 'note': 4 } }
    }
)


// 3

// a 

db.lego.find({ 'theme': 'Star Wars' })
    .sort({ 'annee_sortie': -1 })

// b

db.lego.find({ 'prix': { $gt: 100 } })
    .sort({ 'nombre_de_pieces': -1 })

// c 

db.lego.find({}, { 'nom': 1, 'nombre_de_figures': 1 })
    .sort({ 'nombre_de_figures': -1 })
    .limit(3)

// d

db.lego.find({
    'evaluations.note': { $gte: 4 }
})

// e

db.lego.find({
    'theme': { $in: ['Technic', 'Creator'] },
    'nombre_de_pieces': { $lt: 2000 }
})

// f 

db.lego.find({
    'theme': 'Harry Potter',
    'annee_sortie': { $gte: 2000, $lte: 2010 }
})

// g 

db.lego.aggregate([
    {
        $addFields: {
            moyenne_note: {
                $avg: "$evaluations.note"
            }
        }
    },
    {
        $match: {
            'nombre_de_pieces': { $gt: 1000 },
            moyenne_note: { $gte: 4 }
        }
    }
])

// h 

db.lego.find({
    "evaluations": {
        $not: { $elemMatch: { note: { $ne: 5 } } } // j'aime pas u tout mais c'est une solution qui marche 
    }
})

// 4 

// a 

db.lego.updateOne(
    {
        "nom": "Faucon Millenium"
    },
    {
        $pull: {
            "evaluations": {
                "utilisateur": "Frank" // c'est frank et non bob la note rajouté
            }
        }
    }
)


// b

db.lego.deleteMany({
    'nombre_de_pieces': { $lt: 1000 }
})
