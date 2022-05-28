import json


def lambda_handler(event, context):

    http_method = event.get('httpMethod')
    query_string = event.get('queryStringParameters')
    headers = event.get('headers')
    body = event.get('body')

    return { 
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
    