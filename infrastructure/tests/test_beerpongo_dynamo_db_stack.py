import os
import sys

import pytest
from aws_cdk import App
from aws_cdk.assertions import Template
from ..cdk.stacks.beerpongo_dynamo_db_stack import BeerpongoDynamoDbStack

path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, f"{path}/../..")


@pytest.fixture
def app():
    yield App()


@pytest.fixture
def mock_config():
    yield {
        "dynamoDB": {
            "gamesTable": {
                "id": "BeerpongoDevGamesTable",
                "tableName": "BeerpongoDevGamesTable"
            }
        }
    }


@pytest.fixture
def dynamodb_stack(app, mock_config):
    yield BeerpongoDynamoDbStack(app, construct_id="beerpong-app-dynamodb-stack", config=mock_config)


@pytest.fixture
def template(dynamodb_stack):
    yield Template.from_stack(dynamodb_stack)


# Todo
def test_dynamodb_user_tabel(template: Template):
    # template.has_resource_properties("AWS::Dynamodb::Table", )
    pass
