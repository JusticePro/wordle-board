export async function onRequestGet(context)
{
    return await env.ASSETS.fetch('/') + '\n\n<h1>SUP DAWG</h1>';
}