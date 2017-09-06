import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import joinMonsterAdapt from 'join-monster-graphql-tools-adapter';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';
import { refreshTokens } from './auth';
import joinMonsterMetadata from './joinMonsterMetadata';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

joinMonsterAdapt(schema, joinMonsterMetadata);

const SECRET = 'aslkdjlkaj10830912039jlkoaiuwerasdjflkasd';
const SECRET_2 = 'ajsdklfjaskljgklasjoiquw01982310nlksas;sdlkfj';

const app = express();

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (!token) {
    return next();
  }

  const cookieToken = req.cookies.token;
  if (!cookieToken || token !== cookieToken) {
    return next();
  }

  try {
    const { user } = jwt.verify(token, SECRET);
    req.user = user;
  } catch (err) {
    const refreshToken = req.headers['x-refresh-token'];

    if (!refreshToken) {
      return next();
    }

    const cookieRefreshToken = req.cookies['refresh-token'];
    if (!cookieRefreshToken || refreshToken !== cookieRefreshToken) {
      return next();
    }

    const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET_2);
    if (newTokens.token && newTokens.refreshToken) {
      // settings headers used by the client to store the tokens in localStorage
      res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
      res.set('x-token', newTokens.token);
      res.set('x-refresh-token', newTokens.refreshToken);
      // set cookie
      res.cookie('token', newTokens.token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true });
      res.cookie('refresh-token', newTokens.refreshToken, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    req.user = newTokens.user;
  }
  return next();
};

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(cookieParser());
app.use(addUser);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress((req, res) => ({
    schema,
    context: {
      models,
      SECRET,
      SECRET_2,
      user: req.user,
      res,
    },
  })),
);

const server = createServer(app);

models.sequelize.sync().then(() =>
  server.listen(3000, () => {
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
      },
      {
        server,
        path: '/subscriptions',
      },
    );
  }),
);
