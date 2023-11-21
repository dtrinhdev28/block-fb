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
    ['facebookSettings', 'generalSettings'],
    ({ facebookSettings, generalSettings }) => {
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
      if (facebookSettings.feed.value) {
        css += `
      .home .newsFeedComposer #contentArea, #m_newsfeed_stream, #MComposer, #MStoriesTray, [role="main"]:not([aria-label="Search Results"]) div:not([data-pagelet="GroupFeed"])>[role="feed"], [data-pagelet="Stories"] {
        display: none !important;
      }
      [aria-label="List of Groups"] ~ div [role="main"] [role="feed"][role="feed"][role="feed"], div [data-pagelet="GroupFeed"] [role="feed"] {
        display: initial !important;
      }
      `;
      }

      // Hide Likes and Comments box
      if (facebookSettings.likesComments.value) {
        css += `
      .commentable_item, .story_body_container + footer, [role="article"] div[data-vc-ignore-dynamic], div[data-pagelet^="FeedUnit_"] div[data-visualcompletion=ignore-dynamic] {
        display: none !important;
      }
      `;
      }

      // Hide Chat Sidebar
      if (facebookSettings.chatSidebar.value) {
        css += `
      .fbChatSidebar, #BuddylistPagelet, [data-pagelet="ChatTab"], [aria-label="New Message"], [aria-label="New message"] {
        display: none !important;
      }
      `;
      }

      // Hide Watch Feed
      if (facebookSettings.watchFeed.value) {
        css += `
      [aria-label*="Watch"], #watch_feed, [href*="facebook.com/watch"] {
        display: none !important;
      }
      `;
      }

      // Hide Marketplace
      if (facebookSettings.marketplace.value) {
        css += `
        [href*="/marketplace/"] {
          display: none !important;
        }
            `;
      }

      // Hide Stories
      if (facebookSettings.stories.value) {
        css += `
        [aria-label="Stories"] {
          display: none !important;
        }
            `;
      }

      // Remove Colors
      if (facebookSettings.color.value) {
        css += `
      * {
        filter: grayscale(100%);
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
