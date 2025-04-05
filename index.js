const express = require('express');
const app = express();
var methodOverride = require('method-override');
const port = 5050;
const path = require('path');
const { v4: uuidv4 } = require('uuid');


// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'))); 

let posts = [
    {
        id : uuidv4(),
        username : 'Sahil Sharma',
        content : 'this is my first post'
    },
    {
        id : uuidv4(),
        username : 'Saksham Sharma',
        content : 'this is my second post'
    },
    {
        id : uuidv4(),
        username : 'Rahul Pal',
        content : 'this is my third post'
    },
    {
        id :uuidv4(),
        username : 'Saiyam Bhatia',
        content : 'this is my fourth post'
    },
]

app.get('/posts/new',(req,res)=>{
    res.render('new.ejs');
})

app.post('/posts',(req,res)=>{
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect('/posts');
})

app.get('/posts/:id',(req,res)=>{
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);
    if (post) {
        res.render('show.ejs', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.patch('/posts/:id',(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=> id=== p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.render('show.ejs', {posts});
    //res.send('patch request working.');
})

app.delete('/posts/:id',(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect('/posts');
    //res.send("delete request working.");
})

app.get('/posts/:id/edit',(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render('edit.ejs',{post});
});

app.get('/', (req, res) => {
    res.send('Hi, This is Sahil Sharma');
});

app.get('/posts',(req,res)=>{
    res.render('index.ejs', {posts});
});