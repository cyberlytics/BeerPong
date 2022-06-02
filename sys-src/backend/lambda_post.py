import json
import logging
import random
import string

import boto3

alphabet = string.ascii_letters + string.digits


def post(table="gamesTable"):
    """
    Creates and puts a new Game item into dynamodb table.
    Requires a role with write access to DynamoDB.

    The Game id is a randomly generated 8 character string.
    The initial Game state is set as an empty string

    :param:  table: the dynamodb table name with default value "gamesTable"
    :return: response: JSON with http Status Code
            200	Create ok
            500 Error creating the Game item
    """

    # create a random game id with 8 characters
    game_id = "".join(random.choices(alphabet, k=8))

    table = boto3.resource("dynamodb").Table(table)

    new_game = {"GameId": game_id, "State": ""}

    try:
        # put new item into database
        table.put_item(Item=new_game)

        return {"statusCode": "200", "body": json.dumps(new_game)}
    except Exception:
        logging.exception("Failed to put new game item")
        return {"statusCode": "500"}
