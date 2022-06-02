import json
import os
from unittest.mock import ANY

import boto3
import pytest
from moto import mock_dynamodb

from lambda_post import post

table_name = "test_table"


@pytest.fixture(scope="function")
def aws_credentials():
    """Mocked AWS Credentials for moto."""
    os.environ["AWS_ACCESS_KEY_ID"] = "testing"
    os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
    os.environ["AWS_SECURITY_TOKEN"] = "testing"
    os.environ["AWS_SESSION_TOKEN"] = "testing"
    os.environ["AWS_DEFAULT_REGION"] = "eu-central-1"


@pytest.fixture
def dynamodb():
    yield boto3.resource("dynamodb")


def create_games_table(dynamodb):
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


@mock_dynamodb
def test_post(dynamodb):
    create_games_table(dynamodb)
    response = post(table_name)

    # assert response
    assert response == {"statusCode": "200", "body": ANY}

    body = json.loads(response["body"])
    assert len(body) == 2
    assert isinstance(body["GameId"], str)
    assert len(body["GameId"]) == 8
    assert body["State"] == ""

    # assert game item in dynamodb equals response body
    data = dynamodb.Table(table_name).scan()
    assert data["Count"] == 1
    assert data["Items"][0] == {"GameId": body["GameId"], "State": ""}
