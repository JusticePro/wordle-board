export function onRequestGet(context)
{
    try
    {
        return context.env.ASSETS.fetch('/');
    }catch (e)
    {
        return new Response(e);
    }
}