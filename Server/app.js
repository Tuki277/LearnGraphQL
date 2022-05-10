const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http')
const mongoose = require('mongoose')

const typeDefs = require('./schema/schema')
const resolver = require('./resolver/resolver')

//Load db methods
const mongoDataMethods = require('./data/db')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Tuki:HoangHuy01@cluster0.rie8t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('Connected')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: () => ({ mongoDataMethods })
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolver)
connectDB()