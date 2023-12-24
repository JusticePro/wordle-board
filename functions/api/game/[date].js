/*
Syntax:
    url: /api/game/[date|yyyy-mm-dd]
    ex: /api/game/2023-12-24
    {
        email: player@mail.com
        attemptScore: 6 (based on points)
        placementScore: 3|1|0
    }
*/
export async function onRequestPost(context)
{
    try
    {
        const inputData = JSON.parse(await context.request.text());
        if (!inputData.email || !inputData.attemptScore || !inputData.placementScore)
            return new Response('Syntax {email,attemptmentScore,placementScore}');

        if (inputData.attemptScore < 1 || inputData.attemptScore > 6)
            return new Response('Invalid attempt score.');
        
        if (inputData.placementScore < 0 || inputData.placementScore > 3)
            return new Response('Invalid placement score.');
        
        await updateScoreListing(context, context.params.date, inputData.email);
        await context.env.db.put('results.' + context.params.date + '.' + inputData.email, JSON.stringify(inputData));
        
        return new Response(JSON.stringify(inputData));
    }catch (e)
    {
        return new Response(e.stack);
    }
}

async function updateScoreListing(context, date, email)
{
    let participantList = await context.env.db.get(`results.${date}.participants`);
    if (!participantList)
        participantList = [];
     
    if (!participantList.includes(email))
        participantList.push(email);

    await context.env.db.put(`results.${date}.participants`, JSON.stringify(participantList));
}