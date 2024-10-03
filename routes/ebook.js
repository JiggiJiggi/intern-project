const express = require('express');
const path = require('path');
const router = express.Router();



//endpoint to get ebook
router.get('/ebook', (req, res) => {
    const ebookDetails = {
        id: 1,
        title: 'Java Ebook',
        coverImage: "",
        pdfUrl: 'https://1drv.ms/b/c/06710420a90fe329/EcpAuAi5K3xOo-HXQzG2eBkBMkhjPMKFcfQVlpkdN6-r2Q',

    }
    res.status(200).send('You have accessed the ebook')
res.json(ebookDetails);
});

// Serve the cover image
router.get('/images/:filename', (req, res) => {
    const options = {
        root: path.join(__dirname, '../public/images'),
    };    const fileName = req.params.filename;
    res.sendFile(fileName, options);
});
//serve the ebook
router.get('/ebooks/:filename', (req, res) => {
    const options = {
        root: path.join(__dirname, '../public/ebooks'),
    };    const fileName = req.params.filename
    res.sendFile(fileName, options);
});

module.exports = router;

