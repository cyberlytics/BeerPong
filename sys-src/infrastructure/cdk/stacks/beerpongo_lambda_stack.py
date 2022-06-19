import aws_cdk.aws_lambda as lambda_
from aws_cdk import Stack
from constructs import Construct
from aws_cdk.aws_iam import PolicyStatement


class BeerpongoLambdaStack(Stack):
    def __init__(
        self, scope: Construct, construct_id: str, config: dict, **kwargs
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Read the config

        lambda_config = config.get("Lambda")
        post_config = lambda_config.get("lambdas").get("lambda_post")
        get_config = lambda_config.get("lambdas").get("lambda_get")
        put_config = lambda_config.get("lambdas").get("lambda_put")

        # Create the lambdas
        self.lambda_post = lambda_.Function(
            self,
            id=post_config["name"],
            runtime=lambda_.Runtime(post_config["runtime"]),
            handler=post_config["handler"],
            code=lambda_.Code.from_asset(post_config["code"])
        )

        self.lambda_get = lambda_.Function(
            self,
            id=get_config["name"],
            runtime=lambda_.Runtime(get_config["runtime"]),
            handler=get_config["handler"],
            code=lambda_.Code.from_asset(get_config["code"])
        )

        self.lambda_put = lambda_.Function(
            self,
            id=put_config["name"],
            runtime=lambda_.Runtime(put_config["runtime"]),
            handler=put_config["handler"],
            code=lambda_.Code.from_asset(put_config["code"])
        )

        # granting DynamoDB access
        self.lambda_post.add_to_role_policy(PolicyStatement(
            actions=["dynamodb:GetItem", "dynamodb:PutItem"],
            resources=["*"]
        ))

        self.lambda_get.add_to_role_policy(PolicyStatement(
            actions=["dynamodb:GetItem"],
            resources=["*"]
        ))

        self.lambda_put.add_to_role_policy(PolicyStatement(
            actions=["dynamodb:GetItem", "dynamodb:PutItem"],
            resources=["*"]
        ))