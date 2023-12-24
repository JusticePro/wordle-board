export async function onRequestGet(context)
{
    const userData = await context.env.db.get('user.' + context.params.user);
    if (userData === null)
        return Response.json({});
    
    return new Response(userData);
}

export async function onRequestPost(context)
{
    let existingUserData = await context.env.db.get('user.' + context.params.user);
    let userData;

    try
    {
        userData = JSON.parse(existingUserData);
    }catch (e)
    {
        userData =
        {
            name: null,
            email: null,
        };
        
    }
    
    let inputData;

    try
    {
        inputData = context.request.json();
    }catch (e)
    {
        return new Response(context.request.body);
    }

    // Go through each variable in the input, check if it exists, and change the user data in the database appropriately.
    // This is to allow you to send a request to change only certain variables without having to send them all.
    if (inputData.name !== null)
        userData.name = inputData.name;
    
    if (inputData.email !== null)
        userData.email = inputData.email;

    await context.env.db.put('user.' + context.params.user, userData);
    
    return new Response(userData);
}