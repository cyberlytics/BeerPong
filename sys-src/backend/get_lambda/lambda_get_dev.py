import boto3
import json


def lambda_get_dev(event):
    """
    Provide an event, that contains the following keys:
        - id
        - state in the form '[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X],[ID]:[0-9, X];'

    Requires a role with reading access to DynamoDB.

    :param event
    :return: response: JSON containing the current state of the game
    """

    # Defining access to developing database
    res = boto3.resource("dynamodb")
    table = res.Table("BeerpongoDevGamesTable")

    # Getting item for id given by the event
    item_id = event["id"]
    data = table.get_item(
        Key={
            "id": item_id
        }
    )

    # creating JSON for the response
    response = json.dumps({"id": item_id, "state": data["state"]})

    return response
