/* global chrome */

googleAnalytics();

// Avoid circular
const fallbackUrl = 'https://localhost/';
var myTimer;

const relatedDomains = {
  facebook: ['facebook.com', 'fb.com'],
  youtube: ['youtube.com', 'youtu.be'],
  twitter: [
    'twitter.com',
    'twimg.com',
    'twttr.net',
    'twttr.com',
    'abs.twimg.com',
  ],
  reddit: ['reddit.com', 'old.reddit.com'],
  netflix: ['netflix.com'],
  linkedin: ['linkedin.com'],
};

const allSettings = {
  facebookSettings: {
    blockSite: {
      value: false,
      description: 'Chặn Facebook',
      tooltip: 'Block all access to Facebook domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
    },
    feed: {
      value: false,
      description: 'Hide Feed',
      tooltip: 'Hides your news feed',
      order: 1,
      type: 'switch',
    },
    likesComments: {
      value: false,
      description: 'Hide Likes and Comments',
      tooltip: 'Hides Likes and Comments section from all posts',
      order: 2,
      type: 'switch',
    },
    chatSidebar: {
      value: false,
      description: 'Hide Chat Sidebar',
      tooltip: 'Hides Chat sidebar on the right side',
      order: 3,
      type: 'switch',
    },
    watchFeed: {
      value: false,
      description: 'Hide Watch Feed',
      tooltip: 'Hides Watch button and Feed',
      order: 4,
      type: 'switch',
    },
    marketplace: {
      value: false,
      description: 'Hide Marketplace',
      tooltip: 'Hides Marketplace shortcut and blocks access',
      order: 5,
      type: 'switch',
    },
    stories: {
      value: false,
      description: 'Hide Stories',
      tooltip: 'Hides Stories panel from homepage',
      order: 6,
      type: 'switch',
    },
    color: {
      value: false,
      description: 'Remove colors',
      tooltip: 'Turns everything grey',
      order: 7,
      type: 'switch',
      enabled: false,
    },
  },
  youtubeSettings: {
    blockSite: {
      value: false,
      description: 'Block YouTube',
      tooltip: 'Block all access to YouTube domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
    },
    recommendations: {
      value: false,
      description: 'Hide Recommendations',
      tooltip: "Hides all videos recommended by YouTube's algorithm",
      order: 1,
      type: 'switch',
    },
    redirectToSubscriptions: {
      value: false,
      description: 'Force redirect to my subscriptions',
      tooltip: "Always redirect YouTube's homepage to my subscriptions feed",
      order: 2,
      type: 'switch',
    },
    breakingNews: {
      value: false,
      description: 'Hide Breaking News',
      tooltip: 'Hides breaking news and other recommended sections',
      order: 3,
      type: 'switch',
    },
    sidebar: {
      value: false,
      description: 'Hide Sidebar',
      tooltip: 'Hides sidebar with shortcuts to other YouTube pages',
      order: 4,
      type: 'switch',
    },
    comments: {
      value: false,
      description: 'Hide Comments',
      tooltip: 'Hides comments section from videos',
      order: 5,
      type: 'switch',
    },
    thumbnail: {
      value: 0,
      description: 'Blur/Hide Thumbnails',
      tooltip: 'Blurs/Hides Video Thumbnail',
      order: 6,
      type: 'switch-multi',
    },
    upNext: {
      value: false,
      description: 'Hide Up Next Suggestions',
      tooltip: 'Hide suggested videos after and during the video',
      order: 7,
      type: 'switch',
    },
    shorts: {
      value: false,
      description: 'Hide Shorts',
      tooltip: 'Hide Shorts shortcut button and feed sections',
      order: 8,
      type: 'switch',
    },
  },
  twitterSettings: {
    blockSite: {
      value: false,
      description: 'Block Twitter',
      tooltip: 'Block all access to Twitter domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
    },
    timeline: {
      value: false,
      description: 'Hide Timeline',
      tooltip: 'Hides homepage feed',
      order: 1,
      type: 'switch',
    },
    trends: {
      value: false,
      description: 'Hide Trends',
      tooltip: 'Hides Trends section from your feed',
      order: 2,
      type: 'switch',
    },
    whoToFollow: {
      value: false,
      description: 'Hide Who to follow',
      tooltip: 'Hides Who to follow section',
      order: 3,
      type: 'switch',
    },
    topics: {
      value: false,
      description: 'Hide Topics to follow',
      tooltip: 'Hides Topics to follow section',
      order: 4,
      type: 'switch',
    },
    media: {
      value: false,
      description: 'Hide all media',
      tooltip: 'Hides all Videos and Images from your feed',
      order: 5,
      type: 'switch',
    },
    color: {
      value: false,
      description: 'Remove colors',
      tooltip: 'Turns everything grey',
      order: 6,
      type: 'switch',
      enabled: false, // Performance Issues
    },
  },
  redditSettings: {
    blockSite: {
      value: false,
      description: 'Block Reddit',
      tooltip: 'Block all access to Reddit domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
    },
    hideComments: {
      value: false,
      description: 'Hide comments (old.reddit only)',
      tooltip: 'Hides comments and discussion threads from all posts',
      order: 1,
      type: 'switch',
      // enabled: false
    },
    hideFrontPageFeed: {
      value: false,
      description: 'Hide Front page feed (old.reddit only)',
      tooltip: 'Hides posts from your reddit front page',
      order: 2,
      type: 'switch',
      // enabled: false
    },
    popular: {
      value: false,
      description: 'Block r/popular',
      tooltip: 'Blocks access to r/popular page and hides shortcuts to it',
      type: 'switch',
      order: 3,
    },
    all: {
      value: false,
      description: 'Block r/all',
      tooltip: 'Blocks access to r/all page and hides shortcuts to it',
      type: 'switch',
      order: 4,
    },
  },
  netflixSettings: {
    blockSite: {
      value: false,
      description: 'Block Netflix',
      tooltip: 'Block all access to Netflix domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
    },
    hideAllShowMyAndContinue: {
      value: false,
      description: 'Hide Recommendations',
      tooltip: 'Hides everything except "Continue Watching" and "My List"',
      order: 1,
      type: 'switch',
    },
    hideContinueWatching: {
      value: false,
      description: 'Hide Continue Watching',
      tooltip: 'Hides "Continue Watching" queue section',
      type: 'switch',
      order: 2,
    },
    hideMyList: {
      value: false,
      description: 'Hide My List',
      tooltip: 'Hides "My List" section',
      type: 'switch',
      order: 3,
    },
  },
  linkedinSettings: {
    blockSite: {
      value: false,
      description: 'Block LinkedIn',
      tooltip: 'Block all access to LinkedIn domain',
      order: 0,
      type: 'switch',
      customClass: 'red-setting',
    },
    feed: {
      value: false,
      description: 'Hide Feed',
      tooltip: 'Hides Feed from your homepage',
      order: 1,
      type: 'switch',
    },
    messaging: {
      value: false,
      description: 'Hide Messaging popup',
      tooltip: 'Hides Messaging popup on the bottom right of the page',
      order: 2,
      type: 'switch',
    },
    news: {
      value: false,
      description: 'Hide LinkedIn News',
      tooltip: 'Hides LinkedIn News section',
      order: 3,
      type: 'switch',
    },
    likesComments: {
      value: false,
      description: 'Hide Likes and Comments',
      tooltip: 'Hides Likes and Comments section from all posts',
      order: 4,
      type: 'switch',
    },
  },
  generalSettings: {
    disableFilters: {
      value: false,
      description: 'Pause all filters',
      tooltip:
        'Disables all filters temporarily. Your filter settings will remain intact',
      type: 'switch',
      order: 1,
    },
    disableFiltersTemporary: {
      value: { active: false, endTimestamp: '' },
      description: 'Pause for 5 minutes',
      tooltip:
        'Pauses all filters for 5 minutes and then resumes automatically',
      type: 'switch-with-meta',
      order: 2,
    },
    disableDuringHours: {
      value: { active: false, fromTime: '', toTime: '' },
      description: 'Pause during',
      tooltip: '',
      type: 'switch-with-time-period',
      order: 3,
    },
    customSitesToBlock: {
      value: { active: false, customURLList: [] },
      description: 'Block list',
      tooltip: '',
      type: 'text-list',
      order: 4,
    },
    customRedirectURL: {
      value: 'http://localhost/',
      description: 'Custom URL',
      tooltip:
        'Enter link to a site where you wants to be redirected to if blocked',
      type: 'text',
      order: 5,
    },
    hideTooltip: {
      value: false,
      description: 'Hide tooltips',
      tooltip: 'Hide all tooltips shown while hovering on filters',
      type: 'switch',
      order: 6,
    },
    communicateToDev: {
      tooltip: 'Help the developer improve this extension',
      buttonList: [
        {
          title: 'Leave rating',
          action: 'redirect',
          icon: 'star',
          iconColor: '#01b1f1',
          to:
            'https://chrome.google.com/webstore/detail/undistracted/pjjgklgkfeoeiebjogplpnibpfnffkng/reviews',
        },
        {
          title: 'Request Feature',
          action: 'mail',
          icon: 'plus-circle',
          iconColor: '#52c41a',
          to:
            'undistracted.developer+feature@gmail.com?subject=Feature Request&body=Feature description: ',
        },
        {
          title: 'Report bug',
          action: 'mail',
          icon: 'tool',
          iconColor: '#eb2f96',
          to:
            'undistracted.developer+bug@gmail.com?subject=Bug Report&body=Operating System [Windows, Linux, Mac OS, Chrome OS]: %0D%0ABug Description: %0D%0AScreenshot (if applicable): ',
        },
      ],
      type: 'button-list',
      order: 7,
    },
    donate: {
      value: false,
      description: '',
      tooltip: 'Support the development',
      type: 'image',
      link:
        '<style>.bmc-button img{height: 34px !important;width: 35px !important;margin-bottom: 1px !important;box-shadow: none !important;border: none !important;vertical-align: middle !important;}.bmc-button{padding: 7px 15px 7px 10px !important;line-height: 35px !important;height:51px !important;text-decoration: none !important;display:inline-flex !important;color:#ffffff !important;background-color:#5F7FFF !important;border-radius: 5px !important;border: 1px solid transparent !important;padding: 7px 15px 7px 10px !important;font-size: 22px !important;letter-spacing: 0.6px !important;box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;margin: 0 auto !important;font-family:\'Cookie\', cursive !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;}.bmc-button:hover, .bmc-button:active, .bmc-button:focus {-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;text-decoration: none !important;box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;opacity: 0.85 !important;color:#ffffff !important;}</style><link href="https://fonts.googleapis.com/css?family=Cookie" rel="stylesheet"><a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/betterself"><img src="https://res.cloudinary.com/dxmi9d3vj/image/upload/v1594642510/book_dfhgvh.svg" alt="Buy me a book"><span style="margin-left:5px;font-size:28px !important;">Buy me a book</span></a>',
      order: 8,
    },
  },
};

