import pytest
import os
from lambda_put import put
from moto import mock_dynamodb
import boto3


TableName = "testTable"

@pytest.fixture(scope='function')
def aws_credentials():
    """Mocked AWS Credentials for moto."""
    os.environ['AWS_ACCESS_KEY_ID'] = 'testing'
    os.environ['AWS_SECRET_ACCESS_KEY'] = 'testing'
    os.environ['AWS_SECURITY_TOKEN'] = 'testing'
    os.environ['AWS_SESSION_TOKEN'] = 'testing'
    os.environ['AWS_DEFAULT_REGION'] = 'eu-central-1'

@mock_dynamodb
def test_put_lambda(aws_credentials):
    dynamodb = boto3.client('dynamodb')
    dynamodb.create_table(
            TableName=TableName,
            KeySchema=[
                {'KeyType': 'HASH', 'AttributeName': 'GameId'},
            ],
            AttributeDefinitions=[
                {'AttributeName': 'GameId', 'AttributeType': 'S'},
            ],
            BillingMode="PAY_PER_REQUEST"
        )
    
    startstate = "0:6,1:2"
    dynamodb.put_item(Item={
        "GameId": {
            "S": "1"
        },
        "State": {
            "S": startstate
        }
    },
    TableName=TableName
    )
    
    
    #----- check if we can Update--------

    p1_state = "1:6"

    #event where GameId is 1 and player 1 hit cup 6
    event = {
        "GameId": "1",
        "State": p1_state,
        "table": TableName
    }
    response = put(event, {})
    assert response == {'statusCode': 200,'body': '{"message": "Game State of Game 1 updated"}'}

    #----check if item was really updated------
    
    data = dynamodb.get_item(
        Key={
            "GameId": {"S": "1"}
        },
        TableName=TableName
    )

    assert data["Item"]["State"]["S"] ==  startstate + "," + p1_state

    #----check with invalid id-----
    event["GameId"] = 2
    response = put(event, {})
    assert response == {'statusCode': 400, 'exception': "Game not found"}
