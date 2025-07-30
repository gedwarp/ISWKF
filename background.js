/** UNINSTALL URL DISABLED **/
/* Check whether new version is installed */
chrome.runtime.onInstalled.addListener(function(details) {
  /* other 'reason's include 'update' */
  if (details.reason == "install") {
      // Uninstall URL functionality has been disabled
      // var uninstallGoogleFormLink = 'https://docs.google.com/forms/d/e/1FAIpQLSfym2cRHxdZZCzKVn0eWVobWGjnrRLu64QPw19x7GR77tCWfQ/viewform?usp=pp_url&entry.1591633300=Comments&entry.326955045&entry.1696159737';
      // if (chrome.runtime.setUninstallURL) {
      //     chrome.runtime.setUninstallURL(uninstallGoogleFormLink);
      // }
  }
});