function setLaunchPages(reason, previousVersion = '') {
  chrome.runtime.setUninstallURL('https://undistracted.typeform.com/to/yx84Z6');
  if (reason === 'install') {
    chrome.tabs.create({ url: 'https://www.undistracted.app/installed' });
  } else if (reason === 'update') {
    if (chrome.runtime.getManifest().version === '1.6') {
      chrome.tabs.create({ url: 'https://www.undistracted.app/updated' });
    }
  }
}

function loadStorageToLocal(cbOnLoad) {
  chrome.storage.sync.get(
    [
      'twitterSettings',
      'youtubeSettings',
      'facebookSettings',
      'redditSettings',
      'netflixSettings',
      'linkedinSettings',
      'generalSettings',
    ],
    (storageData) => {
      if (storageData.twitterSettings) {
        Object.keys(storageData.twitterSettings).forEach((filterKey) => {
          allSettings.twitterSettings[filterKey].value =
            storageData.twitterSettings[filterKey].value;
        });
      }
      if (storageData.youtubeSettings) {
        Object.keys(storageData.youtubeSettings).forEach((filterKey) => {
          allSettings.youtubeSettings[filterKey].value =
            storageData.youtubeSettings[filterKey].value;
        });
      }
      if (storageData.facebookSettings) {
        Object.keys(storageData.facebookSettings).forEach((filterKey) => {
          allSettings.facebookSettings[filterKey].value =
            storageData.facebookSettings[filterKey].value;
        });
      }
      if (storageData.redditSettings) {
        Object.keys(storageData.redditSettings).forEach((filterKey) => {
          allSettings.redditSettings[filterKey].value =
            storageData.redditSettings[filterKey].value;
        });
      }
      if (storageData.netflixSettings) {
        Object.keys(storageData.netflixSettings).forEach((filterKey) => {
          allSettings.netflixSettings[filterKey].value =
            storageData.netflixSettings[filterKey].value;
        });
      }
      if (storageData.linkedinSettings) {
        Object.keys(storageData.linkedinSettings).forEach((filterKey) => {
          allSettings.linkedinSettings[filterKey].value =
            storageData.linkedinSettings[filterKey].value;
        });
      }
      if (storageData.generalSettings) {
        Object.keys(storageData.generalSettings).forEach((filterKey) => {
          if (
            filterKey === 'customSitesToBlock' &&
            Array.isArray(allSettings.generalSettings.customSitesToBlock.value)
          ) {
            allSettings.generalSettings.customSitesToBlock.value = {
              active: false,
              customURLList: [],
            };
          } else {
            allSettings.generalSettings[filterKey].value =
              storageData.generalSettings[filterKey].value;
          }
        });
      }
      cbOnLoad && cbOnLoad();
    }
  );
}

