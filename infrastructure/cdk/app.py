#!/usr/bin/env python3
import logging

import aws_cdk as cdk
import yaml

from stacks.beerpongo_dynamo_db_stack import BeerpongoDynamoDbStack

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
            f"""No or no valid config variable passed! '-c config={env}'\n {e}"""
        )


app = cdk.App()
config = get_config()

# Create dynamoDB stack
BeerpongoDynamoDbStack(app, config['dynamoDB']['stackName'], config)

app.synth()
