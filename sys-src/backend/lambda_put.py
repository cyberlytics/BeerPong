import json
import boto3


    
def put(event):
    """
    Provide an event, that contains the following keys:
        - id
        - state in the form '[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X];'

    Requires a role with read/write access to DynamoDB.

    :param event
    :return: response: JSON with http Status Code
            200	Update ok
            400	Invalid ID supplied
            500 Error updating game state
    """

    id = event.get("id")
    state = event.get("state")

    #Define access to db
    table = boto3.resource("dynamodb").Table("gamesTable")

    # Get the item that will be changed
    data = table.get_item(
        Key={
            "gameId": id
        }
    )

    # The Table resource's response looks like this:
    #  {
    #    "GameId": {
    #        "S": "exampleid"
    #    },
    #    "State": {
    #        "S": "[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X];"
    #    }
    #  }


    #Hier kann checking eingebaut werden z.B ob der gleiche User nochmal etwas schickt usw.

    try:
        item = data['Item']

    #if item doesn't exist
    except KeyError:
        return {'statusCode': "400", 'body': json.dumps({})}

    # update state string
    item['State']["S"] += state

    #put item back into database
    try:
        table.put_item(Item=item)

    except:
        return {'statusCode': "500", 'body': json.dumps({})}

    # if all went well
    response = {
        'statusCode': "200",
        'body': json.dumps({})
    }

    return response



