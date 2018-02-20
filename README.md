# ALEXA-TWITTER-SKILL

This is a simple skill I wrote to use the Twitter API to search tweets.
This one specifically pulls tweets from Elon Musk.

There's also a Makefile at the root which will build and allow you to push your code, just be sure to update the `create:` job in the Makefile with your specific role information: `arn:aws:iam::xxxx:role/your_role_here` otherwise it will try to use my role and will fail due to permissions.
