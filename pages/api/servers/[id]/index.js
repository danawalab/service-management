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
        } else if (req.method === 'PUT') {
            if (!req.session.auth.user.admin) {
                throw new Error("관리자 전용 API 입니다.");
            }
            res.send({
                status: "success",
                server: await ServerService.editServer(id, JSON.parse(req.body))
            });
        } else if (req.method === 'DELETE') {
            if (!req.session.auth.user.admin) {
                throw new Error("관리자 전용 API 입니다.");
            }
            res.send({
                status: "success",
                server: await ServerService.removeServer(id)
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