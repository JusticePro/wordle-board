export async function onRequest(context)
{
    const task = await context.env.db.get('user.0');
    return new Response(task);
}