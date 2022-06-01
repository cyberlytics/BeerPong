prepare:
	python -m ensurepip --upgrade
	python -m pip install --upgrade pip
	python -m pip install --upgrade pipenv

#-----------Infrastructure Commands-------------------------

install-infrastructure:
	cd sys-src/infrastructure && pipenv sync

test-infrastructure: .install-dev-infrastructure
	cd sys-src/infrastructure && pipenv run pytest

formatting-checks-infrastructure: .install-dev-infrastructure
	cd sys-src/infrastructure && pipenv run flake8 . && pipenv run black . --check && pipenv run isort . --check

format-infrastructure: .install-dev-infrastructure
	cd sys-src/infrastructure && pipenv run black . && pipenv run isort .

deploy-infrastructure: install-infrastructure test-infrastructure
	cd sys-src/infrastructure && cdk deploy -c config=$(CONFIG) --profile $(PROFILE) $(STACK)

destroy-infrastructure: install-infrastructure
	cd sys-src/infrastructure && cdk destroy -c config=$(CONFIG) --require-approval never --profile $(PROFILE) $(STACK)

.install-dev-infrastructure:
	cd sys-src/infrastructure && pipenv sync --dev

# ------------BACKEND Commands-------------------------------

install-backend:
	cd sys-src/backend && pipenv sync

test-backend: .install-dev-backend
	cd sys-src/backend && pipenv run pytest

.install-dev-backend:
	cd sys-src/backend && pipenv sync --dev

formatting-checks-backend: .install-dev-backend
	cd sys-src/backend && pipenv run flake8 . && pipenv run black . --check && pipenv run isort . --check

format-backend: .install-dev-backend
	cd sys-src/backend && pipenv run black . && pipenv run isort .