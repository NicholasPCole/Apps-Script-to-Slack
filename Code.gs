/**
 * Composes an attachment to be included with the message.
 *
 * @param {string} fallback Required plain-text summary of the attachment,
 * shown by clients that understand attachments but choose not to show them.
 * @param {?Object} options Optional properties to control the content and
 * presentation of the attachment.
 * @returns {Object} The composition of the attachment, as a JSON object.
 */
function newAttachment(fallback, options) {
  var attachment = {
    "fallback": fallback,
    "mrkdwn_in": ["pretext", "text"]
  };
  
  var allowed_options = ["color",
                         "pretext",
                         "author_name",
                         "author_link",
                         "author_icon",
                         "title",
                         "title_link",
                         "text",
                         "fields",
                         "image_url",
                         "thumb_url"];
  
  if (options) {
    for (var i = 0; i < allowed_options.length; i++) {
      // Loop through allowed options per Slack incoming webhook documentation.
      
      if (options[allowed_options[i]]) {
        // If that hash exists in the options parameter, add it to the composed
        // attachment which is returned by the function.
        
        attachment[allowed_options[i]] = options[allowed_options[i]];
      }
    }
  }
  
  Logger.log("New attachment: " + JSON.stringify(attachment));
  return attachment;
}

/**
 * Composes a field to include in an attachment.
 *
 * @param {string} title Shown as a bold heading above the `value` text.
 * @param {(string|number)} value The text value of the field.
 * @param {boolean} short Flag indicating whether the `value` is short enough
 * to be displayed side-by-side with other fields.
 * @returns {Object} The composition of the field, as a JSON object.
 */
function newField(title, value, short) {
  var field = {
    "title": title,
    "value": value,
    "short": short
  };
  
  Logger.log("New attachment field: " + JSON.stringify(field));
  return field;
}

/**
 * Composes and sends a message to a Slack incoming webhook.
 *
 * @param {string} url Slack URL where messages for the webhook can be received.
 * @param {string} text Content of the incoming webhook.
 * @param {?Object} options Optional properties to control the content and
 * presentation of the message.
 */
function postMessage(url, text, options) {
  var payload = {
    "text": text
  }
  
  var allowed_options = ["attachments",
                         "channel",
                         "icon_emoji",
                         "username"];
  
  if (options) {
    for (var i = 0; i < allowed_options.length; i++) {
      // Loop through allowed options per Slack incoming webhook documentation.
      
      if(options[allowed_options[i]]) {
        // If that hash exists in the options parameter, add it to the composed
        // attachment which is returned by the function.
        
        payload[allowed_options[i]] = options[allowed_options[i]];
      }
    }
  }
  
  var webhookPostRequest = UrlFetchApp.fetch(url, {
    "method": "post",
    "muteHttpExceptions": true,
    "payload": JSON.stringify(payload)
  });
}
