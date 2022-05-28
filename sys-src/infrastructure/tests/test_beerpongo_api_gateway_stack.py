import pytest
from aws_cdk import App
from aws_cdk.assertions import Template
from aws_cdk.aws_s3_assets import Asset
from stacks.beerpongo_api_gateway_stack import BeerpongoAPIGatewayStack


@pytest.fixture
def app():
    yield App()


@pytest.fixture
def mock_config():
    yield {
        "APIGateway": {
            "stackName": "BeerpongoAPIGatewayStackDev",
            "apiFile": "./config/api_beerpongo.json",
            "id": "Beerpongo-api",
        }
    }


@pytest.fixture
def apigateway_stack(app, mock_config):
    yield BeerpongoAPIGatewayStack(
        app, construct_id="BeerpongoAPIGatewayStack", config=mock_config
    )


@pytest.fixture
def template(apigateway_stack):
    yield Template.from_stack(apigateway_stack)


def test_beerpongo_api_gateway_stack(
    app, apigateway_stack, template: Template
):
    # In order to check the bucket for the api_beerpong.json file, we need
    # to create an asset and use here the values
    asset: Asset
    asset = apigateway_stack.api_asset
    bucketname = asset.s3_bucket_name
    name = apigateway_stack.resolve(bucketname)
    template.has_resource_properties(
        "AWS::ApiGateway::RestApi",
        {
            "Name": "Beerpongo-api",
            "BodyS3Location": {"Bucket": name, "Key": asset.s3_object_key},
        },
    )