function rootDomain(url) {
  return url
    .match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gim)[0]
    .split('://')
    .reverse()[0]
    .split('www.')
    .reverse()[0];
}

function safeRedirectOnBlock(tabId, redirectUrl, fallbackUrl, safeCheckUrls) {
  const redirectUrlRootDomain = rootDomain(redirectUrl);
  const safeRedirectUrl = safeCheckUrls.some((i) =>
    redirectUrlRootDomain.includes(i)
  )
    ? fallbackUrl
    : redirectUrl;
  chrome.tabs.update(
    tabId,
    {
      url: safeRedirectUrl,
    },
    () => {
      return;
    }
  );
}

function startTimer() {
  const {
    active,
    endTimestamp,
  } = allSettings.generalSettings.disableFiltersTemporary.value;
  const remainingTime = endTimestamp - Date.now();
  if (!active || remainingTime <= 0) {
    return endTimer();
  }
  if (remainingTime > 0) {
    myTimer = setTimeout(endTimer, remainingTime);
  }
}
function endTimer() {
  allSettings.generalSettings.disableFiltersTemporary.value.endTimestamp = '';
  allSettings.generalSettings.disableFiltersTemporary.value.active = false;
  chrome.storage.sync.set(
    {
      generalSettings: allSettings.generalSettings,
    },
    clearTimeout(myTimer)
  );
}

