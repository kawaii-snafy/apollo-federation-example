import { ApolloServer } from "apollo-server";
import { ApolloGateway } from "@apollo/gateway";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { readFileSync } from "fs";

const supergraphSdl = readFileSync("./supergraph.graphql").toString();

const gateway = new ApolloGateway({
  supergraphSdl,
});

const server = new ApolloServer({
  gateway,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  })
  .catch(() => {
    throw Error;
  });
