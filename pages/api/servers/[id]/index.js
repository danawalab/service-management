import React from 'react';
import fetch from "isomorphic-unfetch";
import { withSession } from 'next-session';
import ServerService from "../../../../services/ServerService"
import AuthService from "../../../../services/AuthService";
import { Base64 } from 'js-base64';

async function server(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    const id = req.query['id'];
    await AuthService.validate(req, res);
    await ServerService.isRead(id, req, res)

    try {
        if (req.method === 'GET') {
            let server = await ServerService.findServerById(id)
            server['password'] = Base64.btoa(server['password']);
            res.send({
                status: "success",
                server: server
            });
        }

    } catch (error) {
        console.error(error);
        res.send({
            status: "error",
            message: "에러가 발생하였습니다.",
            error: JSON.stringify(error)
        })
    }
}

export default withSession(server)