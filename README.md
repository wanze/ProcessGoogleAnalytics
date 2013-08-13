# Google Analytics Page for ProcessWire
This module adds a new "Google-Analytics" Page in your Admin-Panel and displays various Statistics from a Google Analytics Account.


**Important**   
If you update from a version < 1.2.0, you need to revoke authentication and choose the Google Analytics account again.   
Check *Revoke Authentication* in the module's config and save. Follow step 4,5 and 6 from the Installation section below.

## Features
* Visits by Date (Chart)
* General Statistics about Visits (Total visits, Visit duration, New visitors, Returning visitors etc.)
* Demographics: Countries, Cities, Languages
* System: Browsers, Operating Systems, Screen Resolutions
* Mobile: Operating Systems, Screen Resolutions
* Pageviews by Date (Chart)
* Top Content
* Traffic Sources: Keywords, Referral Traffic by Domain and URL
* Choose a default date range displaying statistics: last 24 hours, 2 days, 1 week, 1 month etc.
* Custom date range by setting a *start date* and *end date*

## Resources
* Forum Thread with Screenshots and Install Instructions: http://processwire.com/talk/topic/1609-processgoogleanalytics/
* Module on the Processwire Modules page: http://modules.processwire.com/modules/process-google-analytics/
* jqplot Jquery Plugin: http://www.jqplot.com

## Requirements
* Google account and Analytics account
* Project in the Google APIs console
* cURL

## Installation
1. Create a Project in the Google APIs console: https://code.google.com/apis/console/  
The project can be used for this module on multiple ProcessWire sites
	* Under services, enable the Analytics API
	* Under API Access: Create an Oauth 2.0 Client-ID
	* Give a product name, choose "Web-Application"
	* Enter the redirect URI to the GA page in the ProcessWire admin. (e.g. http://www.yourdomain.com/processwire/google-analytics/) 
2. Place the module's files in /site/modules/ProcessGoogleAnalytics and install the module.
3. Enter the Client-ID and Client-Secret keys from your created project in the module config
4. Load the Google Analytics page in the admin and click on button "authenticate"
5. Log in with your google account
6. Choose a Google Analytics account from the dropdown

In order to let other users see the Google Analytics page, you must give their role access to the *ga-view* permission.
