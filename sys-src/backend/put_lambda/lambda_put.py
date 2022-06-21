import json
import boto3
import os



def put(event, context):
    """
    Provide an event, that contains the following keys:
        - GameId
        - State in the form '[ID]:[0-9, X]'
        - optional: table referring to the table name to update
    
    Requires a role with read/write access to DynamoDB.

    :param:  event: the lambda call event containing all given parameters
    :param:  context: the lambda call context
    :return: response: JSON with http Status Code
            200	Update ok
            400	Invalid ID supplied
            500 Error updating game state
    """
    table_name = os.environ['DB_TABLE']

    id = event.get("GameId")
    state = event.get("State")

    # Define access to db
    table = boto3.resource("dynamodb").Table(table_name)

    # Get the item that will be changed
    data = table.get_item(
        Key={
            "GameId": id
        }
    )

    # The Table resource's response looks like this:
    #  {
    #    "GameId": {
    #        "S": "exampleid"
    #    },
    #    "State": {
    #        "S": "[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X]"
    #    }
    #  }

    try:
        item = data['Item']

    # if item doesn't exist
    except KeyError:
        return {'statusCode': 400, 'exception': "Game not found"}
    except:
        return {'statusCode': 500, 'exception': "Error updating Game"}

    # get length of state
    len_state = len(item['State'])

    # update state string
    if (len_state == 0):
        item['State'] += state
    else:
        item['State'] += "," + state

    # put item back into database
    try:
        table.put_item(Item=item)

    except:
        return {'statusCode': 500, 'exception': "Error updating Game"}

    # if all went well
    response = {
        'statusCode': 200,
        'body': json.dumps({"message": f"Game State of Game {id} updated"})
    }

    return response
