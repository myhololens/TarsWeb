const AuthService = require('../../service/auth/AuthService');
const logger = require('../../logger');
const util = require('../../tools/util');
const _ = require('lodash');
const AuthController = {}

const authStruct = {
    id: '',
    flag: '',
    role: '',
    uid: ''
};

AuthController.addAuth = async(ctx) => {
    try{
        let auth = ctx.paramsObj.auth;
        await AuthService.addAuth(auth);
        ctx.makeResObj(200, '', {});
    }catch(e){
        logger.error('[addAuth]', e, ctx);
        ctx.makeErrResObj();
    }
};

AuthController.deleteAuth = async(ctx) => {
    try{
        let flag = ctx.paramsObj.flag;
        await AuthService.deleteAuth(flag);
        ctx.makeResObj(200, '', {});
    }catch(e){
        logger.error('[delAuth]', e, ctx);
        ctx.makeErrResObj();
    }
};

AuthController.updateAuth = async(ctx) => {
    try{
        let flag = ctx.paramsObj.flag;
        let role = ctx.paramsObj.role;
        let uids = ctx.paramsObj.uid || [];
        await AuthService.updateAuth(flag, role, uids);
        ctx.makeResObj(200, '', {});
    }catch(e){
        logger.error('[updateAuth]', e, ctx);
        ctx.makeErrResObj();
    }
};

AuthController.getAuth = async(ctx)=> {
    try{
        let flag = ctx.paramsObj.flag;
        let roles = ctx.paramsObj.role;
        roles = roles.split(';');
        let uid = ctx.paramsObj.uid;
        var rst = await AuthService.getAuth(flag, roles, uid);
        ctx.makeResObj(200, '', {result: !!rst});
    }catch(e){
        logger.error('[getAuth]', e, ctx);
        ctx.makeErrResObj();
    }
};

AuthController.getAuthListByUid = async(ctx)=> {
    try{
        let uid = ctx.paramsObj.uid;
        let rst = await AuthService.getAuthListByUid(uid);
        ctx.makeResObj(200, '', util.viewFilter(rst || [], authStruct));
    }catch(e){
        logger.error('[getAuthListByUid]', e, ctx);
        ctx.makeErrResObj();
    }
};

AuthController.getAuthListByFlag = async(ctx)=> {
    try{
        let flag = ctx.paramsObj.flag;
        let rst = await AuthService.getAuthListByFlag(flag);
        ctx.makeResObj(200, '', util.viewFilter(rst || [], authStruct));
    }catch(e){
        logger.error('[getAuthListByFlag]', e, ctx);
        ctx.makeErrResObj();
    }
};

AuthController.getAuthList = async(ctx)=> {
    try{
        let flag = ctx.paramsObj.flag || null;
        let role = ctx.paramsObj.role || null;
        let uid = ctx.paramsObj.uid || null;
        let rst = await AuthService.getAuthList(flag, role, uid);
        ctx.makeResObj(200, '', util.viewFilter(rst || [], authStruct));
    }catch(e){
        logger.error('[getAuthList]', e, ctx);
        ctx.makeErrResObj();
    }
};

AuthController.pageDeleteAuth = async(ctx)=> {
    try{
        let id = ctx.paramsObj.id || null;
        await AuthService.pageDeleteAuth(id);
        ctx.makeResObj(200, '', id);

    }catch(e){
        logger.error('[getAuthList]', e, ctx);
        ctx.makeErrResObj();
    }
};


module.exports = AuthController;
