#!/usr/bin/env python3
import logging
import json
import aws_cdk as cdk
import yaml
from stacks.beerpongo_api_gateway_stack import BeerpongoAPIGatewayStack
from stacks.beerpongo_dynamo_db_stack import BeerpongoDynamoDbStack
from stacks.beerpongo_lambda_stack import BeerpongoLambdaStack

_logger = logging.getLogger("app")


def get_config():
    """
    Reads the config yaml file for the given environment.
    Used to switch between dev and prod environments.

    :return: a dict object.
    """
    env = None
    try:
        env = app.node.try_get_context("config")
        with open(
                file="./config/" + env + ".yaml", mode="r", encoding="utf8"
        ) as stream:
            try:
                c = yaml.safe_load(stream)
            except yaml.YAMLError as e:
                _logger.error(e)
        c["config_name"] = env

        return c
    except Exception as e:
        _logger.error(
            f"""No or no valid config variable passed!
             '-c config={env}'\n {e}"""
        )


app = cdk.App()
config = get_config()

# Create dynamoDB stack
BeerpongoDynamoDbStack(app, config["dynamoDB"]["stackName"], config)

# Create Lambda stack
LambdaStack = BeerpongoLambdaStack(app, config["Lambda"]["stackName"], config)

# Get the ARN-References of the Lambdas
get_ARN = json.dumps(LambdaStack.resolve(
    LambdaStack.lambda_get.function_arn))
get_credentials = json.dumps(LambdaStack.resolve(
    LambdaStack.lambda_get.role.role_arn))
post_ARN = json.dumps(LambdaStack.resolve(
    LambdaStack.lambda_post.function_arn))
post_credentials = json.dumps(LambdaStack.resolve(
    LambdaStack.lambda_post.role.role_arn))
put_ARN = json.dumps(LambdaStack.resolve(
    LambdaStack.lambda_put.function_arn))
put_credentials = json.dumps(LambdaStack.resolve(
    LambdaStack.lambda_put.role.role_arn))

info = {"get_ARN": get_ARN, "post_ARN": post_ARN, "put_ARN": put_ARN,
        "get_Credentials": get_credentials, "post_Credentials":
            post_credentials, "put_Credentials": put_credentials}

# Create API-Gateway stack
BeerpongoAPIGatewayStack(app, config["APIGateway"]["stackName"], config,
                         LambdaInfo=info)
app.synth()
