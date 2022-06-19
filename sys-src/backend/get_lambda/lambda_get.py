import boto3

table_name = "gamesTable"


def get(event, context):
    """
    Provide an event, that contains the following keys:
        - id
        - state in the form '[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X];'

    Requires a role with reading access to DynamoDB.

    :param:  event: the lambda call event containing all given parameters
    :param:  context: the lambda call context
    :return response: JSON containing a statusCode and the body
            with the gameID and the current state of the game
    """
    global table_name

    # set table name if present
    if "TableName" in event:
        table_name = event["TableName"]

    # Defining access to database
    res = boto3.resource("dynamodb")
    table = res.Table(table_name)

    # Getting item for id given by the event
    item_id = event['GameId']

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
        "body": item
    }

    return response