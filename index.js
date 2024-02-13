

import express from "express";
import bodyParser from 'body-parser';
const app = express();
const port = 3000;


// Array to store postsz
let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get('/',(req,res) =>{
    res.render("home.ejs");
    
})

app.get('/createPost',(req,res) =>{
    res.render("createPost.ejs");
    
})



app.get('/About',(req,res) =>{
    res.render("about.ejs");
    
})


app.get('/edit/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const post = posts[index];

    if (!post) {
        return res.status(404).send('Post not found');
    }

    if (posts.length === 0) {
        return res.status(404).send('No posts found');
    }

    // Get the most recent post
    const recentPost = posts[posts.length - 1];

    res.render("edit.ejs", {
        post: recentPost,
        index: index
    });

    console.log(index);
    console.log(post);
});


app.get('/delete/:index', (req, res) => {
    const index = parseInt(req.params.index);
    
    // Check if the index is valid
    if (index < 0 || index >= posts.length) {
        return res.status(404).send('Invalid post index');
    }

    // Remove the post at the specified index
    posts.splice(index, 1);

    // Redirect to the home page or any other appropriate page
    res.redirect('/');
});


app.post('/submit', (req, res) => {
    try {
        const nameId = req.body['name'];  
        const messageId = req.body['message'];

        // Push the new post to the posts array
        posts.push({ name: nameId, message: messageId });
        console.log(posts)

        // Pass the data to the template and render it
        res.render("home.ejs", {
            nameId: nameId,
            messageId: messageId
        });
    } catch (error) {
        console.error("Error rendering template:", error);
        res.status(500).send("Error rendering template");
    }
});

app.listen(port , ()=>{
    console.log(`server started running on ${port}`);
});