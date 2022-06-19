import boto3


def join_handler(event, table="gamesTable"):
  


    client = boto3.resource("dynamodb")
    table = client.Table("gamesTable")

    gameid = event.get('gameid')

    data = table.get_item(
        Key={
            'GameId': gameid
        }
    )

    try:
        item = data['Item']
    except KeyError:
        return {"statusCode": "404"}


    item['playerCount'] += 1


    try:
        table.put_item(Item=item)

    except:
        return {'statusCode': 500, 'exception': "Error receiving playerId"}


    response = {
            "statusCode": "200",
            "body": {
                "id": gameid, "playerid": item['playerCount']
            }
    }


    return response
