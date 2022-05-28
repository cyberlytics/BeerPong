from aws_cdk import Stack
from aws_cdk import aws_apigateway as apigateway
from aws_cdk.aws_s3_assets import Asset
from constructs import Construct


class BeerpongoAPIGatewayStack(Stack):
    def __init__(
        self, scope: Construct, construct_id: str, config: dict, **kwargs
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        apigateway_config = config.get("APIGateway")
        apiFile = apigateway_config["apiFile"]
        apiId = apigateway_config["id"]

        # Get the asset for the file
        self._asset = Asset(self, "Api-Beerpong", path=apiFile)

        self._api = apigateway.SpecRestApi(
            self,
            id=apiId,
            api_definition=apigateway.ApiDefinition.from_asset(apiFile),
        )

    @property
    def api_asset(self):
        return self._asset
