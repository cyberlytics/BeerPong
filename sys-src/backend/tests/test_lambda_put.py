import pytest
from backend.lambda_put import put
from moto import mock_dynamodb2
import boto3


TableName = "testTable"


@pytest.fixture
def dynamodb_table():
    with mock_dynamodb2():
        dynamodb = boto3.client('dynamodb')
        table = dynamodb.create_table(
                TableName=TableName,
                KeySchema=[
                    {'KeyType': 'S', 'AttributeName': 'GameId'}
                ],
                AttributeDefinitions=[
                    {'AttributeName': 'State', 'AttributeType': 'S'}
                ]
            )
        
        table.put_item(Item={
        "GameId": {
            "S": "1"
        },
        "State": {
            "S": "0:3,1:4,0:1,1:5,0:X;"
        }
    })

def test_put_lambda():
    #event where GameId is 1 and player 1 hit cup 6
    event = {
        "GameId": "1",
        "State": "1:6"
    }
    response = put(event, TableName)
    assert response == {'statusCode': "200",'body': {}}