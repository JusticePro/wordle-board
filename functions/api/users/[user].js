export async function onRequest(context)
{
    const userData = await context.env.db.get('user.' + context.params.user);
    /*if (userData === null)
        return Response.json({});*/
    
    return userData;
}