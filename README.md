Slack Incoming Webhooks for Apps Script
=======================================

Send messages to Slack incoming webhooks from Google Apps Script.

Installation
------------

If you only plan to use the code in a single project, you can simply create a new script file containing this code. The filename does not matter.

On the other hand, if you want to use the code for multiple Apps Script project, the better approach would be to use the code as an [Apps Script library](https://developers.google.com/apps-script/guide_libraries):

1.  Create a new project containing only this code.
2.  From `File > Manage versions`, save a new version of the project.
3.  From `File > Project properties`, look under the "Info" tab and note the project key.
4.  In another project containing your code—from `Resources > Libraries`, enter the project key and click "Select". Choose a version that you saved and enter an identifier (`IncomingWebhook`, for example).

Usage
-----

Most simply, you can send a message to a channel with the following syntax:

    newField(title, value, short);
    newAttachment(fallback, options);
    postMessage(url, text, options);

For either function, `options` is a JSON object containing any of the optional properties you want to define (color, title, fields, attachments, channel, and so forth).

Reference
---------

* [Slack incoming webhooks documentation](https://api.slack.com/incoming-webhooks)
