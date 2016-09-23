var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

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

	matchedTodo = _.findWhere(todos,{id:todosId});

	if(matchedTodo){
		res.json(matchedTodo);
	}else{
		res.status(404).send();
	}
});

//POST
app.post('/todos',function(req,res){
	var todo =_.pick(req.body, 'description', 'completed');
	if(!_.isBoolean(todo.completed)|| !_.isString(todo.description) || todo.description.trim().length === 0){
		return res.status(404).send();
	}
	todo.id = todoNextId++;
	todo.description = todo.description.trim();
	todos.push(todo);
	console.log(todos);
	res.json(todo);
});

app.delete('/todos/:id',function(req,res){

	var todosId = parseInt(req.params.id,10);
	var matchedTodo;

	matchedTodo = _.findWhere(todos,{id:todosId});
	if(matchedTodo){
		todos = _.without(todos,matchedTodo);
		res.json(matchedTodo);

	}else{
		res.status(404).send();
	}
});

app.put('/todos/:id',function(req,res){
	var todo =_.pick(req.body, 'description', 'completed');
	var validAttributes = {};
	var todosId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos,{id:todosId});

	if(!matchedTodo){
		return res.status(404).send();
	}

	if(todo.hasOwnProperty('completed') && _.isBoolean(todo.completed)){
		validAttributes.completed = todo.completed;
	}else if(todo.hasOwnProperty('completed')){
		return res.status(400).send();
	}else{

	}

	if(todo.hasOwnProperty('description') && _.isString(todo.description) && todo.description.trim().length > 0){
		validAttributes.description = todo.description;
	}else if(todo.hasOwnProperty('description')){
		return res.status(400).send();
	}else{

	}
	
	_.extend(matchedTodo,validAttributes);
	res.json(matchedTodo);

});


app.listen(PORT,function(){
	console.log('Server Listening to port : '+PORT);
});