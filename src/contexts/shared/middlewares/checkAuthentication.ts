import {Request, Response, NextFunction} from 'express';
import * as jwt                          from 'jsonwebtoken';
import config                            from '../../../apps/mmc/config/config';
import * as httpStatus                   from 'http-status';

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) =>
{
    const token: string = getTokenFromRequest(req);
    let tokenError;

    if (null === token) {
        tokenError = {
            code   : 'UNAUTHORIZED',
            message: 'Token not found'
        };
    }

    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config.jwtSecret);
        if (!jwtPayload) {
            tokenError = {
                code   : 'UNAUTHORIZED',
                message: 'Request id mismatches'
            };
        }
        else {
            res.locals.jwtPayload = jwtPayload;
        }
    }
    catch (jwtError) {
        tokenError = {
            code   : 'UNAUTHORIZED',
            message: 'Invalid token',
            cause  : jwtError
        };
    }

    if (tokenError) {
        res.status(httpStatus.UNAUTHORIZED).send(tokenError);
    }

    const {userId, username} = jwtPayload;
    const newToken = jwt.sign({userId, username}, config.jwtSecret, {
        expiresIn: '1h'
    });

    res.setHeader('token', newToken);
    next();

};

function getTokenFromRequest(req: Request)
{
    let authorizationString;
    if (req && req.headers && req.headers.authorization) {
        authorizationString = req.headers.authorization
            ? req.headers.authorization.split(' ')
            : null;
    }
    let response = null;
    if (authorizationString && (authorizationString[0] === 'Token' || authorizationString[0] === 'Bearer')) {
        response = authorizationString[1];
    }
    else if (req && req.query && req.query.jwt) {
        response = req.query.jwt;
    }
    return response;
}

exports.getTokenFromRequest = getTokenFromRequest;