const express= require('express');
const router = express.Router();

const User = require('../models/user.js')

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('lyrics/index.ejs', {
            lyrics: currentUser.lyrics,
        });
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});

router.get('/new', async (req, res) => {
    res.render('lyrics/new.ejs')
})

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        console.log(req.body)
        currentUser.lyrics.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/lyrics`);
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});
router.get('/users', async (req, res) => {
    const allUsers = await User.find();
    console.log(allUsers)
    res.render('users/index.ejs', {
        user: allUsers,
    })
})

router.get('/users/:userId', async (req, res) => {
    const currentUser = await User.findById(req.params.userId);
    const lyrics = currentUser.lyrics
    res.render('users/show.ejs', {
        user: currentUser,
        lyrics: lyrics,
    });
});

router.get('/:lyricsId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const lyrics = currentUser.lyrics.id(req.params.lyricsId);
        res.render('lyrics/show.ejs',{
            lyrics: lyrics,
        });
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});

router.get('/:lyricsId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const lyrics = currentUser.lyrics.id(req.params.lyricsId);
        res.render('lyrics/edit.ejs', {
            lyrics: lyrics, 
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.put('/:lyricsId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const lyrics = currentUser.lyrics.id(req.params.lyricsId);
        lyrics.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/lyrics/${req.params.lyricsId}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});

router.delete('/:lyricsId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.lyrics.id(req.params.lyricsId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/lyrics`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});




module.exports = router;