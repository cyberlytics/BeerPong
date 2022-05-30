import boto3
import json

res = boto3.resource('dynamodb')


def lambda_get_dev(event):
    """
    TODO
    """
