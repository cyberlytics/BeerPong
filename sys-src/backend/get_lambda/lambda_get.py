import boto3


def lambda_get(event, table="gamesTable"):
    """
    Provide an event, that contains the following keys:
        - id
        - state in the form '[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X];'

    Requires a role with reading access to DynamoDB.

    :param  event
    :param  table: name of DynamoDB table
    :return response: JSON containing a statusCode and the body
            with the gameID and the current state of the game
    """

    # Defining access to database
    res = boto3.resource("dynamodb")
    table = res.Table(table)

    # Getting item for id given by the event
    item_id = event.get('id')

    data = table.get_item(
        Key={
            'GameId': item_id
        }
    )

    try:
        item = data['Item']
    except KeyError:
        return {"statusCode": "404"}

    response = {
            "statusCode": "200",
            "body": {
                "id": item_id, "state": item['State']
            }
    }

    return response
