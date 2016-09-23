var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT||3000;
var todos = [];

var todoNextId=1;

app.use(bodyParser.json())
app.get('/',function(req,res){
	res.send('Todo API');
});

//Get todos

app.get('/todos',function(req,res){
	res.json(todos);
});

//Get todos/:id
app.get('/todos/:id',function(req,res){
	var todosId = parseInt(req.params.id,10);
	var matchedTodo;

	todos.forEach(function(todo){
		if(todosId ===todo.id){
			matchedTodo = todo;
		}
	});

	if(matchedTodo){
		res.json(matchedTodo);
	}else{
		res.status(404).send();
	}
});

//POST
app.post('/todos',function(req,res){
	
	var todo = req.body;
	todo.id = todoNextId++;
	todos.push(todo);
	console.log(todos);
	var body = req.body;
	res.json(body);



});

app.listen(PORT,function(){
	console.log('Server Listening to port : '+PORT);
});