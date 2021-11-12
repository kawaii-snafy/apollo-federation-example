import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { GraphQLResolverMap } from "apollo-graphql";
import { ApolloServerPluginInlineTraceDisabled } from "apollo-server-core";

const users = [
  {
    id: 1,
    name: "User 1",
  },
  {
    id: 2,
    name: "User 2",
  },
  {
    id: 3,
    name: "User 3",
  },
];

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
  }
`;

const resolvers: GraphQLResolverMap = {
  Query: {
    user(_, { id }) {
      return users.find((el) => el.id === Number(id));
    },
    users() {
      return users;
    },
  },
  User: {
    __resolveReference(user: { id: any }, { fetchUserById }: any) {
      return fetchUserById(user.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  plugins: [ApolloServerPluginInlineTraceDisabled()],
});

server
  .listen(4001)
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  })
  .catch(() => {
    throw Error;
  });
