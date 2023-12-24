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
        let existingUserData = await context.env.db.get('user.' + context.params.user);

        // Reads current user data. If it doesn't exist, then create base user data.
        let userData;
        if (existingUserData !== null)
        {
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
        }else
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

        await context.env.db.put('user.' + context.params.user, JSON.stringify(inputData));
        
        return new Response(inputData);
    }catch (e)
    {
        return new Response(e.stack);
    }
}