const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// GraphQL package
const { graphqlHTTP } = require("express-graphql");
// Get types from graphql
const { GraphQLObjectType } = require("graphql");

const author = [
  {
    id: 1,
    name: "Chiho",
  },
  {
    id: 2,
    name: "Teddy",
  },
  {
    id: 3,
    name: "Atinder",
  },
];

const posts = [
  {
    id: 123,
    authorId: 1,
    title: "Love Gintama",
    description: "Explaining Love of Gintama",
  },
  {
    id: 124,
    authorId: 1,
    title: "Play with Teddy",
    description: "This is a book how to play with Teddy",
  },
  {
    id: 125,
    authorId: 3,
    title: "Gaming",
    description: "How to beat a monster in the game",
  },
  {
    id: 126,
    authorId: 2,
    title: "Kawaiiness",
    description: "Show kawaii attitude to human",
  },
];

// In graphQL, you have to create Types
// In that case here, author type & posts type

const PostsType = new GraphQLObjectType({
  // configrations
  name: "Posts",
  description: "Posts for users",
  fields: () => {
    
  },
});

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: "",
  })
);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT, ${PORT}`);
});
