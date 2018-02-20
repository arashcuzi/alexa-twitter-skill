# ALEXA-TWITTER-SKILL

This is a simple skill I wrote to use the Twitter API to search tweets

This one specifically pulls tweets from Elon Musk

#### Background

A year ago I started messing with the Alexa Skills Kit and tried to get a grasp of the whole process of making a skill for Amazon's Echo devices and it's companion assistant Alexa

## Prerequisites

##### `AWS cli`

This can be downloaded and installed following the instructions [here](https://aws.amazon.com/cli/)

##### `IAM Creds`

You will need an IAM credential set up and added to your AWS credentials file for your OS
Follow the instructions [here](https://developer.amazon.com/de/docs/smapi/set-up-credentials-for-an-amazon-web-services-account.html)

Ignore the parts that are specific to `ask` or the `ask-cli`, you can use these creds for the Amazon Skills Kit command line interface, but we are not using that for this example.

Once you have your cred, update your AWS credentials file with a new entry which should have the `ACCESS_KEY` and `SECRET_KEY` of the user you created above:

```bash
[default]
aws_access_key_id = ACCESS_KEY
aws_secret_access_key = SECRET_KEY

[new_entry]
aws_access_key_id = ACCESS_KEY
aws_secret_access_key = SECRET_KEY
```

It looks confusing, but make sure you replace `ACCESS_KEY` and `SECRET_KEY` with the values you get from creating the user above, they will look something like `AXFSDXSFSADSFAFADXA` or a longer alphabetical string with upper and lower case

The `SECRET_KEY` is longer, so make sure to paste them in the right spots

The profile name is whatever name you give it in the brackets, like `[lambda_update_profile]`

You will need to use that profile name in the `Makefile` so your build works

Another IAM cred you need to make is a role to run your lambda, follow this tutorial [here](https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example-create-iam-role.html)

#### `Make`

The `Makefile` at the root requires the `make` binary

On macOS, you most likely have it and can verify by typing `which make` in your terminal

Windows users will have to follow instructions [here](http://gnuwin32.sourceforge.net/packages/make.htm)

## Setup

There's a Makefile at the root which gives you some shortcuts to `create` your lambda function, `update` it, `delete` it, and `build` the project

First things first, hop into the `Makefile` and update the `PROJECT = xxxxx` variable at the top of the file to the name of your lambda/skill

Then change the role information: `arn:aws:iam::xxxx:role/your_role_here` in the `create:` job to your specific role (that you created first to run your lambda) otherwise it will try to use my role and will fail due to permissions


##### `build`

Basically, this will zip up your code and get it ready for pushing it to lambda

##### `create`

This will create your lambda function using the aws cli, which you should have set up already, if not, refer back to [prerequisites](#prerequisites)

##### `update`

This will update your lambda (more coming soon)
