'use strict';
/* global chrome */
chrome.runtime.onMessage.addListener(function(message) {
  runContentScript();
});

runContentScript();

function runContentScript() {
  var css = '';
  const currentTime =
    new Date()
      .getHours()
      .toString()
      .padStart(2, '0') +
    ':' +
    new Date()
      .getMinutes()
      .toString()
      .padStart(2, '0');

  chrome.storage.sync.get(
    ['linkedinSettings', 'generalSettings'],
    ({ linkedinSettings, generalSettings }) => {
      const fromTime = generalSettings.disableDuringHours.value.fromTime;
      const toTime = generalSettings.disableDuringHours.value.toTime;
      // Remove existing and add new
      var existingStyle = document.getElementById('undistracted-style');
      if (existingStyle) {
        existingStyle.remove();
      }

      if (
        generalSettings.disableFilters.value ||
        generalSettings.disableFiltersTemporary.value.active ||
        (generalSettings.disableDuringHours.value.active &&
          (fromTime < toTime
            ? fromTime <= currentTime && currentTime < toTime
            : (fromTime <= currentTime && currentTime <= '23:59') ||
              ('00:00' <= currentTime && currentTime < toTime)))
      ) {
        return;
      }
      // Hide Feed
      if (linkedinSettings.feed.value) {
        css += `
      main.scaffold-layout__main[aria-label="Main Feed"] {
        visibility: hidden !important;
      }

      /*
      Mobile site
      Hide all feeds and then show company feed back
      */
      .feeds>#feed-container {
        display: none !important;
      }

      .company-page ~ .feeds>#feed-container {
        display: none !important;
      }
      `;
      }

      // Hide Messaging
      if (linkedinSettings.messaging.value) {
        css += `
        #msg-overlay {
          display: none !important;
        }
      `;
      }

      // Hide LinkedIn News
      if (linkedinSettings.news.value) {
        css += `
        .news-module {
          display: none !important;
        }
      `;
      }

      // Hide LinkedIn News
      if (linkedinSettings.likesComments.value) {
        css += `
        .social-details-social-activity, [data-feed-action="socialActionsLabel"], .social-actions-panel, #comment-preview {
          display: none !important;
        }
      `;
      }

      var style = document.createElement('style');
      style.setAttribute('id', 'undistracted-style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    }
  );
}
