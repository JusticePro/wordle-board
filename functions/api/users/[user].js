export async function onRequestGet(context)
{
    const userData = await context.env.db.get('user.' + context.params.user);
    if (userData === null)
        return Response.json({});
    
    return new Response(userData);
}

export async function onRequestPost(context)
{
    try
    {
        const existingUserData = await context.env.db.get('user.' + context.params.user);

        let userData;
        if (existingUserData === null)
        {
            userData = {};
        }else
        {
            userData = JSON.parse(existingUserData);
        }
        
        let inputData = await context.request.json();

        // Go through each variable in the input, check if it exists, and change the user data in the database appropriately.
        // This is to allow you to send a request to change only certain variables without having to send them all.
        let newData = {
            name: inputData.user === null ? (userData.user === null ? null : userData.user) : inputData.user,
            email: inputData.email === null ? (userData.email === null ? null : userData.email) : inputData.email
        }

        await context.env.db.put('user.' + context.params.user, JSON.stringify(newData));
        
        return new Response(JSON.stringify(newData) + " " + JSON.stringify(existingUserData) + " " + existingUserData);
    }catch (e)
    {
        return new Response(e.stack);
    }
}