import json
import boto3


    
def put(event, table):
    """
    Provide an event, that contains the following keys:
        - GameId
        - State in the form '[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X]'
        
    
    Provide table containing a string referring to the table name

    Requires a role with read/write access to DynamoDB.

    :param  event
            table
    :return: response: JSON with http Status Code
            200	Update ok
            400	Invalid ID supplied
            500 Error updating game state
    """

    id = event.get("GameId")
    state = event.get("State")

    #Define access to db
    table = boto3.resource("dynamodb").Table(table)

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


    #Hier kann checking eingebaut werden z.B ob der gleiche User nochmal etwas schickt usw.

    try:
        item = data['Item']

    #if item doesn't exist
    except KeyError as e:
        return {'statusCode': "400", 'body': json.dumps({"error": e})}

    # update state string
    item['State'] += "," + state

    #put item back into database
    try:
        table.put_item(Item=item)

    except Exception as e:
        return {'statusCode': "500", 'body': json.dumps({"error": e})}

    # if all went well
    response = {
        'statusCode': "200",
        'body': json.dumps({})
    }

    return response



