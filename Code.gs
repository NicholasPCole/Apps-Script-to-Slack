/**
 * Composes an attachment to be included with the message.
 *
 * @param {string} fallback Required text summary of the attachment that is shown by clients that understand attachments but choose not to show them.
 * @param {?string} title Optional title of the attachment.
 * @param {?string} pretext Optional text that should appear above the formatted data.
 * @param {?string} text Optional text that should appear within the attachment.
 * @param {?string} color One of either 'good', 'warning', 'danger', or a hexadecimal color code.
 * @param {?Array.<object>} fields Optional array of fields that should appear as a table in the attachment.
 * @return {object} The composition of the attachment as a JSON object.
 */
function newAttachment(fallback, title, pretext, text, color, fields) {
  var attachment = {
    'fallback': fallback,
    'mrkdwn_in': ['pretext', 'text']
  };
  
  if (title !== null) {
    attachment['title'] = title;
  }
  
  if (pretext !== null) {
    attachment['pretext'] = pretext;
  }
  
  if (text !== null) {
    attachment['text'] = text;
  }
  
  if (color !== null) {
    attachment['color'] = color;
  }
  
  if (fields !== null) {
    attachment['fields'] = fields;
  }
  
  // Logger.log('New attachment: ' + JSON.stringify(attachment));
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
  
  // Logger.log('New attachment field: ' + JSON.stringify(field));
  return field;
}

/**
 * @param {string} channel Required #channel or @username recipient of the message.
 * @param {string} text Required content of the message.
 * @param {?Array.<object>} attachments Optional array of attachments to include with the message.
 * @param {string} url Incoming webhook URL to post the message to.
 */
function postMessage(channel, text, attachments, url) {
  var payload = {
    'channel': channel,
    'text': text
  };
  
  if (attachments !== null) {
    payload['attachments'] = attachments;
  }

  var httpPostRequest = UrlFetchApp.fetch(url, {
    'method': 'post',
    'muteHttpExceptions': true,
    'payload': JSON.stringify(payload)
  });
  
  // Logger.log('Payload sent: ' + JSON.stringify(payload));
  // Logger.log('Response received: ' + httpPostRequest.getContentText());
}
