const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//list
app.get("/repositories", (request, response) => {
  
  return response.json(repositories);
});

//create
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { 
    id: uuid(), 
    title, 
    url, 
    techs, 
    likes: 0
  };
  
  repositories.push(repository);

  return response.status(200).json(repository)
});

// update
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs , likes} = request.body;

  const repoIndex = repositories.findIndex( repo => repo.id === id);

  if(repoIndex <  0){
    return response.status(400).json({error: "repository does not exist"});
  }

  const repoTemp = {
    id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes
  }

  repositories[repoIndex] = repoTemp;

  return response.status(200).json(repoTemp);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex( repo => repo.id === id);

  if(repoIndex <  0){
    return response.status(400).send();
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

//update like
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex( repo => repo.id === id);

  if(repoIndex <  0){
    return response.status(400).send();
  }

  const repository = repositories.find(repository => repository.id === id)
  repository.likes++;
  
  return response.status(200).json(repository);

});

module.exports = app;
