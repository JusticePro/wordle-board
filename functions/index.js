async function respon(context)
{
    try
    {
        return await context.next();
    }catch (e)
    {
        return new Response(e.message, {status: 500});
    }
}

export const onRequest = respon;