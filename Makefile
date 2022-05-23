prepare:
	python -m ensurepip --upgrade
	python -m pip install --upgrade pip
	python -m pip install --upgrade pipenv

install-infrastructure:
	cd infrastructure && pipenv sync

test-infrastructure: .install-dev-infrastructure
	cd infrastructure && pipenv run pytest

formatting-checks-infrastructure: .install-dev-infrastructure
	cd infrastructure && pipenv run flake8 . && pipenv run black . --check && pipenv run isort . --check

format-infrastructure: .install-dev-infrastructure
	cd infrastructure && pipenv run black . && pipenv run isort .

deploy-infrastructure: install-infrastructure test-infrastructure
	cd infrastructure && cdk deploy -c config=$(CONFIG) --profile $(PROFILE) $(STACK)

destroy-infrastructure: install-infrastructure
	cd infrastructure && cdk destroy -c config=$(CONFIG) --require-approval never --profile $(PROFILE) $(STACK)

.install-dev-infrastructure:
	cd infrastructure && pipenv sync --dev