loadStorageToLocal(startTimer);

/* Set storage as empty on installing */
chrome.runtime.onInstalled.addListener((details) => {
  /* Launch welcome / install  */
  setLaunchPages(details && details.reason, details && details.previousVersion);

  // TODO One time - change true/false to show/blur/hide
  (() => {
    var updatedYoutubeSettings = allSettings.youtubeSettings;
    if (allSettings.youtubeSettings.thumbnail.value == false) {
      updatedYoutubeSettings.thumbnail.value = '0';
    } else if (allSettings.youtubeSettings.thumbnail.value == true) {
      updatedYoutubeSettings.thumbnail.value = '1';
    } else {
      updatedYoutubeSettings.thumbnail.value =
        allSettings.youtubeSettings.value;
    }
    chrome.storage.sync.set({
      youtubeSettings: updatedYoutubeSettings,
    });
  })();

  /* Get data from local if already there on updates */
  loadStorageToLocal(() => {
    chrome.storage.sync.set({
      twitterSettings: allSettings.twitterSettings,
      youtubeSettings: allSettings.youtubeSettings,
      facebookSettings: allSettings.facebookSettings,
      redditSettings: allSettings.redditSettings,
      netflixSettings: allSettings.netflixSettings,
      linkedinSettings: allSettings.linkedinSettings,
      generalSettings: allSettings.generalSettings,
    });
  });
});

/* Load settings in script on chrome start */
chrome.runtime.onStartup.addListener(() => {
  loadStorageToLocal();
});

/* Listen to changes in settings and transmit to all open tabs for live update */
chrome.storage.onChanged.addListener((changes, namespace) => {
  const [filterCategory, bothChanges] = Object.entries(changes)[0];
  const newSettings = bothChanges.newValue;
  const oldTimerActive =
    allSettings.generalSettings.disableFiltersTemporary.value.active;
  allSettings[filterCategory] = newSettings;

  // Handle disableFiltersTemporary toggle
  if (
    filterCategory === 'generalSettings' &&
    newSettings.disableFiltersTemporary.value.active !== oldTimerActive
  ) {
    if (allSettings.generalSettings.disableFiltersTemporary.value.active) {
      startTimer();
    } else {
      endTimer();
    }
  }
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, 'refresh');
    });
  });
});

