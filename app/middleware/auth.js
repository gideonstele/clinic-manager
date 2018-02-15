module.exports = () => {
    return async function (ctx, next) {
        const {session} = ctx;
        if(session && session.aid && session.sign) {
            await next();
        } else {
            ctx.body = {
                status: -1,
                msg: 'user not login'
            }
        }
    }
};
