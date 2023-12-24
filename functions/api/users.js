export async function onRequestGet(context)
{
    return env.ASSETS.fetch('/');
}