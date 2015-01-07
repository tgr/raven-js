#!/bin/sh
# SAUCE_USER=<username> SAUCE_KEY=<key> GITHUB_USER=<username> test.sh
curl https://saucelabs.com/rest/v1/$SAUCE_USER/js-tests \
-X POST \
-u $SAUCE_KEY \
-H 'Content-Type: application/json' \
--data `cat <<JSON
{
    "platforms": [["Windows 7", "firefox", "27"],
                 ["Linux", "googlechrome", ""]],
    "url": "https://$GITHUB_USER.github.io/raven-js/tests/browser/stack.html",
    "framework": "custom"
}
>>JSON
