const express = require('express')
const router = express.Router()
const Jokes = require('./jokes_model.js')
const privateRoute = require('./private_route');

//the commented out privateRoute is the one you made when i was getting issues i tried to make my own as well so thats the 
//one thats uncommented. they are both named the same thing so if you wanna swap you can just uncomment yours and comment out mine.

// const privateRoute = require('../auth/middleware.js');

//will return only the public jokes
router.get('/', (req, res) => {
    Jokes.find().then((joke) => {
        if (!joke) {
            res.status(404).json({ message: 'sorry, you do not have access try signing up!' })
        } else {
            res.status(200).json(joke)
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ error: "db error: " })
    })
})
// will return all the jokes wether they are public or private
router.get('/all', privateRoute, (req, res) => {
    Jokes.find().then((_joke) => {
        if (!_joke) {
            res.status(404).json({ message: 'sorry, there are no jokes.' })
        } else {
            res.status(200).json(_joke)
        }
    }).catch(() => {
        res.status(500).json({ error: "db error: ", error })
    })
})
router.post(`/:user_id`, (req, res) => {
    const { user_id } = req.params
    const { setup, punchline } = req.body
    console.log(req.params, req.body)
    Jokes.postJoke({setup, punchline, user_id})
    .then(joke => {
        console.log(joke)
        if (!joke) {
            res.status(404).json({ message: 'sorry, joke could not be created.' })
        } else {
            res.status(201).json({message:'saved success..'})
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ error: "db error: " })
    })
})
// router.get('/saved/:username', privateRoute, (req, res) => {
//     const {username} = req.params
//     Jokes.getSavedJoke(username).then((_joke) => {
//         if (!_joke) {
//             res.status(404).json({ message: 'sorry, there are no jokes.' })
//         } else {
//             res.status(200).json(_joke)
//         }
//     }).catch((err) => {
//         res.status(500).json({ error: "db error: ", error })
//     })
// })

// router.post('/:username', privateRoute, (req, res) => {
//     let joke = req.body
//     const joke_owner = req.params.username
//     joke = {
//         ...joke,
//         joke_owner
//     }
//     Jokes.add(joke)
//         .then((_joke) => {
//             if (!_joke) {
//                 res.status(404).json({ message: 'sorry, something has gone wrong.' })
//             } else {
//                 res.status(201).json({ message: 'joke has been created successfully!' })
//             }
//         }).catch((_err) => {
//             res.status(500).json({ error: "db error: ", error })
//         })
// })
router.delete('/:joke_id', (req, res) => {
    const { joke_id } = req.params
    Jokes.remove(joke_id)
        .then((joke) => {
            if (!joke) {
                res.status(404).json({ message: 'sorry no joke exists with that id.' })
            } else {
                res.status(200).json({ message: 'joke has been deleted successfully!'})
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).json({ error: "db error: "})
        })
})
router.put('/:id/:user_id', (req, res) => {
    const { id, user_id } = req.params
    const { setup, punchline } = req.body
    console.log(req.body, req.params)
    Jokes.update({id, setup, punchline,user_id })
        .then((joke) => {
            console.log(joke)
            if (!joke) {
                res.status(404).json({ message: 'sorry, something went wrong.' })
            } else {
                res.status(200).json({ message: 'joke has been updated successfully!' })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: "db error: " })
        })
})
module.exports = router

































// // const router = require('express').Router();
// const jokes = require('./jokes-model.js');


// router.get("/jokes", async (req, res) => {
//     try {
//         const allJokes = await jokes.find();

//         allJokes
//             ? res.status(200).json(allJokes)
//             : res.status(400).json({ message: "no jokes found." });
//     }   catch (error) {
//             res.status(500).json({ error: "db error: ", error });
//     }
// });

// router.get("/jokes/:id", async (req, res) => {
//     try {
//         const thisJoke = await jokes.findById(req.params.id);
//         thisJoke
//             ? res.status(200).json(thisJoke)
//             : res.status(400).json({ message: "joke not found." });
//     }   catch (error) {
//             res.status(500).json({ error: "db error: ", error });
//     }
// });

// router.post("/jokes", async (req,res) => {
//     try {
//         const newJoke = await jokes.add(req.body);
//         newJoke
//             ? res.status(201).json({ newJoke })
//             : res.status(400).json({ message: "Sorry, could not create joke." });
//     }   catch (error) {
//         res.status(500).json({ error: "db error: ", error });
//     }
// });

// router.post("/jokes/:id", async (req,res) => {
//     try {
//         const updateJoke = await jokes.update(req.params.id, req.body);
//         updateJoke
//             ? res.status(200).json({updateJoke})
//             : res.status(400).json({ message: "Could not update." });
//     }   catch (error) {
//         res.status(500).json({ error: "db error: ", error });
//     }
// });

// router.delete("/jokes/:id", async (req,res) => {
//     const { id } = req.params;
//     try {
//         const deleteJoke = await jokes.remove(id);

//         deleteJoke && res.status(200).json({ message: "Joke has been deleted." });
//     }   catch (error) {
//         res.status(500).json({ error: "db error: ", error });
//     }
// });

// module.exports = router;
