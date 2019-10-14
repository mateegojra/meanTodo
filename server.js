var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost:27017/myapp1', {useUnifiedTopology: true});
var app = express();
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


// define model =================
var Todo = mongoose.model('Todo', {
    text : String
});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); 
});

app.get('/api/todos', function(req, res){
    Todo.find((err, todos) => {
        if(!err)
            res.json(todos);
        else
            res.end(err);
    });
});

app.post('/api/todos', function(req, res){
    console.log(`Text received is ${req.body.text}`);
    Todo.create({
        text: req.body.text,
        done: false
    },
    function(err, td){
        if(!err)
        {
            Todo.find(function(e, ts){
                res.json(ts);
            });
        }
        else
            res.json(err);
    });
});

app.delete('/api/todos/:id', function(req, res){
    Todo.remove({
        _id: req.params.id
    }, 
    function(err){
        if(!err)
        {
            Todo.find(function(e, ts){
                res.json(ts);
            });
        }
    });
});

app.listen(4000, function(){
    console.log(`app is runnig on port 4k`);
});    