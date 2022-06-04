from lambda_get import lambda_get
import boto3
import os
import pytest
from moto import mock_dynamodb

table_name = "test_table"


@pytest.fixture(scope="function")
def aws_credentials():
    """Mocked AWS credentials for moto"""
    os.environ["AWS_ACCESS_KEY_ID"] = "testing"
    os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
    os.environ["AWS_SECURITY_TOKEN"] = "testing"
    os.environ["AWS_SESSION_TOKEN"] = "testing"
    os.environ["AWS_DEFAULT_REGION"] = "eu-central-1"


@mock_dynamodb
def test_get_lambda():
    # creating test_table
    dynamodb = boto3.client("dynamodb")
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[
            {"KeyType": "HASH", "AttributeName": "GameId"},
        ],
        AttributeDefinitions=[
            {"AttributeName": "GameId", "AttributeType": "S"},
        ],
        BillingMode="PAY_PER_REQUEST",
    )

    # creating test_item
    dynamodb.put_item(Item={
        "GameId": {
            "S": "1"
        },
        "State": {
            "S": "1:X,2:32"
        }
    },
        TableName=table_name
    )

    # test if the right game state is returned
    event = {"id": "1", "state": "1:X"}
    resp = lambda_get(event, "test_table")

    assert resp["statusCode"] == "200"
    assert resp["body"]["state"] == "1:X,2:32"

    # test if the right error ist returned, if the gameID does not exist
    event = {"id": "a", "state": "1:X"}
    resp = lambda_get(event, "test_table")

    assert resp["statusCode"] == "404"
