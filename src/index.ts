import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import bodyParser, { Options } from 'body-parser';
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

    // this.app.use(bodyParser(this.bodyParserTranslator(bodyParserConfig)));

    if (corsConfig && corsConfig.enabled) {
      this.app.use(cors(this.corsTranslator(corsConfig)));
    }

    this.app.get('/', (_req, res) => {
      res.send(homepage);
    });
  }

  private corsTranslator(corsConfig: any): CorsOptions {
    return {
      origin: corsConfig.origin,
      methods: corsConfig.allowMethods,
      allowedHeaders: corsConfig.allowHeaders,
      exposedHeaders: corsConfig.exposeHeaders,
      credentials: corsConfig.credentials,
      maxAge: corsConfig.maxAge
    };
  }

  private bodyParserTranslator(bodyParserConfig: any): Options {
    // to do
    return bodyParserConfig;
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
