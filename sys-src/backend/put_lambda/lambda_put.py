import boto3


def put(event, context):
    """
    
    """
    body = event.get('body')
    id = body.get("id")
    userID = body.get("usrID")
    state = body.get("state")

    client = boto3.client('dynamodb')

    stateappend = f"{userID}:{state}"

    response = client.get_item(
        TableName='gamesTable',
        Key={
            "GameId": {"N": id}
        },
    )
