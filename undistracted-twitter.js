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
    ['twitterSettings', 'generalSettings'],
    ({ twitterSettings, generalSettings }) => {
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

      // Hide Trends
      if (twitterSettings.trends.value) {
        css += `
      .Trends, [aria-label="Timeline: Trending now"], [href="/explore"], [aria-label="Timeline: Explore"] {
        display: none !important;
      }
      `;
      }

      // Hide Who To Follow
      if (twitterSettings.whoToFollow.value) {
        css += `
      .wtf-module, [aria-label="Who to follow"] {
        display: none !important;
      }
      `;
      }

      // Hide Topics to follow
      if (twitterSettings.topics.value) {
        css += `
      [aria-label="Timeline: "], [href$="/topics"] {
        display: none !important;
      }
      `;
      }

      // Hide Media
      if (twitterSettings.media.value) {
        css += `
      .AdaptiveMedia, [aria-label="Image"], video {
        display: none !important;
      }
      `;
      }
      // Remove Colors
      if (twitterSettings.color.value) {
        css += `
      * {
        filter: grayscale(100%);
      }
      `;
      }
      // Hide Timeline - Opacity instead of Display to avoid re-trigger of layout drawing and hence slowdown
      if (twitterSettings.timeline.value) {
        css += `
        [role='main']#timeline .stream-container, [aria-label="Timeline: Your Home Timeline"] {
          visibility: hidden !important;
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
