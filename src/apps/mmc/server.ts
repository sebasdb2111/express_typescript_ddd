import 'reflect-metadata';
import * as express           from 'express';
import {createServer, Server} from 'http';
import {createConnection}     from 'typeorm';
import * as bodyParser        from 'body-parser';
import * as helmet            from 'helmet';
import * as cors              from 'cors';
import routes                 from './routes/index';
import * as errorHandler      from 'errorhandler';
import * as mongoose from 'mongoose';


export class server
{
    public static readonly PORT: number = 3000;
    private _app: express.Application;
    private server: Server;
    private port: string | number;

    constructor()
    {
        this._app = express();
        this.port = process.env.PORT || server.PORT;
        this._app.use(cors());
        this._app.options('*', cors());
        this._app.use(helmet());
        this._app.use(helmet.xssFilter());
        this._app.use(helmet.noSniff());
        this._app.use(helmet.hidePoweredBy());
        this._app.use(helmet.frameguard({action: 'deny'}));
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({extended: true}));
        this._app.use(errorHandler());

        this._app.use('/api', routes);
        this.server = createServer(this._app);
        this.listen();
    }

    private listen(): void
    {
		const MONGO_URI = 'mongodb://localhost:27117/todo';
        this.server.listen(this.port, () =>
        {
            createConnection()
                .then(async connection =>
                {
					mongoose.connect(MONGO_URI, { useNewUrlParser: true });
					mongoose.connection.once('open', () => {
						console.log('Connected to Mongo via Mongoose');
					});
					mongoose.connection.on('error', (err) => {
						console.error('Unable to connect to Mongo via Mongoose', err);
					});
                    console.log(
                        `  App is running at http://localhost:${
                            this.port
                            } in ${this._app.get('env')} mode`
                    );
                    console.log('  Press CTRL-C to stop\n');
                })
                .catch(error => console.log(error));
        });
    }

    get app(): express.Application
    {
        return this._app;
    }
}
