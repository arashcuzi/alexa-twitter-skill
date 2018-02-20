PROJECT = ElonTweets
FUNCTION = $(PROJECT)
REGION = us-east-1
PROFILE = ask-cli

.phony: clean

clean:
	rm -f -r $(FUNCTION)*

build-dev: clean
	zip -r $(FUNCTION).zip . -x "*.git*" "img/*" "*.zip" "package*" "test.js" ".vscode/*" ".DS_Store" "Make*"

create-dev:
	aws lambda create-function \
		--handler index.handler \
		--function-name $(FUNCTION) \
		--region $(REGION) \
		--zip-file fileb://$(FUNCTION).zip \
		--role arn:aws:iam::407197073751:role/lambda_basic_execution \
		--runtime nodejs4.3 \
		--timeout 120 \
		--memory-size 512 \

update-dev:
	aws lambda update-function-code \
		--function-name $(FUNCTION) \
		--zip-file fileb://$(FUNCTION).zip \
		--region $(REGION) \
		--publish \
		--profile $(PROFILE) \

delete-dev:
	aws lambda delete-function --function-name $(FUNCTION)
