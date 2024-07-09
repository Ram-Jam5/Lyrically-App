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