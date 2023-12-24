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
        
        let inputData = JSON.parse(await context.request.text());

        // Go through each variable in the input, check if it exists, and change the user data in the database appropriately.
        // This is to allow you to send a request to change only certain variables without having to send them all.
        let newData = {
            name: inputData.name === null ? userData.name === null : inputData.name,
            email: inputData.email === null ? userData.email === null : inputData.email
        }

        await context.env.db.put('user.' + context.params.user, JSON.stringify(newData));
        
        return new Response(JSON.stringify(inputData) + " " + JSON.stringify(newData) + " " + JSON.stringify(existingUserData) + " " + existingUserData + " " + (inputData.name == null) + (inputData.email == null) + (userData.name == null) + (userData.email == null));
    }catch (e)
    {
        return new Response(e.stack);
    }
}