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


## pipenv - Python dependency administration
Doc: https://pipenv.pypa.io/en/latest/

### If you want to install a new package:
1. Navigate to the `Pipfile` directory of your source code
2. Run `pipenv install [PACKAGE_NAME]` and add `-d` if it is a package vor developing or testing purposes

With `pipenv install` without a package name you can install all necessary packages for this Pipfile source directory.

### If you want to run your code using dependencies installed with pipenv
Run `pipenv run [SCRIPT_NAME]` like `pipenv run pytest` to run tests


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


Destroy deployed infrastructure stacks in AWS:
```
make destroy-infrastructure PROFILE=<deployment-profile> STACK=<stack_id> CONFIG=<env>
```


## Formatting
Run python formatting checks for infrastructure code:
```
make formatting-checks-infrastructure
```
Auto-format python infrastructure 
```
make format-infrastructure
```