// Blocking custom websites
chrome.webNavigation.onBeforeNavigate.addListener(({ frameId, tabId, url }) => {
  if (frameId === 0) {
    const {
      twitterSettings,
      youtubeSettings,
      facebookSettings,
      redditSettings,
      netflixSettings,
      linkedinSettings,
      generalSettings,
    } = allSettings;
    const urlDomain = rootDomain(url);
    const redirectUrl =
      'http://' +
      generalSettings.customRedirectURL.value
        .trim()
        .split('://')
        .reverse()[0];
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
    const fromTime = generalSettings.disableDuringHours.value.fromTime;
    const toTime = generalSettings.disableDuringHours.value.toTime;

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

    if (
      facebookSettings.blockSite.value &&
      relatedDomains.facebook.some((i) => urlDomain.includes(i))
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.facebook
      );
    } else if (
      youtubeSettings.blockSite.value &&
      relatedDomains.youtube.some((i) => urlDomain.includes(i)) &&
      !url.includes('music.') &&
      !url.includes('studio.')
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.youtube
      );
    } else if (
      youtubeSettings.redirectToSubscriptions.value &&
      relatedDomains.youtube.some((i) => urlDomain.includes(i)) &&
      url.split('.com')[1] == '/' &&
      !url.includes('music.') &&
      !url.includes('studio.')
    ) {
      safeRedirectOnBlock(
        tabId,
        'https://www.youtube.com/feed/subscriptions',
        fallbackUrl,
        ['https://www.youtube.com/feed/subscriptions']
      );
    } else if (
      twitterSettings.blockSite.value &&
      relatedDomains.twitter.some((i) => urlDomain.includes(i))
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.twitter
      );
    } else if (
      redditSettings.blockSite.value &&
      relatedDomains.reddit.some((i) => urlDomain.includes(i))
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.reddit
      );
    } else if (
      netflixSettings.blockSite.value &&
      relatedDomains.netflix.some((i) => urlDomain.includes(i))
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.netflix
      );
    } else if (
      linkedinSettings.blockSite.value &&
      relatedDomains.linkedin.some((i) => urlDomain.includes(i))
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.linkedin
      );
    } else if (generalSettings.customSitesToBlock.value.active) {
      const customURLListDomains = generalSettings.customSitesToBlock.value.customURLList.map(
        (customURL) => rootDomain(customURL)
      );
      if (customURLListDomains.some((i) => urlDomain.includes(i))) {
        safeRedirectOnBlock(
          tabId,
          redirectUrl,
          fallbackUrl,
          customURLListDomains
        );
      }
    }
    //  reddit all and popular
    else if (
      redditSettings.all.value &&
      relatedDomains.reddit.some((i) => urlDomain.includes(i)) &&
      url.includes('r/all')
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.reddit
      );
    } else if (
      redditSettings.popular.value &&
      relatedDomains.reddit.some((i) => urlDomain.includes(i)) &&
      url.includes('r/popular')
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.reddit
      );
    }
    // facebook marketplace
    else if (
      facebookSettings.marketplace.value &&
      url.includes('facebook.com/marketplace')
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.reddit
      );
    }
    // youtube shorts
    else if (
      youtubeSettings.shorts.value &&
      url.includes('youtube.com/shorts')
    ) {
      safeRedirectOnBlock(
        tabId,
        redirectUrl,
        fallbackUrl,
        relatedDomains.youtube
      );
    }
  }
});

function googleAnalytics() {
  // Standard Google Universal Analytics code
  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    (i[r] =
      i[r] ||
      function() {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    'script',
    'https://www.google-analytics.com/analytics.js',
    'ga'
  ); // Note: https protocol here

  ga('create', 'UA-131792384-1', 'auto');
  ga('set', 'checkProtocolTask', function() {});
  ga('set', 'dimension1', `${chrome.runtime.getManifest().version}`);
  ga('require', 'displayfeatures');
  ga('send', 'pageview', 'background.js');
}
