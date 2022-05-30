from aws_cdk import Stack
from aws_cdk import aws_apigateway as apigateway
from constructs import Construct


class BeerpongoAPIGatewayStack(Stack):
    def __init__(
        self, scope: Construct, construct_id: str, config: dict,
        LambdaInfo: dict, **kwargs
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        apigateway_config = config.get("APIGateway")
        apiFile = apigateway_config["apiFile"]
        apiId = apigateway_config["id"]

        # Before we can load the API-File, we need to replace the place-holders
        # with the given function-ARN from the lambdas
        CREDENTIALS_GAME_POST = "\"${CREDENTIALS-GAME_POST}\""
        CREDENTIALS_GAME_PUT = "\"${CREDENTIALS-GAME_PUT}\""
        CREDENTIALS_GAME_GET = "\"${CREDENTIALS-GAME_GET}\""

        ARN_GAME_POST = "\"${ARN_URI-GAME_POST}\""
        ARN_GAME_PUT = "\"${ARN_URI-GAME_PUT}\""
        ARN_GAME_GET = "\"${ARN_URI-GAME_GET}\""

        filedata = None
        with open(apiFile, 'r') as file:
            filedata = file.read()

        print(LambdaInfo["post_ARN"])

        newdata = filedata.replace(
            ARN_GAME_POST, LambdaInfo["post_ARN"]).replace(
            ARN_GAME_PUT, LambdaInfo["put_ARN"]).replace(
            ARN_GAME_GET, LambdaInfo["get_ARN"]).replace(
            CREDENTIALS_GAME_POST, LambdaInfo["post_Credentials"]).replace(
            CREDENTIALS_GAME_PUT, LambdaInfo["put_Credentials"]).replace(
            CREDENTIALS_GAME_GET, LambdaInfo["get_Credentials"])

        # We save the file under a different name
        new_name = apiFile.replace(".json", "_.json")

        with open(new_name, 'w') as file:
            file.write(newdata)

        self._api = apigateway.SpecRestApi(
            self,
            id=apiId,
            api_definition=apigateway.ApiDefinition.from_asset(new_name)
        )
