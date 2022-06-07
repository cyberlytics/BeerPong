import json
import logging
import random
import string

import boto3

alphabet = string.ascii_letters + string.digits


def generate_game_id():
    """
    :return: a randomly generated game id string with 8 characters
    """
    return "".join(random.choices(alphabet, k=8))


def post(table="gamesTable", game_id=generate_game_id()):
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

    table = boto3.resource("dynamodb").Table(table)

    try:
        # check if game item with given id already exists
        data = table.get_item(Key={"GameId": game_id})
        if "Item" in data:
            raise "Game item with id=%s already exists" % game_id

        # put new item into database
        new_game = {"GameId": game_id, "State": ""}
        table.put_item(Item=new_game)

        return {"statusCode": "200", "body": json.dumps(new_game)}
    except Exception:
        logging.exception("Failed to put new game item")
        return {"statusCode": "500"}
