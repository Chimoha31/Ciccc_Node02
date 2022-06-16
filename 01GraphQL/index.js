const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// GraphQL package
const { graphqlHTTP } = require("express-graphql");
// Get types from graphql
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const authors = [
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
    trending: true,
    title: "Love Gintama",
    description: "Explaining Love of Gintama",
  },
  {
    id: 124,
    authorId: 1,
    trending: false,
    title: "Play with Teddy",
    description: "This is a book how to play with Teddy",
  },
  {
    id: 125,
    authorId: 3,
    trending: true,
    title: "Gaming",
    description: "How to beat a monster in the game",
  },
  {
    id: 126,
    authorId: 2,
    trending: false,
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
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt), //GraphQLのint
    },
    authorId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    trending: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

const AuthorsType = new GraphQLObjectType({
  // configrations
  name: "Author",
  description: "Author of posts",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt), //GraphQLのint
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

// 1つに集約させる
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Main query for Graphql",
  fields: () => ({
    posts: {
      type: new GraphQLList(PostsType),
      description: "Lists of Posts shared by users",
      resolve: () => posts,
    },
    authors: {
      type: new GraphQLList(AuthorsType),
      description: "Lists of authors who shared posts",
      resolve: () => authors,
    },
  }),
});

// REST API: CRUD (Create, Read, Update, Delete)
// GraphQL: Create, Update, Delete ---->>>> MUTATIONS
const mainSchema = new GraphQLSchema({
  query: RootQueryType,
});

app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema: mainSchema,
  })
);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT, ${PORT}`);
});
