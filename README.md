# Beerpongo - Modularbeit BCN

## Prerequisites
- make (choco install make)
- aws cli (https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- aws-cdk (npm install -g aws-cdk)
- aws-cdk profile: Add following to ~/.aws/config

  ```
  [profile bierpongo-user]
  region=eu-central-1
  aws_access_key_id=XXX
  aws_secret_access_key=XXX
  ```

## Prepare and Install
Prepare python and pipenv:
```
make prepare
```
Install pipenv dependencies:
```
make install-infrastructure
```

## Test
Run infrastructure unit tests:
```
make test-infrastructure
```

## Deploy
Deploy infrastructure stacks to AWS:
```
make deploy-infrastructure PROFILE=<deployment-profile> STACK=<stack_id> CONFIG=<env>
```

- `env`: The deployment environment. The name of a yaml file in the config folder, e.g. `dev` or `prod`.
- `deployment-profile`: The deployment profile, which links to a user. Like above use `bierpongo-user`.
- `stack_id`: The id of the stack you want to deploy. For a deployment of all stacks use `--all`.


