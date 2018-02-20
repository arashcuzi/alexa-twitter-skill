PROJECT = ElonTweets
FUNCTION = $(PROJECT)
REGION = us-east-1
PROFILE = ask-cli

.phony: clean

clean:
	rm -f -r *.zip

build: clean
	zip -r $(FUNCTION).zip . -x "*.git*" "img/*" "*.zip" "package*" "test.js" ".vscode/*" ".DS_Store" "Make*"

create:
	aws lambda create-function \
		--handler index.handler \
		--function-name $(FUNCTION) \
		--region $(REGION) \
		--zip-file fileb://$(FUNCTION).zip \
		--role arn:aws:iam::407197073751:role/lambda_basic_execution \
		--runtime nodejs4.3 \
		--timeout 120 \
		--memory-size 512 \

update:
	aws lambda update-function-code \
		--function-name $(FUNCTION) \
		--zip-file fileb://$(FUNCTION).zip \
		--region $(REGION) \
		--publish \
		--profile $(PROFILE) \

delete:
	aws lambda delete-function --function-name $(FUNCTION)
