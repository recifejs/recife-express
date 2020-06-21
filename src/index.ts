import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer, IResolvers } from 'apollo-server-express';
import { ApolloServerBase, Context, Config } from 'apollo-server-core';
import { DocumentNode } from 'graphql';
import { Server } from 'http';

type CreateMiddlewareParams = {
  typeDefs: DocumentNode;
  resolvers: IResolvers;
  context: Context;
  graphqlConfig: Config;
};

type ListenParams = {
  port: string;
  host: string;
};

class RecifeExpress {
  app: Express = express();

  constructor(bodyParserConfig: any, corsConfig: any, homepage: string) {
    this.app = express();

    this.app.use(bodyParser(bodyParserConfig));

    if (cors) {
      this.app.use(cors(corsConfig));
    }

    this.app.get('/', (_req, res) => {
      res.send(homepage);
    });
  }

  createApolloServer({
    typeDefs,
    resolvers,
    context,
    graphqlConfig
  }: CreateMiddlewareParams): ApolloServerBase {
    const apolloServer = new ApolloServer({
      ...graphqlConfig,
      resolvers,
      typeDefs,
      context
    });

    apolloServer.applyMiddleware({ app: this.app });

    return apolloServer;
  }

  listen({ port, host }: ListenParams, callback: () => void): Server {
    const server = this.app.listen({ port, host }, () => callback());

    return server;
  }
}

export default RecifeExpress;
