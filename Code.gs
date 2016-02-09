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
 * @param {string} title Required title of the field.
 * @param {(string|number)} value Required value of the field.
 * @param {boolean} short Flag indicating whether the field is short enough to be displayed side-by-side with another field.
 * @return {object} The composition of the field as a JSON object.
 */
function newField(title, value, short) {
  var field = {
    'title': title,
    'value': value,
    'short': short
  };
  
  Logger.log('New attachment field: ' + JSON.stringify(field));
  return field;
}

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
