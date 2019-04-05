<template>
  <div class="wizard-post-options">
    <div class="row">
      <div class="column">
        <ul class="post-options">
          <li class="post-option">
            <div class="row">
              <div class="column">
                <h3 class="post-option-title">
                  Facebook
                </h3>
              </div>
              <div class="column shrink">
                <a class="post-option-add-new-link" @click="openModalFor('facebook')">Edit Facebook</a>
              </div>
            </div>
            <hr class="hr--small">
            <div class="post-option-content">
              <div class="row" v-for="conn in facebook">
                <div class="column">
                  <div class="switch">
                    <input class="switch-input" id="checkbox-{{ conn.id }}" type="checkbox" v-model="checkedSocialMediaConnections" :value="conn.id" number>
                    <label class="switch-label" for="checkbox-{{ conn.id }}"></label>
                  </div>
                  <label class="switch-title" for="checkbox-{{ conn.id }}">{{ conn.title }}</label>
                </div>
              </div>
            </div>
          </li>
          <li class="post-option">
            <div class="row">
              <div class="column">
                <h3 class="post-option-title">
                  Twitter
                </h3>
              </div>
              <div class="column shrink">
                <a class="post-option-add-new-link" @click="openModalFor('twitter')">Edit Twitter</a>
              </div>
            </div>
            <hr class="hr--small">
            <div class="post-option-content">
              <div class="row" v-for="conn in twitter">
                <div class="column">
                  <div class="switch">
                    <input class="switch-input" id="checkbox-{{ conn.id }}" type="checkbox" v-model="checkedSocialMediaConnections" :value="conn.id" number>
                    <label class="switch-label" for="checkbox-{{ conn.id }}"></label>
                  </div>
                  <label class="switch-title" for="checkbox-{{ conn.id }}">{{ conn.title }}</label>
                </div>
              </div>
            </div>
          </li>
          <li class="post-option">
            <div class="row">
              <div class="column">
                <h3 class="post-option-title">
                  RSS
                </h3>
              </div>
              <div class="column shrink">
                <a class="post-option-add-new-link" title="Edit RSS feeds" @click="openModalFor('rss')">Edit RSS Feeds</a>
              </div>
            </div>
            <hr class="hr--small">
            <div class="post-option-content">
            <div class="row" v-for="conn in rss">
                <div class="column">
                  <div class="switch">
                    <input class="switch-input" id="checkbox-{{ conn.id }}" type="checkbox" v-model="checkedSocialMediaConnections" :value="conn.id" number>
                    <label class="switch-label" for="checkbox-{{ conn.id }}"></label>
                  </div>
                  <label class="switch-title" for="checkbox-{{ conn.id }}">{{ conn.title }}</label>
                  <a class="small-link" title="Open download link for RSS feed" @click="openModalFor('rsslink', conn.id)">Get URL</a>
                </div>
              </div>
            </div>
          </li>
          <li class="post-option">
            <div class="row">
              <div class="column">
                <h3 class="post-option-title">
                  Webpages
                </h3>
              </div>
              <div class="column shrink">
                <a class="post-option-add-new-link" @click="openModalFor('websites')">Edit Webpages</a>
              </div>
            </div>
            <hr class="hr--small">
            <div class="post-option-content">
              <div class="row" v-for="conn in webwidget">
                <div class="column">
                  <div class="switch">
                    <input class="switch-input" id="checkbox-{{ conn.id }}" type="checkbox" v-model="checkedSocialMediaConnections" :value="conn.id" number>
                    <label class="switch-label" for="checkbox-{{ conn.id }}"></label>
                  </div>
                  <label class="switch-title" for="checkbox-{{ conn.id }}">{{ conn.title }} <a class="small-link" title="Open modal for webpage embed code" @click="openModalFor('webembed', conn.id)">Get Embed Code</a></label>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="column">
        <ul class="post-options">
          <li class="post-option">
            <div class="row">
              <div class="column">
                <h3 class="post-option-title">Bumpers</h3>
              </div>
            </div>
            <hr class="hr--small">
            <div class="post-option-content">
              <div class="row">
                <div class="column">
                  <div class="switch-title">Custom Pre-Bumper</div>
                </div>
                <div class="column shrink">
                  <div v-if="event.pre_bumper">
                    <a :href="prePlayUrl" onclick="window.open(this.href, '_blank', 'status=yes, resizable=yes'); return false;" target="_blank" title="Preview Pre-Bumper Clip">Play</a> |
                    <a href="#" title="Delete Pre-Bumper Clip" @click="deletePreBumper()">Delete</a>
                  </div>

                  <div v-if="!event.pre_bumper">
                    <label for="prebumperUpload" class="btn-anchor">Upload New</label>
                    <input type="file" id="prebumperUpload" class="show-for-sr" @change="uploadPre($event)">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="column">
                  <div class="switch-title">Custom Post-Bumper</div>
                </div>
                <div class="column shrink">
                  <div v-if="event.post_bumper">
                    <a :href="postPlayUrl" onclick="window.open(this.href, '_blank', 'status=yes, resizable=yes'); return false;" target="_blank" title="Preview Post-Bumper Clip">Play</a> |
                    <a href="#" title="Delete Post-Bumper Clip" @click="deletePostBumper()">Delete</a>
                  </div>

                  <div v-if="!event.post_bumper">
                    <label for="postbumperUpload" class="btn-anchor">Upload New</label>
                    <input type="file" id="postbumperUpload" class="show-for-sr" @change="uploadPost($event)">
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <modal :open.sync="openWebsiteEditor" id="webwidgetEditor">
      <h4 slot="header">Edit Webpages</h4>
      <div slot="body">
        <div class="row align-bottom">
          <div class="column">
            <label class="modal-text">Create New Webpage
              <input type="text" placeholder="Enter name" title="Friendly name to remember it by" v-model="smcTitle">
              <div v-if='iHeartAvailable' class="column">
                <div class='row'>Select an iHeart RSS feed below if posts are saved to an iHeart page.</div>
                <div class='row'>
                  <select class="width-auto" v-model="smcUrl">
                    <option value="">Not posting to an iHeart station page.</option>
                    <option v-for="conn in iHeartRss" v-bind:value="conn.iheart_show_id">{{ conn.title }}</option>
                  </select>
                </div>
              </div>
              <input v-else type="text" placeholder="Site url" title="Enter full url of destination webpage" v-model="smcUrl">
              <div class="row">Default Toggle Position&nbsp;&nbsp;
                <div class="column shrink">
                  Post&nbsp;&nbsp;
                  <select v-model="smcDefaultOnPost" class="width-auto" title="Select default post toggle position">
                    <option value='yes'>On</option>
                    <option value='no'>Off</option>
                  </select>
                </div>
                <div class="column shrink">
                  Browser&nbsp;&nbsp;
                  <select v-model="smcDefaultOnBrowser" class="width-auto" title="Select default browser toggle position">
                    <option value='yes'>On</option>
                    <option value='no'>Off</option>
                  </select>
                </div>
              </div>
            </label>
          </div>
          <div class="column shrink">
            <button class="edit-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
              :disabled="" v-if="smcId"
              @click="editWebsiteAndClear()">
              Save
            </button>
            <button class="add-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
              :disabled="" v-else
              @click="createWebsiteAndClear()">
              Save
            </button>
          </div>
        </div>
        <div class="manage-web-column web-list space-above">
          <div class="row" v-for="conn in webwidget">
            <div class="column small-3">
              <div class="switch-title">{{conn.title}}</div>
            </div>
            <div class="column small-3">
              <a class="" title="Edit" @click="editWebsite(conn.id)">Edit</a> |
              <a class="" title="Delete" @click="deleteConn(conn.id)">Delete</a>
            </div>
            <div class="column small-3 shrink">
            </div>
          </div>
        </div>
      </div>
    </modal>
    <modal :open.sync="openRSSEditor" id="rssEditor">
      <h4 slot="header">Edit RSS Feeds</h4>
      <div slot="body">
        <div class="row align-bottom">
          <div class="column">
            <label class="modal-text">Create New RSS Feed
              <input type="text" placeholder="Enter display name" title="Display name for RSS feed" v-model="smcTitle">
              <textarea rows="2" placeholder="Enter description" title="Description given as part of RSS feed" v-model="smcDescription"></textarea>
              <div class="row">
                <div class="column">
                  <div class="row small-collapse">
                    <div class="column shrink">Author&nbsp;&nbsp;</div>
                    <div class="column"><input type="text" placeholder="Enter author name" title="Display author for RSS feed" v-model="smcAuthor"></div>
                  </div>
                  <div class="row small-collapse">
                    <div class="column shrink">Subtitle&nbsp;&nbsp;</div>
                    <div class="column"><input type="text" placeholder="Enter subtitle" title="Subtitle for RSS feed" v-model="smcSubtitle"></div>
                  </div>
                  <div class="row small-collapse">
                    <div class="column shrink">Email&nbsp;&nbsp;</div>
                    <div class="column"><input type="text" placeholder="Enter email" title="Email for RSS feed" v-model="smcEmail"></div>
                  </div>
                  <div class="row small-collapse">
                    <div class="column shrink">Podcast Connect Authorization&nbsp;&nbsp;</div>
                    <div class="column"><input type="text" placeholder="Enter auth code" title="Podcast Connect Auth for RSS feed" v-model="smcAuthorization"></div>
                  </div>
                  <div class="row">Explicit&nbsp;&nbsp;
                    <select v-model="smcExplicit" class="width-auto" title="Select yes for explicit feeds">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div class="row small-collapse">
                    <div class="column shrink">IHeart Show Id&nbsp;&nbsp;</div>
                    <div class="width-auto"><input type="number" title="IHeart Show Id" v-model.number="smcIHeartId"></div>
                  </div>
                </div>
                <div class="column small-collapse">
                  RSS Image
                  <div class="row">
                    <img id="rssimage" :src="rssImage" alt="">
                  </div>
                  <div class="row space-above">
                    <button class="btn btn-primary small" @click="loadShowImage()">
                      Use Show Image
                    </button>
                    <label for="squareUpload" class="btn btn-primary small">Upload Square Image</label>
                    <input type="file" id="squareUpload" class="show-for-sr" @change="uploadSquareImage($event)">
                  </div>
                  For best results in iTunes rss, image should have a resolution of 1400x1400 pixels or larger.
                </div>
              </div>
              <div class="row">Default Toggle Position&nbsp;&nbsp;
                <div class="column shrink">
                  Post&nbsp;&nbsp;
                  <select v-model="smcDefaultOnPost" class="width-auto" title="Select default post toggle position">
                    <option value='yes'>On</option>
                    <option value='no'>Off</option>
                  </select>
                </div>
                <div class="column shrink">
                  Browser&nbsp;&nbsp;
                  <select v-model="smcDefaultOnBrowser" class="width-auto" title="Select default browser toggle position">
                    <option value='yes'>On</option>
                    <option value='no'>Off</option>
                  </select>
                </div>
              </div>
              <div class="row">RSS Categories (Ctrl-Click to select multiple, or Apple-Click on a Mac)
                <select multiple size="8" class="multiselect" v-model="smcCategories">
                  <optgroup label="Arts">
                    <option value="Arts">Arts</option>
                    <option value="Arts:Fashion &amp; Beauty">Fashion & Beauty</option>
                    <option value="Arts:Food">Food</option>
                    <option value="Arts:Literature">Literature</option>
                    <option value="Arts:Performing Arts">Performing Arts</option>
                    <option value="Arts:Visual Arts">Visual Arts</option>
                  </optgroup>
                  <optgroup label="Business">
                    <option value="Business">Business</option>
                    <option value="Business:Business News">Business News</option>
                    <option value="Business:Careers">Careers</option>
                    <option value="Business:Investing">Investing</option>
                    <option value="Business:Management &amp; Marketing">Management & Marketing</option>
                    <option value="Business:Shopping">Shopping</option>
                  </optgroup>
                  <option value="Comedy">Comedy</option>
                  <optgroup label="Education">
                    <option value="Education">Education</option>
                    <option value="Education:Educational Technology">Educational Technology</option>
                    <option value="Education:Higher Education">Higher Education</option>
                    <option value="Education:K-12">K-12</option>
                    <option value="Education:Language Courses">Language Courses</option>
                    <option value="Education:Training">Training</option>
                  </optgroup>
                  <optgroup label="Games & Hobbies">
                    <option value="Games &amp; Hobbies">Games & Hobbies</option>
                    <option value="Games &amp; Hobbies:Automotive">Automotive</option>
                    <option value="Games &amp; Hobbies:Aviation">Aviation</option>
                    <option value="Games &amp; Hobbies:Hobbies">Hobbies</option>
                    <option value="Games &amp; Hobbies:Other Games">Other Games</option>
                    <option value="Games &amp; Hobbies:Video Games">Video Games</option>
                  </optgroup>
                  <optgroup label="Government & Organizations">
                    <option value="Government &amp; Organizations">Government & Organizations</option>
                    <option value="Government &amp; Organizations:Local">Local</option>
                    <option value="Government &amp; Organizations:National">National</option>
                    <option value="Government &amp; Organizations:Non-Profit">Non-Profit</option>
                    <option value="Government &amp; Organizations:Regional">Regional</option>
                  </optgroup>
                  <optgroup label="Health">
                    <option value="Health">Health</option>
                    <option value="Health:Alternative Health">Alternative Health</option>
                    <option value="Health:Fitness &amp; Nutrition">Fitness &amp; Nutrition</option>
                    <option value="Health:Self-Help">Self-Help</option>
                    <option value="Health:Sexuality">Sexuality</option>
                  </optgroup>
                  <option value="Kids &amp; Family">Kids & Family</option>
                  <option value="Music">Music</option>
                  <option value="News &amp; Politics">News & Politics</option>
                  <optgroup label="Religion & Spirituality">
                    <option value="Religion &amp; Spirituality">Religion & Spirituality</option>
                    <option value="Religion &amp; Spirituality:Buddhism">Buddhism</option>
                    <option value="Religion &amp; Spirituality:Christianity">Christianity</option>
                    <option value="Religion &amp; Spirituality:Hinduism">Hinduism</option>
                    <option value="Religion &amp; Spirituality:Islam">Islam</option>
                    <option value="Religion &amp; Spirituality:Judaism">Judaism</option>
                    <option value="Religion &amp; Spirituality:Other">Other</option>
                    <option value="Religion &amp; Spirituality:Spirituality">Spirituality</option>
                  </optgroup>
                  <optgroup label="Science & Medicine">
                    <option value="Science &amp; Medicine">Science & Medicine</option>
                    <option value="Science &amp; Medicine:Medicine">Medicine</option>
                    <option value="Science &amp; Medicine:Natural Sciences">Natural Sciences</option>
                    <option value="Science &amp; Medicine:Social Sciences">Social Sciences</option>
                  </optgroup>
                  <optgroup label="Society & Culture">
                    <option value="Society &amp; Culture">Society & Culture</option>
                    <option value="Society &amp; Culture:History">History</option>
                    <option value="Society &amp; Culture:Personal Journals">Personal Journals</option>
                    <option value="Society &amp; Culture:Philosophy">Philosophy</option>
                    <option value="Society &amp; Culture:Places &amp; Travel">Places & Travel</option>
                  </optgroup>
                  <optgroup label="Sports & Recreation">
                    <option value="Sports &amp; Recreation">Sports & Recreation</option>
                    <option value="Sports &amp; Recreation:Amateur">Amateur</option>
                    <option value="Sports &amp; Recreation:College &amp; High School">College & High School</option>
                    <option value="Sports &amp; Recreation:Professional">Professional</option>
                  </optgroup>
                  <optgroup label="Technology">
                    <option value="Technology">Technology</option>
                    <option value="Technology:Gadgets">Gadgets</option>
                    <option value="Technology:Tech News">Tech News</option>
                    <option value="Technology:Podcasting">Podcasting</option>
                    <option value="Technology:Software How-To">Software How-To</option>
                  </optgroup>
                  <option value="TV &amp; File">TV & Film</option>
                </select>
              </div>
            </label>
          </div>
          <div class="column shrink">
            <button class="edit-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
              :disabled="" v-if="smcId"
              @click="editRSSAndClear()">
              Save
            </button>
            <button class="add-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
              :disabled="" v-else
              @click="createRSSAndClear()">
              Save
            </button>
          </div>
        </div>
        <div class="manage-web-column rss-list space-above">
          <div class="row" v-for="conn in rss">
            <div class="column small-3">
              <div class="switch-title">{{conn.title}}</div>
            </div>
            <div class="column small-3">
              <a class="" title="Edit" @click="editRSS(conn.id)">Edit</a> |
              <a class="" title="Delete" @click="deleteConn(conn.id)">Delete</a>
            </div>
            <div class="column small-3 shrink">
            </div>
          </div>
        </div>
      </div>
    </modal>
    <modal :open.sync="openFacebookEditor" id="facebookEditor">
      <h4 slot="header">Edit Facebook Page Connections</h4>
      <div slot="body">
        <h5>Step 1: Authorize posting to a Facebook Fan page.</h5>
        <div class="row">
          <button class="edit-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled=""
            @click="openFacebookAuth()">
            Authorize Facebook Account
          </button>
        </div>
        <h5 class="space-above">Step 2: Get available pages from your Facebook account.
          If the page you want to post to is not in the list, log into another Facebook account and try again.</h5>
        <div class="row">
          <button class="edit-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled=""
            @click="getFacebookPages()">
            Get Facebook Pages
          </button>
        </div>
        <iframe id="facebookPages" v-bind:src="facebookSrc" v-if="facebookSrc"></iframe>
        <div class="row align-bottom" v-if='iHeartAvailable'>
          <div class="column">
            <label class="modal-text">Select an iHeart RSS feed below if posts are saved to an iHeart page.
              <div class='row'>
                <select class="width-auto" v-model="smcUrl">
                  <option value="">Not posting to an iHeart station page.</option>
                  <option v-for="conn in iHeartRss" v-bind:value="conn.iheart_show_id">{{ conn.title }}</option>
                </select>
              </div>
            </label>
          </div>
        </div>
        <div class="row">Default Toggle Position&nbsp;&nbsp;
          <div class="column shrink">
            Post&nbsp;&nbsp;
            <select v-model="smcDefaultOnPost" class="width-auto" title="Select default post toggle position">
              <option value='yes'>On</option>
              <option value='no'>Off</option>
            </select>
          </div>
          <div class="column shrink">
            Browser&nbsp;&nbsp;
            <select v-model="smcDefaultOnBrowser" class="width-auto" title="Select default browser toggle position">
              <option value='yes'>On</option>
              <option value='no'>Off</option>
            </select>
          </div>
        </div>
        <h5 class="space-above">Step 3: Once the correct page is selected click the button below to save the connection.</h5>
        <div class="row">
          <button class="edit-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled="" v-if="smcId"
            @click="editFacebookAndClear()">
            Save
          </button>
          <button class="add-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled="" v-else
            @click="createFacebookAndClear()">
            Save
          </button>
        </div>
        <div class="manage-web-column facebook-list">
          <h4 class="space-above">Current Facebook connections</h4>
          <div class="row" v-for="conn in facebook">
            <div class="columns small-3">
              <div class="switch-title">{{conn.title}}</div>
            </div>
            <div class="columns small-3">
              <a class="" title="Edit" @click="editFacebook(conn.id)">Edit</a> |
              <a class="" title="Delete" @click="deleteConn(conn.id)">Delete</a>
            </div>
            <div class="columns small-3 shrink">
            </div>
          </div>
        </div>
      </div>
    </modal>
    <modal :open.sync="openTwitterEditor" id="twitterEditor">
      <h4 slot="header">Edit Twitter Accounts</h4>
      <div slot="body">
        <div class="row">
          <button class="edit-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled=""
            @click="openTwitterAuth()">
            Authorize Twitter Account
          </button>
          <h5 class="space-above">* Log in to Twitter account and authorize posting.
            Once account is authorized click button below to finalize connection.</h5>
        </div>
        <div class="row align-bottom" v-if='iHeartAvailable'>
          <div class="column">
            <label class="modal-text">Select an iHeart RSS feed below if posts are saved to an iHeart page.
              <div class='row'>
                <select class="width-auto" v-model="smcUrl">
                  <option value="">Not posting to an iHeart station page.</option>
                  <option v-for="conn in iHeartRss" v-bind:value="conn.iheart_show_id">{{ conn.title }}</option>
                </select>
              </div>
            </label>
          </div>
        </div>
        <div class="row">Default Toggle Position&nbsp;&nbsp;
          <div class="column shrink">
            Post&nbsp;&nbsp;
            <select v-model="smcDefaultOnPost" class="width-auto" title="Select default post toggle position">
              <option value='yes'>On</option>
              <option value='no'>Off</option>
            </select>
          </div>
          <div class="column shrink">
            Browser&nbsp;&nbsp;
            <select v-model="smcDefaultOnBrowser" class="width-auto" title="Select default browser toggle position">
              <option value='yes'>On</option>
              <option value='no'>Off</option>
            </select>
          </div>
        </div>
        <div class="row space-above">
          <button class="edit-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled="" v-if="smcId"
            @click="editTwitterAndClear()">
            Save
          </button>
          <button class="add-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled="" v-else
            @click="createTwitterAndClear()">
            Save
          </button>
        </div>
        <div class="manage-web-column twitter-list">
          <h5 class="space-above">Current Twitter connections</h5>
          <div class="row align-justify" v-for="conn in twitter">
            <div class="columns">
              <div class="switch-title">{{conn.title}}</div>
            </div>
            <div class="columns">
              <a class="" title="Edit" @click="editTwitter(conn.id)">Edit</a> |
              <a class="" title="Delete" @click="deleteConn(conn.id)">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </modal>
    <modal :open.sync="openPreview">
      <h4 slot="header">Preview Audio</h4>
    </modal>
    <modal  :open.sync="openWebEmbed" id="webEmbed">
      <h4 slot="header">Generate Widget Code</h4>
      <div slot="body">
        <details>
          <summary>More Information</summary>
          <br>
          <p>Use these options to configure the Futuri widget. When you're done, copy the generated code and place it on your website.</p>
          <p>The widget will appear where you place the code. Optionally, if you require the embed script to be placed in a seperate location than the widget, you can move the script and place <code>&lt;div id="futuri-widget"&gt;&lt;/div&gt;</code> where you want the widget to appear.</p>
          <p>To reconfigure the widget: Return here, make your changes, and replace the old code on your website with the newly generated code</p>
        </details>
        <hr>
         <div class="form-group theme-select">
          <label>What theme should the player have?</label>
          <input type="radio" id="switch_light" name="theme_switch" value="light" v-model="webTheme"></input><label for="switch_light">Light</label>
          <input type="radio" id="switch_dark" name="theme_switch"  value="dark" v-model="webTheme"></input><label for="switch_dark">Dark</label>
        </div>

        <div class="form-group">
          <label for="shouldUsePlaceholder">Would you like to use the optional placeholder div on your site?</label>
          <input class="width-auto" id="shouldUsePlaceholder" type="checkbox" v-model="shouldUsePlaceholder"></input>
        </div>

        <div class="form-group">
          <label for="shouldPopUp">Would you like the player to open in a popup?</label>
          <input class="width-auto" id="shouldPopUp" type="checkbox" v-model="shouldPopUp"></input>
        </div>

        <div class="form-group">
          <label for="webLimit">How many total episodes should we show?</label>
          <input class="width-auto" id="webLimit" type="number" v-model.number="webLimit"></input>
        </div>

        <div class="form-group">
          <label for="shouldPaginate">Should we use multiple pages to show those episodes?</label>
          <input @change="switchShouldPaginate" class="width-auto" id="shouldPaginate" type="checkbox" v-model="shouldPaginate"></input>
        </div>

        <div class="form-group" v-show="shouldPaginate">
          <label for="perPage">How many episodes should we show per page?</label>
          <input class="width-auto" id="perPage" type="number" v-model.number="perPage"></input>
        </div>

        <h5>Copy this code and put it on your website:</h5>
        <code class="embed-code" id="embed-code" v-bind:class="{ 'theme-dark': webTheme === 'dark' }"><div v-if="shouldUsePlaceholder">&lt;div id="futuri-widget"&gt;&lt;/div&gt;</div>&lt;script type="text/javascript" src="//post.futurimedia.com/futuri-post-widget.js?station={{ shouldPopUp ? lCustomer.toLowerCase() : lCustomer.toUpperCase() }}&amp;zone={{ selectedZone }}<span v-if="shouldPopUp">&amp;next={{ webNext }}</span>&amp;theme={{ webTheme }}<span v-if="webLimit > 0">&amp;limit={{ webLimit }}</span><span v-if="perPage > 0">&amp;perPage={{ perPage }}</span>" async&gt;&lt;/script&gt;</code>
        <button class="copy-button" @click="copyReaction" data-clipboard-action="copy" data-clipboard-target="#embed-code">Copy To Clipboard<span class="copy-success hidden">&#10004;</span></button>
      </div>
    </modal>
    <modal :open.sync="openRssLink"  id="rssLink">
      <h5 slot="header">Link to RSS Feed</h5>

      <div slot="body">
        <p>
          <input type="checkbox" v-model="rssShowDeleted"> Include deleted playlists</input>
        </p>
        <a href='#' title="Cut and paste this link into your browser or webpage to download the feed." >https://post.futurimedia.com/{{ lCustomer }}/playlist/rss/{{ selectedRss }}.xml<span v-if="rssShowDeleted">?show_deleted=true</span></a>
      </div>
    </modal>
  </div>
</template>

<script>
  import ClipboardJS from 'clipboard';
  import Modal from '../components/Modal';
  import {
    updateSocialMediaConnections,
    setWizardStepValid,
    uploadFile,
    deletePreBumper,
    deletePostBumper,
    addSocialMediaConnection,
    editSocialMediaConnection,
    deleteSocialMediaConnection,
    setRSSImage,
  } from '../core/actions';
  import uuid from 'node-uuid';

  const CURRENT_STEP = 3;

  export default {
    name: 'wizard-post-options',
    components: {
      Modal,
    },
    data() {
      return {
        checkedSocialMediaConnections: [],
        openWebsiteEditor: false,
        openRSSEditor: false,
        openFacebookEditor: false,
        openTwitterEditor: false,
        openWebEmbed: false,
        openRssLink: false,
        openPreview: false,
        perPage: '',
        smcTitle: '',
        smcUrl: '',
        smcId: null,
        smcDescription: '',
        smcExplicit: 'no',
        smcCategories: [],
        smcAuthor: '',
        smcSubtitle: '',
        smcEmail: '',
        smcAuthorization: '',
        smcIHeartId: 0,
        smcDefaultOnBrowser: 'no',
        smcDefaultOnPost: 'yes',
        facebookSrc: null,
        twitterGuid: null,
        selectedZone: null,
        selectedRss: null,
        shouldPaginate: false,
        shouldPopUp: false,
        shouldUsePlaceholder: false,
        webNext: 'popup',
        webTheme: 'light',
        webLimit: '',
        rssShowDeleted: false,
      };
    },

    watch: {
      checkedSocialMediaConnections() {
        this.updateSocialMediaConnections(this.checkedSocialMediaConnections);
      },
    },

    methods: {
      connectionById(id) {
        return this.socialMediaConnections.find(item => item.id === id);
      },
      // TODO: Need validation implemented if needed
      checkIfValid() {
      },
      checkState(id) {
        return (this.event.social_media_connections.find(id) !== -1);
      },
      uploadPre(event) {
        this.uploadFile('pre_bumper', event.target.files[0]);
      },
      uploadPost() {
        this.uploadFile('post_bumper', event.target.files[0]);
      },
      playUrlFor(bumper) {
        if (!bumper) {
          return '';
        }
        const parts = bumper.split('/');
        const eid = parts[parts.length - 2];
        return `//${this.lCustomer}.streamon.fm/preview?event/${eid}`;
      },
      openModalFor(type, id) {
        switch (type) {
          case 'websites':
            this.smcId = null;
            this.smcTitle = '';
            if (this.iHeartAvailable) {
              this.smcUrl = this.iHeartRss[0].iheart_show_id;
            } else {
              this.smcUrl = '';
            }
            this.smcDefaultOnBrowser = 'no';
            this.smcDefaultOnPost = 'yes';
            this.openWebsiteEditor = true;
            break;

          case 'rss':
            this.smcId = null;
            this.smcTitle = '';
            this.smcUrl = '';
            this.smcDescription = '';
            this.smcExplicit = 'no';
            this.smcCategories = [];
            this.smcAuthor = '';
            this.smcSubtitle = '';
            this.smcEmail = '';
            this.smcAuthorization = '';
            this.smcIHeartId = 0;
            this.smcDefaultOnBrowser = 'no';
            this.smcDefaultOnPost = 'yes';
            this.openRSSEditor = true;
            break;

          case 'facebook':
            this.smcId = null;
            this.smcTitle = '';
            this.smcIheart = false;
            if (this.iHeartAvailable) {
              this.smcUrl = this.iHeartRss[0].iheart_show_id;
            } else {
              this.smcUrl = '';
            }
            this.smcDefaultOnBrowser = 'no';
            this.smcDefaultOnPost = 'yes';
            this.openFacebookEditor = true;
            break;

          case 'twitter':
            this.smcId = null;
            this.smcTitle = '';
            this.smcIheart = false;
            if (this.iHeartAvailable) {
              this.smcUrl = this.iHeartRss[0].iheart_show_id;
            } else {
              this.smcUrl = '';
            }
            this.smcDefaultOnBrowser = 'no';
            this.smcDefaultOnPost = 'yes';
            this.openTwitterEditor = true;
            break;

          case 'webembed':
            this.selectedZone = id;
            this.openWebEmbed = true;
            break;

          case 'rsslink':
            this.selectedRss = id;
            this.openRssLink = true;
            break;

          case 'preview':
            this.openPreview = true;
            break;

          default:
            break;
        }
      },
      createWebsiteAndClear() {
        if (this.validateTitle('webwidget')) {
          let iHeartFlag = false;
          let iHeartId = '';
          if (this.iHeartAvailable) {
            if (this.smcUrl !== '') {
              iHeartFlag = true;
              iHeartId = this.smcUrl;
            }
          }
          this.addSocialMediaConnection({ id: null,
                                          type: 'webwidget',
                                          title: this.smcTitle,
                                          url: this.smcUrl,
                                          iHeartMedia: iHeartFlag,
                                          iheart_show_id: iHeartId,
                                          default_on_browser: this.smcDefaultOnBrowser === 'yes',
                                          default_on_post: this.smcDefaultOnPost === 'yes' });
          this.smcId = null;
          this.smcTitle = '';
          this.smcUrl = '';
          this.smcDefaultOnPost = 'yes';
          this.smcDefaultOnBrowser = 'no';
        }
      },
      createRSSAndClear() {
        if (this.validateTitle('rss')) {
          const categoriesString = this.smcCategories.join(',');
          this.addSocialMediaConnection({ id: null,
                                          type: 'rss',
                                          title: this.smcTitle,
                                          url: this.smcUrl,
                                          name: this.smcTitle,
                                          description: this.smcDescription,
                                          rss_explicit: this.smcExplicit === 'yes',
                                          itunes_categories: categoriesString,
                                          author: this.smcAuthor,
                                          subtitle: this.smcSubtitle,
                                          email: this.smcEmail,
                                          default_on_browser: this.smcDefaultOnBrowser === 'yes',
                                          default_on_post: this.smcDefaultOnPost === 'yes',
                                          imageurl: this.rssImage,
                                          iheart_show_id: this.smcIHeartId === 0 ? '' :
                                            this.smcIHeartId.toString() });
          this.smcId = null;
          this.smcTitle = '';
          this.smcUrl = '';
          this.smcDescription = '';
          this.smcExplicit = 'no';
          this.smcCategories = [];
          this.smcAuthor = '';
          this.smcSubtitle = '';
          this.smcEmail = '';
          this.smcAuthotization = '';
          this.smcIHeartId = 0;
          this.smcDefaultOnPost = 'yes';
          this.smcDefaultOnBrowser = 'no';
        }
      },
      createFacebookAndClear() {
        const selectedPage = this.getSelectedPage();
        if (!selectedPage) {
          alert('You must select a facebook page to connect the account to!');
        } else {
          const id = selectedPage.id;
          const appToken = selectedPage.token;
          this.smcTitle = selectedPage.title;
          if (this.validateTitle('facebook')) {
            const data = { id: null,
                       type: 'facebook',
                       title: this.smcTitle,
                       iHeartMedia: this.smcUrl !== '',
                       url: this.smcUrl,
                       app_id: id,
                       token: appToken,
                       iheart_show_id: this.smcUrl,
                       default_on_browser: this.smcDefaultOnBrowser === 'yes',
                       default_on_post: this.smcDefaultOnPost === 'yes' };
            this.addSocialMediaConnection(data);
            this.smcId = null;
            this.smcTitle = '';
            this.smcDefaultOnPost = 'yes';
            this.smcDefaultOnBrowser = 'no';
          }
        }
      },
      createTwitterAndClear() {
        if (this.twitterGuid) {
          const data = { id: null,
                     type: 'twitter',
                     iHeartMedia: this.smcUrl !== '',
                     url: this.smcUrl,
                     name: this.twitterGuid,
                     iheart_show_id: this.smcUrl,
                     default_on_browser: this.smcDefaultOnBrowser === 'yes',
                     default_on_post: this.smcDefaultOnPost === 'yes' };
          this.addSocialMediaConnection(data);
          this.smcId = null;
          this.smcTitle = '';
          this.twitterGuid = null;
          this.smcDefaultOnPost = 'yes';
          this.smcDefaultOnBrowser = 'no';
        } else {
          alert('You must authorize access to a twitter account before saving!');
        }
      },
      editWebsite(id) {
        const conn = this.connectionById(id);
        if (conn) {
          this.smcId = conn.id;
          this.smcTitle = conn.title;
          this.smcUrl = conn.url;
        }
        if (conn.default_on_post) {
          this.smcDefaultOnPost = 'yes';
        } else {
          this.smcDefaultOnPost = 'no';
        }
        if (conn.default_on_browser) {
          this.smcDefaultOnBrowser = 'yes';
        } else {
          this.smcDefaultOnBrowser = 'no';
        }
      },
      editRSS(id) {
        const conn = this.connectionById(id);
        if (conn) {
          this.smcId = conn.id;
          this.smcTitle = conn.title;
          this.smcDescription = conn.description;
          this.smcCategories = conn.itunes_categories.split(',');
          this.smcAuthor = conn.author;
          this.smcSubtitle = conn.subtitle;
          this.smcEmail = conn.email;
          this.smcAuthorization = conn.itunes_auth;
          this.smcIHeartId = isNaN(conn.iheart_show_id) ? 0 : Number(conn.iheart_show_id);
          if (conn.rss_explicit) {
            this.smcExplicit = 'yes';
          } else {
            this.smcExplicit = 'no';
          }
          if (conn.default_on_post) {
            this.smcDefaultOnPost = 'yes';
          } else {
            this.smcDefaultOnPost = 'no';
          }
          this.setRSSImage(conn.imageurl);
          if (conn.default_on_browser) {
            this.smcDefaultOnBrowser = 'yes';
          } else {
            this.smcDefaultOnBrowser = 'no';
          }
        }
      },
      editFacebook(id) {
        const conn = this.connectionById(id);
        if (conn) {
          this.smcId = conn.id;
          this.smcTitle = conn.title;
          this.smcUrl = conn.url;
        }
        if (conn.default_on_post) {
          this.smcDefaultOnPost = 'yes';
        } else {
          this.smcDefaultOnPost = 'no';
        }
        if (conn.default_on_browser) {
          this.smcDefaultOnBrowser = 'yes';
        } else {
          this.smcDefaultOnBrowser = 'no';
        }
      },
      editTwitter(id) {
        const conn = this.connectionById(id);
        if (conn) {
          this.smcId = conn.id;
          this.smcTitle = conn.title;
          this.smcUrl = conn.url;
        }
        if (conn.default_on_post) {
          this.smcDefaultOnPost = 'yes';
        } else {
          this.smcDefaultOnPost = 'no';
        }
        if (conn.default_on_browser) {
          this.smcDefaultOnBrowser = 'yes';
        } else {
          this.smcDefaultOnBrowser = 'no';
        }
      },
      editWebsiteAndClear() {
        if (this.validateTitle('webwidget')) {
          let iHeartFlag = false;
          let iHeartId = '';
          if (this.iHeartAvailable) {
            if (this.smcUrl !== '') {
              iHeartFlag = true;
              iHeartId = this.smcUrl;
            }
          }
          this.editSocialMediaConnection({ id: this.smcId,
                                           type: 'webwidget',
                                           title: this.smcTitle,
                                           url: this.smcUrl,
                                           iHeartMedia: iHeartFlag,
                                           iheart_show_id: iHeartId,
                                           default_on_post: this.smcDefaultOnPost === 'yes',
                                           default_on_browser: this.smcDefaultOnBrowser === 'yes' });
          this.smcId = null;
          this.smcTitle = '';
          this.smcUrl = '';
          this.smcDefaultOnPost = 'yes';
          this.smcDefaultOnBrowser = 'no';
        }
      },
      editRSSAndClear() {
        if (this.validateTitle('rss')) {
          const categoriesString = this.smcCategories.join(',');
          this.editSocialMediaConnection({ id: this.smcId,
                                           type: 'rss',
                                           title: this.smcTitle,
                                           name: this.smcTitle,
                                           description: this.smcDescription,
                                           rss_explicit: this.smcExplicit === 'yes',
                                           itunes_categories: categoriesString,
                                           author: this.smcAuthor,
                                           subtitle: this.smcSubtitle,
                                           email: this.smcEmail,
                                           itunes_auth: this.smcAuthorization,
                                           default_on_post: this.smcDefaultOnPost === 'yes',
                                           default_on_browser: this.smcDefaultOnBrowser === 'yes',
                                           imageurl: this.rssImage,
                                           iheart_show_id: this.smcIHeartId === 0 ? '' :
                                             this.smcIHeartId.toString() });
          this.smcId = null;
          this.smcTitle = '';
          this.smcDescription = '';
          this.smcExplicit = 'no';
          this.smcCategories = [];
          this.smcAuthor = '';
          this.smcSubtitle = '';
          this.smcEmail = '';
          this.smcAuthorization = '';
          this.smcIHeartId = 0;
          this.smcDefaultOnPost = 'yes';
          this.smcDefaultOnBrowser = 'no';
        }
      },
      editFacebookAndClear() {
        const selectedPage = this.getSelectedPage();
        if (selectedPage) {
          const id = selectedPage.id;
          const appToken = selectedPage.token;
          this.smcTitle = selectedPage.title;
          if (this.validateTitle('facebook')) {
            const data = { id: this.smcId,
                       type: 'facebook',
                       title: this.smcTitle,
                       iHeartMedia: this.smcUrl !== '',
                       url: this.smcUrl,
                       app_id: id,
                       token: appToken,
                       iheart_show_id: this.smcUrl,
                       default_on_post: this.smcDefaultOnPost === 'yes',
                       default_on_browser: this.smcDefaultOnBrowser === 'yes' };
            this.editSocialMediaConnection(data);
            this.smcId = null;
            this.smcTitle = '';
            this.smcDefaultOnPost = 'yes';
            this.smcDefaultOnBrowser = 'no';
          }
        } else {
          // save without seting app_id and app_secret and title
          const data = { id: this.smcId,
                     type: 'facebook',
                     iHeartMedia: this.smcUrl !== '',
                     url: this.smcUrl,
                     iheart_show_id: this.smcUrl,
                     default_on_post: this.smcDefaultOnPost === 'yes',
                     default_on_browser: this.smcDefaultOnBrowser === 'yes' };
          this.editSocialMediaConnection(data);
          this.smcId = null;
          this.smcTitle = '';
          this.smcDefaultOnPost = 'yes';
          this.smcDefaultOnBrowser = 'no';
        }
      },
      editTwitterAndClear() {
        const data = { id: this.smcId,
                       type: 'twitter',
                       iHeartMedia: this.smcUrl !== '',
                       url: this.smcUrl,
                       iheart_show_id: this.smcUrl,
                       default_on_post: this.smcDefaultOnPost === 'yes',
                       default_on_browser: this.smcDefaultOnBrowser === 'yes' };
        if (this.twitterGuid) {
          data.name = this.twitterGuid;
        }
        this.editSocialMediaConnection(data);
        this.smcId = null;
        this.smcTitle = '';
        this.twitterGuid = null;
        this.smcDefaultOnPost = 'yes';
        this.smcDefaultOnBrowser = 'no';
      },
      deleteConn(id) {
        const conn = this.connectionById(id);
        if (conn) {
          this.deleteSocialMediaConnection(conn);
        }
      },
      copyReaction(event) {
        const successElement = event.target.querySelector('.copy-success');

        successElement.classList.remove('hidden');

        setTimeout(() => {
          successElement.classList.add('hidden');
        }, 1000);
      },
      switchShouldPaginate() {
        this.perPage = 0;
      },
      validateTitle(type) {
        if (this.smcTitle === '') {
          alert('Title field must not be blank, enter a title and try again!');
          return false;
        }
        for (const conn of this.socialMediaConnections) {
          if (conn.title === this.smcTitle && conn.tyoe === type && conn.id !== this.smcId) {
            alert('Connection already exists with that title, please modify and try again!');
            return false;
          }
        }
        return true;
      },
      getSelectedPage() {
        const iframe = document.getElementById('facebookPages');
        if (iframe) {
          const iframedoc = iframe.contentWindow ?
                            iframe.contentWindow.document : iframe.contentDocument;
          const list = iframedoc.getElementsByTagName('option');
          for (const page of list) {
            if (page.selected) {
              return ({ id: page.id, token: page.value, title: page.text });
            }
          }
        }
        return null;
      },
      getFacebookPages() {
        //eslint-disable-next-line
        this.facebookSrc = `https://post.futurimedia.com/get_facebook_pages/?station=${this.lCustomer}`;
      },
      openFacebookAuth() {
        //eslint-disable-next-line
        const url = `https://www.facebook.com/dialog/oauth?client_id=195398541189099&auth_type=rerequest&redirect_uri=https%3A%2F%2Fpost.futurimedia.com%2Fset_facebook_code%2F&state=${this.lCustomer}&scope=email%2Cmanage_pages%2Cpublish_pages%2Cpages_show_list`
        window.open(url, '_blank');
      },
      openTwitterAuth() {
        //eslint-disable-next-line
        this.twitterGuid = uuid.v1();
        const guid = this.twitterGuid;
        //eslint-disable-next-line
        window.open(`${window.location.protocol}//${window.location.host}/${this.lCustomer}/request_twitter_code/?guid=${guid}`, '_blank');
      },
      uploadSquareImage(e) {
        const inFile = e.target.files[0];
        this.uploadFile('rss_image', inFile);
        document.getElementById('squareUpload').value = null;
      },
      loadShowImage() {
        if (this.event.square_image && this.event.square_image !== '') {
          this.setRSSImage(this.event.square_image);
        }
      },
    },

    attached() {
      const ids = this.event.social_media_connections.map((c) => c.id);
      this.checkedSocialMediaConnections = ids;
    },

    ready() {
      // eslint-disable-next-line
      new ClipboardJS('.copy-button');
      this.setWizardStepValid(CURRENT_STEP);
    },
    vuex: {
      getters: {
        currentStep: (state) => state.wizardSteps.steps[CURRENT_STEP],
        socialMediaConnections: (state) => state.socialMediaConnections,
        event: (state) => state.wizardEvent,
        customer: (state) => state.settings.station_name,
        loadedRSSImage: (state) => state.loadedRSSImage,
      },
      actions: {
        updateSocialMediaConnections,
        setWizardStepValid,
        uploadFile,
        deletePreBumper,
        deletePostBumper,
        addSocialMediaConnection,
        editSocialMediaConnection,
        deleteSocialMediaConnection,
        setRSSImage,
      },
    },
    computed: {
      facebook() {
        return this.socialMediaConnections.filter((item) => item.type === 'facebook');
      },
      twitter() {
        return this.socialMediaConnections.filter((item) => item.type === 'twitter');
      },
      rss() {
        return this.socialMediaConnections.filter((item) => item.type === 'rss');
      },
      iHeartRss() {
        return this.socialMediaConnections.filter((item) => item.type === 'rss'
                                                   && item.iheart_show_id !== '');
      },
      iHeartAvailable() {
        return this.iHeartRss.length > 0;
      },
      webwidget() {
        return this.socialMediaConnections.filter((item) => item.type === 'webwidget');
      },
      prePlayUrl() {
        return this.playUrlFor(this.event.pre_bumper);
      },
      postPlayUrl() {
        return this.playUrlFor(this.event.post_bumper);
      },
      lCustomer() {
        if (this.customer) {
          return this.customer.toLowerCase();
        }
        return '';
      },
      rssImage() {
        return this.loadedRSSImage;
      },
    },
  };
</script>

<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .post-options {
    list-style: none;
    margin: 0 0 1rem;
  }

  .post-option {
    margin-bottom: 1rem;
  }

  .post-option-title {
    font-weight: 700;
    font-size: rem-calc(18);
    line-height: 1.4;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
    margin: 0;
    color: $white;
  }

  .post-option-content {
    transition: all 0.25s;
    overflow: hidden;
    opacity: 1;
  }

  .modal-text {
    color: $black;
  }

  .web-list {
    margin: 10px 0 0 0;
  }

  #facebookEditor {
    .modal-container {
      width: 90%;
      max-height: 90%;
      overflow-y: auto;
    }
    iframe {
      width: 100%;
    }
  }

  #rssEditor {
    #rssimage {
      display: block;
      max-width:300px;
      max-height:300px;
      width: auto;
      height: auto;
    }
    .modal-container {
      width: 75%;
      min-width: 600px;
      max-height: 90%;
      overflow-y: auto;
    }
    select {
      height: 30px;
      padding: 0 20px 0 5px;
    }
    select.multiselect {
      height: auto;
    }
    .modal-footer {
      display: none;
    }
    .row {
      margin-right: 20px;
    }
  }

  #twitterEditor {
    .modal-container {
      width: 60%;
      min-width: 400px;
      max-height: 90%;
      overflow-y: auto;
    }
  }

  #webwidgetEditor {
    .modal-container {
      width: 60%;
      min-width: 400px;
      max-height: 90%;
      overflow-y: auto;
    }
  }

  #rssLink {
    .modal-container {
      width: 500px;
    }
    .modal-footer {
      display: none;
    }
  }

  #webEmbed {
    .modal-container {
      max-height: 65vh;
      overflow-y: scroll;
      width: 600px;
    }
  }

  .space-above {
    margin-top: 20px;
  }

  .width-auto {
    width: auto;
  }

  .small-grey {
    font-size: 10px;
    color: $just-off-white;
  }

  .small-link {
    margin-left: 5px;
    font-size: 10px;
  }
</style>
<template>
  <div class="wizard-post-options">
    <div class="row">
      <div class="column">
        <ul class="post-options">
        <label class="container" style="border:2px solid red;>
      i class="fab fa-facebook" style="position: relative;
top: 23px;
left: 18px;"></i>
        <input type="checkbox" checked="checked">
        <span>Facebook</span>
        <span class="checkmark" style="></span>
        </label>

        <label class="container">
        <i class="fab fa-youtube"></i>
        <input type="checkbox">
        <span>Youtube</span>
        <span class="checkmark"></span>
        </label>

        <label class="container">
        <i class="fas fa-heart"></i>
        <input type="checkbox">
        <span>iHeartRadio </span>
        <span class="checkmark"></span>
        </label>

        <label class="container">
        <i class="fab fa-twitter"></i>
        <input type="checkbox">
        <span class="checkmark"></span>
        </label>
        
        <!--  <li class="post-option">
            <div class="row">
              <div class="column">
              
                <h3 class="post-option-title">
                <input type ="checkbox"/>
                  <i class="fab fa-facebook-f" style="position: relative;
top: 23px;
left: 18px;"></i>
                 <span> Facebook</span>
                </h3>
              </div>
              <div class="column shrink">
               
              </div>
            </div>
            <div class="post-option-content">
              <div class="row">
                <div class="column">
                  <!--<div class="switch">
                   <input type="radio">Video + Text </input>

                  </div> -->
                  <div class="radio-container"> 
        
        
    </div> 
                </div>
              </div>
            </div>
          </li>-->

 <!--<li class="post-option">
            <div class="row">
              <div class="column">
                <h3 class="post-option-title">
                <i class="fab fa-youtube"></i>
                  Youtube
                </h3>
              </div>
              <div class="column shrink">
              </div>
            </div>
            <div class="post-option-content">
              <div class="row"">
                <div class="column">
                   <div class="radio-container1"> 
         <input name="Audio" type="radio" value="Audio" checked="checked"> 
        Audio 
        <input name="Video+Text" type="radio" value="Video+Text"> 
        Video + Text 
        
    </div> 
                </div>
              </div>
            </div>
          </li>


<li class="post-option">
            <div class="row">
              <div class="column">
                <h3 class="post-option-title">
                <i class="fas fa-heart"></i>
                  iHeartRadio
                </h3>
              </div>
              <div class="column shrink">
              </div>
            </div>
            <div class="post-option-content">
              <div class="row">
                <div class="column">
                   <div class="radio-container2"> 
        
        
    </div> 
                </div>
              </div>
            </div>
          </li>


        
         
        </ul>
      </div>
      <div class="column">
        <ul class="post-options">
          <li class="post-option">
            <div class="row">
              <div class="column">
                <h3 class="post-option-title">
                <i class="fab fa-twitter"></i>
                  Twitter
                </h3>
              </div>
              <div class="column shrink">
              </div>
            </div>
            <div class="post-option-content">
              <div class="row">
                <div class="column">
                   <div class="radio-container3"> 
         <input name="Audio" type="radio" value="Audio" checked="checked"> 
        Audio 
  
                  </div>
                </div>
              </div>
            </div><li class="post-option">
            <div class="row">
              <div class="column">
                <h3 class="post-option-title">
                <i class="fab fa-itunes"></i>
                  iTunes
                </h3>
              </div>
              <div class="column shrink">
              </div>
            </div>
            <div class="post-option-content">
              
            </div>
          </li>
          <li class="post-option">
            <div class="row">
              <div class="column">
                <h3 class="post-option-title">
                <i class="far fa-globe"></i>
                  Station Website
                </h3>
              </div>
              <div class="column shrink">
              </div>
            </div>
            <div class="post-option-content">
              <div class="row">
                <div class="column">
                  <div class="switch">
                    
                  </div>
                </div>
              </div>
            </div>
          </li>


        </ul>
      </div>
    </div>
    <modal :open.sync="openWebsiteEditor" id="webwidgetEditor">
      <h4 slot="header">Edit Webpages</h4>
      <div slot="body">
        <div class="row align-bottom">
          <div class="column">
            <label class="modal-text">Create New Webpage
              <input type="text" placeholder="Enter name" title="Friendly name to remember it by" v-model="smcTitle">
              <div v-if='iHeartAvailable' class="column">
                <div class='row'>Select an iHeart RSS feed below if posts are saved to an iHeart page.</div>
                <div class='row'>
                  <select class="width-auto" v-model="smcUrl">
                    <option value="">Not posting to an iHeart station page.</option>
                    <option v-for="conn in iHeartRss" v-bind:value="conn.iheart_show_id">{{ conn.title }}</option>
                  </select>
                </div>
              </div>
              <input v-else type="text" placeholder="Site url" title="Enter full url of destination webpage" v-model="smcUrl">
              <div class="row">Default Toggle Position&nbsp;&nbsp;
                <div class="column shrink">
                  Post&nbsp;&nbsp;
                  <select v-model="smcDefaultOnPost" class="width-auto" title="Select default post toggle position">
                    <option value='yes'>On</option>
                    <option value='no'>Off</option>
                  </select>
                </div>
                <div class="column shrink">
                  Browser&nbsp;&nbsp;
                  <select v-model="smcDefaultOnBrowser" class="width-auto" title="Select default browser toggle position">
                    <option value='yes'>On</option>
                    <option value='no'>Off</option>
                  </select>
                </div>
              </div>
            </label>
          </div>
          <div class="column shrink">
            <button class="edit-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
              :disabled="" v-if="smcId"
              @click="editWebsiteAndClear()">
              Save
            </button>
            <button class="add-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
              :disabled="" v-else
              @click="createWebsiteAndClear()">
              Save
            </button>
          </div>
        </div>
        <div class="manage-web-column web-list space-above">
          <div class="row" v-for="conn in webwidget">
            <div class="column small-3">
              <div class="switch-title">{{conn.title}}</div>
            </div>
            <div class="column small-3">
              <a class="" title="Edit" @click="editWebsite(conn.id)">Edit</a> |
              <a class="" title="Delete" @click="deleteConn(conn.id)">Delete</a>
            </div>
            <div class="column small-3 shrink">
            </div>
          </div>
        </div>
      </div>
    </modal>
    <modal :open.sync="openRSSEditor" id="rssEditor">
      <h4 slot="header">Edit RSS Feeds</h4>
      <div slot="body">
        <div class="row align-bottom">
          <div class="column">
            <label class="modal-text">Create New RSS Feed
              <input type="text" placeholder="Enter display name" title="Display name for RSS feed" v-model="smcTitle">
              <textarea rows="2" placeholder="Enter description" title="Description given as part of RSS feed" v-model="smcDescription"></textarea>
              <div class="row">
                <div class="column">
                  <div class="row small-collapse">
                    <div class="column shrink">Author&nbsp;&nbsp;</div>
                    <div class="column"><input type="text" placeholder="Enter author name" title="Display author for RSS feed" v-model="smcAuthor"></div>
                  </div>
                  <div class="row small-collapse">
                    <div class="column shrink">Subtitle&nbsp;&nbsp;</div>
                    <div class="column"><input type="text" placeholder="Enter subtitle" title="Subtitle for RSS feed" v-model="smcSubtitle"></div>
                  </div>
                  <div class="row small-collapse">
                    <div class="column shrink">Email&nbsp;&nbsp;</div>
                    <div class="column"><input type="text" placeholder="Enter email" title="Email for RSS feed" v-model="smcEmail"></div>
                  </div>
                  <div class="row small-collapse">
                    <div class="column shrink">Podcast Connect Authorization&nbsp;&nbsp;</div>
                    <div class="column"><input type="text" placeholder="Enter auth code" title="Podcast Connect Auth for RSS feed" v-model="smcAuthorization"></div>
                  </div>
                  <div class="row">Explicit&nbsp;&nbsp;
                    <select v-model="smcExplicit" class="width-auto" title="Select yes for explicit feeds">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div class="row small-collapse">
                    <div class="column shrink">IHeart Show Id&nbsp;&nbsp;</div>
                    <div class="width-auto"><input type="number" title="IHeart Show Id" v-model.number="smcIHeartId"></div>
                  </div>
                </div>
                <div class="column small-collapse">
                  RSS Image
                  <div class="row">
                    <img id="rssimage" :src="rssImage" alt="">
                  </div>
                  <div class="row space-above">
                    <button class="btn btn-primary small" @click="loadShowImage()">
                      Use Show Image
                    </button>
                    <label for="squareUpload" class="btn btn-primary small">Upload Square Image</label>
                    <input type="file" id="squareUpload" class="show-for-sr" @change="uploadSquareImage($event)">
                  </div>
                  For best results in iTunes rss, image should have a resolution of 1400x1400 pixels or larger.
                </div>
              </div>
              <div class="row">Default Toggle Position&nbsp;&nbsp;
                <div class="column shrink">
                  Post&nbsp;&nbsp;
                  <select v-model="smcDefaultOnPost" class="width-auto" title="Select default post toggle position">
                    <option value='yes'>On</option>
                    <option value='no'>Off</option>
                  </select>
                </div>
                <div class="column shrink">
                  Browser&nbsp;&nbsp;
                  <select v-model="smcDefaultOnBrowser" class="width-auto" title="Select default browser toggle position">
                    <option value='yes'>On</option>
                    <option value='no'>Off</option>
                  </select>
                </div>
              </div>
              <div class="row">RSS Categories (Ctrl-Click to select multiple, or Apple-Click on a Mac)
                <select multiple size="8" class="multiselect" v-model="smcCategories">
                  <optgroup label="Arts">
                    <option value="Arts">Arts</option>
                    <option value="Arts:Fashion &amp; Beauty">Fashion & Beauty</option>
                    <option value="Arts:Food">Food</option>
                    <option value="Arts:Literature">Literature</option>
                    <option value="Arts:Performing Arts">Performing Arts</option>
                    <option value="Arts:Visual Arts">Visual Arts</option>
                  </optgroup>
                  <optgroup label="Business">
                    <option value="Business">Business</option>
                    <option value="Business:Business News">Business News</option>
                    <option value="Business:Careers">Careers</option>
                    <option value="Business:Investing">Investing</option>
                    <option value="Business:Management &amp; Marketing">Management & Marketing</option>
                    <option value="Business:Shopping">Shopping</option>
                  </optgroup>
                  <option value="Comedy">Comedy</option>
                  <optgroup label="Education">
                    <option value="Education">Education</option>
                    <option value="Education:Educational Technology">Educational Technology</option>
                    <option value="Education:Higher Education">Higher Education</option>
                    <option value="Education:K-12">K-12</option>
                    <option value="Education:Language Courses">Language Courses</option>
                    <option value="Education:Training">Training</option>
                  </optgroup>
                  <optgroup label="Games & Hobbies">
                    <option value="Games &amp; Hobbies">Games & Hobbies</option>
                    <option value="Games &amp; Hobbies:Automotive">Automotive</option>
                    <option value="Games &amp; Hobbies:Aviation">Aviation</option>
                    <option value="Games &amp; Hobbies:Hobbies">Hobbies</option>
                    <option value="Games &amp; Hobbies:Other Games">Other Games</option>
                    <option value="Games &amp; Hobbies:Video Games">Video Games</option>
                  </optgroup>
                  <optgroup label="Government & Organizations">
                    <option value="Government &amp; Organizations">Government & Organizations</option>
                    <option value="Government &amp; Organizations:Local">Local</option>
                    <option value="Government &amp; Organizations:National">National</option>
                    <option value="Government &amp; Organizations:Non-Profit">Non-Profit</option>
                    <option value="Government &amp; Organizations:Regional">Regional</option>
                  </optgroup>
                  <optgroup label="Health">
                    <option value="Health">Health</option>
                    <option value="Health:Alternative Health">Alternative Health</option>
                    <option value="Health:Fitness &amp; Nutrition">Fitness &amp; Nutrition</option>
                    <option value="Health:Self-Help">Self-Help</option>
                    <option value="Health:Sexuality">Sexuality</option>
                  </optgroup>
                  <option value="Kids &amp; Family">Kids & Family</option>
                  <option value="Music">Music</option>
                  <option value="News &amp; Politics">News & Politics</option>
                  <optgroup label="Religion & Spirituality">
                    <option value="Religion &amp; Spirituality">Religion & Spirituality</option>
                    <option value="Religion &amp; Spirituality:Buddhism">Buddhism</option>
                    <option value="Religion &amp; Spirituality:Christianity">Christianity</option>
                    <option value="Religion &amp; Spirituality:Hinduism">Hinduism</option>
                    <option value="Religion &amp; Spirituality:Islam">Islam</option>
                    <option value="Religion &amp; Spirituality:Judaism">Judaism</option>
                    <option value="Religion &amp; Spirituality:Other">Other</option>
                    <option value="Religion &amp; Spirituality:Spirituality">Spirituality</option>
                  </optgroup>
                  <optgroup label="Science & Medicine">
                    <option value="Science &amp; Medicine">Science & Medicine</option>
                    <option value="Science &amp; Medicine:Medicine">Medicine</option>
                    <option value="Science &amp; Medicine:Natural Sciences">Natural Sciences</option>
                    <option value="Science &amp; Medicine:Social Sciences">Social Sciences</option>
                  </optgroup>
                  <optgroup label="Society & Culture">
                    <option value="Society &amp; Culture">Society & Culture</option>
                    <option value="Society &amp; Culture:History">History</option>
                    <option value="Society &amp; Culture:Personal Journals">Personal Journals</option>
                    <option value="Society &amp; Culture:Philosophy">Philosophy</option>
                    <option value="Society &amp; Culture:Places &amp; Travel">Places & Travel</option>
                  </optgroup>
                  <optgroup label="Sports & Recreation">
                    <option value="Sports &amp; Recreation">Sports & Recreation</option>
                    <option value="Sports &amp; Recreation:Amateur">Amateur</option>
                    <option value="Sports &amp; Recreation:College &amp; High School">College & High School</option>
                    <option value="Sports &amp; Recreation:Professional">Professional</option>
                  </optgroup>
                  <optgroup label="Technology">
                    <option value="Technology">Technology</option>
                    <option value="Technology:Gadgets">Gadgets</option>
                    <option value="Technology:Tech News">Tech News</option>
                    <option value="Technology:Podcasting">Podcasting</option>
                    <option value="Technology:Software How-To">Software How-To</option>
                  </optgroup>
                  <option value="TV &amp; File">TV & Film</option>
                </select>
              </div>
            </label>
          </div>
          <div class="column shrink">
            <button class="edit-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
              :disabled="" v-if="smcId"
              @click="editRSSAndClear()">
              Save
            </button>
            <button class="add-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
              :disabled="" v-else
              @click="createRSSAndClear()">
              Save
            </button>
          </div>
        </div>
        <div class="manage-web-column rss-list space-above">
          <div class="row" v-for="conn in rss">
            <div class="column small-3">
              <div class="switch-title">{{conn.title}}</div>
            </div>
            <div class="column small-3">
              <a class="" title="Edit" @click="editRSS(conn.id)">Edit</a> |
              <a class="" title="Delete" @click="deleteConn(conn.id)">Delete</a>
            </div>
            <div class="column small-3 shrink">
            </div>
          </div>
        </div>
      </div>
    </modal>
    <modal :open.sync="openFacebookEditor" id="facebookEditor">
      <h4 slot="header">Edit Facebook Page Connections</h4>
      <div slot="body">
        <h5>Step 1: Authorize posting to a Facebook Fan page.</h5>
        <div class="row">
          <button class="edit-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled=""
            @click="openFacebookAuth()">
            Authorize Facebook Account
          </button>
        </div>
        <h5 class="space-above">Step 2: Get available pages from your Facebook account.
          If the page you want to post to is not in the list, log into another Facebook account and try again.</h5>
        <div class="row">
          <button class="edit-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled=""
            @click="getFacebookPages()">
            Get Facebook Pages
          </button>
        </div>
        <iframe id="facebookPages" v-bind:src="facebookSrc" v-if="facebookSrc"></iframe>
        <div class="row align-bottom" v-if='iHeartAvailable'>
          <div class="column">
            <label class="modal-text">Select an iHeart RSS feed below if posts are saved to an iHeart page.
              <div class='row'>
                <select class="width-auto" v-model="smcUrl">
                  <option value="">Not posting to an iHeart station page.</option>
                  <option v-for="conn in iHeartRss" v-bind:value="conn.iheart_show_id">{{ conn.title }}</option>
                </select>
              </div>
            </label>
          </div>
        </div>
        <div class="row">Default Toggle Position&nbsp;&nbsp;
          <div class="column shrink">
            Post&nbsp;&nbsp;
            <select v-model="smcDefaultOnPost" class="width-auto" title="Select default post toggle position">
              <option value='yes'>On</option>
              <option value='no'>Off</option>
            </select>
          </div>
          <div class="column shrink">
            Browser&nbsp;&nbsp;
            <select v-model="smcDefaultOnBrowser" class="width-auto" title="Select default browser toggle position">
              <option value='yes'>On</option>
              <option value='no'>Off</option>
            </select>
          </div>
        </div>
        <h5 class="space-above">Step 3: Once the correct page is selected click the button below to save the connection.</h5>
        <div class="row">
          <button class="edit-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled="" v-if="smcId"
            @click="editFacebookAndClear()">
            Save
          </button>
          <button class="add-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled="" v-else
            @click="createFacebookAndClear()">
            Save
          </button>
        </div>
        <div class="manage-web-column facebook-list">
          <h4 class="space-above">Current Facebook connections</h4>
          <div class="row" v-for="conn in facebook">
            <div class="columns small-3">
              <div class="switch-title">{{conn.title}}</div>
            </div>
            <div class="columns small-3">
              <a class="" title="Edit" @click="editFacebook(conn.id)">Edit</a> |
              <a class="" title="Delete" @click="deleteConn(conn.id)">Delete</a>
            </div>
            <div class="columns small-3 shrink">
            </div>
          </div>
        </div>
      </div>
    </modal>
    <modal :open.sync="openTwitterEditor" id="twitterEditor">
      <h4 slot="header">Edit Twitter Accounts</h4>
      <div slot="body">
        <div class="row">
          <button class="edit-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled=""
            @click="openTwitterAuth()">
            Authorize Twitter Account
          </button>
          <h5 class="space-above">* Log in to Twitter account and authorize posting.
            Once account is authorized click button below to finalize connection.</h5>
        </div>
        <div class="row align-bottom" v-if='iHeartAvailable'>
          <div class="column">
            <label class="modal-text">Select an iHeart RSS feed below if posts are saved to an iHeart page.
              <div class='row'>
                <select class="width-auto" v-model="smcUrl">
                  <option value="">Not posting to an iHeart station page.</option>
                  <option v-for="conn in iHeartRss" v-bind:value="conn.iheart_show_id">{{ conn.title }}</option>
                </select>
              </div>
            </label>
          </div>
        </div>
        <div class="row">Default Toggle Position&nbsp;&nbsp;
          <div class="column shrink">
            Post&nbsp;&nbsp;
            <select v-model="smcDefaultOnPost" class="width-auto" title="Select default post toggle position">
              <option value='yes'>On</option>
              <option value='no'>Off</option>
            </select>
          </div>
          <div class="column shrink">
            Browser&nbsp;&nbsp;
            <select v-model="smcDefaultOnBrowser" class="width-auto" title="Select default browser toggle position">
              <option value='yes'>On</option>
              <option value='no'>Off</option>
            </select>
          </div>
        </div>
        <div class="row space-above">
          <button class="edit-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled="" v-if="smcId"
            @click="editTwitterAndClear()">
            Save
          </button>
          <button class="add-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled="" v-else
            @click="createTwitterAndClear()">
            Save
          </button>
        </div>
        <div class="manage-web-column twitter-list">
          <h5 class="space-above">Current Twitter connections</h5>
          <div class="row align-justify" v-for="conn in twitter">
            <div class="columns">
              <div class="switch-title">{{conn.title}}</div>
            </div>
            <div class="columns">
              <a class="" title="Edit" @click="editTwitter(conn.id)">Edit</a> |
              <a class="" title="Delete" @click="deleteConn(conn.id)">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </modal>
    <modal :open.sync="openPreview">
      <h4 slot="header">Preview Audio</h4>
    </modal>
    <modal  :open.sync="openWebEmbed" id="webEmbed">
      <h4 slot="header">Generate Widget Code</h4>
      <div slot="body">
        <details>
          <summary>More Information</summary>
          <br>
          <p>Use these options to configure the Futuri widget. When you're done, copy the generated code and place it on your website.</p>
          <p>The widget will appear where you place the code. Optionally, if you require the embed script to be placed in a seperate location than the widget, you can move the script and place <code>&lt;div id="futuri-widget"&gt;&lt;/div&gt;</code> where you want the widget to appear.</p>
          <p>To reconfigure the widget: Return here, make your changes, and replace the old code on your website with the newly generated code</p>
        </details>
        <hr>
         <div class="form-group theme-select">
          <label>What theme should the player have?</label>
          <input type="radio" id="switch_light" name="theme_switch" value="light" v-model="webTheme"></input><label for="switch_light">Light</label>
          <input type="radio" id="switch_dark" name="theme_switch"  value="dark" v-model="webTheme"></input><label for="switch_dark">Dark</label>
        </div>

        <div class="form-group">
          <label for="shouldUsePlaceholder">Would you like to use the optional placeholder div on your site?</label>
          <input class="width-auto" id="shouldUsePlaceholder" type="checkbox" v-model="shouldUsePlaceholder"></input>
        </div>

        <div class="form-group">
          <label for="shouldPopUp">Would you like the player to open in a popup?</label>
          <input class="width-auto" id="shouldPopUp" type="checkbox" v-model="shouldPopUp"></input>
        </div>

        <div class="form-group">
          <label for="webLimit">How many total episodes should we show?</label>
          <input class="width-auto" id="webLimit" type="number" v-model.number="webLimit"></input>
        </div>

        <div class="form-group">
          <label for="shouldPaginate">Should we use multiple pages to show those episodes?</label>
          <input @change="switchShouldPaginate" class="width-auto" id="shouldPaginate" type="checkbox" v-model="shouldPaginate"></input>
        </div>

        <div class="form-group" v-show="shouldPaginate">
          <label for="perPage">How many episodes should we show per page?</label>
          <input class="width-auto" id="perPage" type="number" v-model.number="perPage"></input>
        </div>

        <h5>Copy this code and put it on your website:</h5>
        <code class="embed-code" id="embed-code" v-bind:class="{ 'theme-dark': webTheme === 'dark' }"><div v-if="shouldUsePlaceholder">&lt;div id="futuri-widget"&gt;&lt;/div&gt;</div>&lt;script type="text/javascript" src="//post.futurimedia.com/futuri-post-widget.js?station={{ shouldPopUp ? lCustomer.toLowerCase() : lCustomer.toUpperCase() }}&amp;zone={{ selectedZone }}<span v-if="shouldPopUp">&amp;next={{ webNext }}</span>&amp;theme={{ webTheme }}<span v-if="webLimit > 0">&amp;limit={{ webLimit }}</span><span v-if="perPage > 0">&amp;perPage={{ perPage }}</span>" async&gt;&lt;/script&gt;</code>
        <button class="copy-button" @click="copyReaction" data-clipboard-action="copy" data-clipboard-target="#embed-code">Copy To Clipboard<span class="copy-success hidden">&#10004;</span></button>
      </div>
    </modal>
    <modal :open.sync="openRssLink"  id="rssLink">
      <h5 slot="header">Link to RSS Feed</h5>

      <div slot="body">
        <p>
          <input type="checkbox" v-model="rssShowDeleted"> Include deleted playlists</input>
        </p>
        <a href='#' title="Cut and paste this link into your browser or webpage to download the feed." >https://post.futurimedia.com/{{ lCustomer }}/playlist/rss/{{ selectedRss }}.xml<span v-if="rssShowDeleted">?show_deleted=true</span></a>
      </div>
    </modal>
  </div> -->

</template>

<script>
  import ClipboardJS from 'clipboard';
  import Modal from '../components/Modal';
  import {
    updateSocialMediaConnections,
    setWizardStepValid,
    uploadFile,
    deletePreBumper,
    deletePostBumper,
    addSocialMediaConnection,
    editSocialMediaConnection,
    deleteSocialMediaConnection,
    setRSSImage,
  } from '../core/actions';
  import uuid from 'node-uuid';

  const CURRENT_STEP = 3;

  export default {
    name: 'wizard-post-options',
    components: {
      Modal,
    },
    data() {
      return {
        checkedSocialMediaConnections: [],
        openWebsiteEditor: false,
        openRSSEditor: false,
        openFacebookEditor: false,
        openTwitterEditor: false,
        openWebEmbed: false,
        openRssLink: false,
        openPreview: false,
        perPage: '',
        smcTitle: '',
        smcUrl: '',
        smcId: null,
        smcDescription: '',
        smcExplicit: 'no',
        smcCategories: [],
        smcAuthor: '',
        smcSubtitle: '',
        smcEmail: '',
        smcAuthorization: '',
        smcIHeartId: 0,
        smcDefaultOnBrowser: 'no',
        smcDefaultOnPost: 'yes',
        facebookSrc: null,
        twitterGuid: null,
        selectedZone: null,
        selectedRss: null,
        shouldPaginate: false,
        shouldPopUp: false,
        shouldUsePlaceholder: false,
        webNext: 'popup',
        webTheme: 'light',
        webLimit: '',
        rssShowDeleted: false,
      };
    },

    watch: {
      checkedSocialMediaConnections() {
        this.updateSocialMediaConnections(this.checkedSocialMediaConnections);
      },
    },

    methods: {
      connectionById(id) {
        return this.socialMediaConnections.find(item => item.id === id);
      },
      // TODO: Need validation implemented if needed
      checkIfValid() {
      },
      checkState(id) {
        return (this.event.social_media_connections.find(id) !== -1);
      },
      uploadPre(event) {
        this.uploadFile('pre_bumper', event.target.files[0]);
      },
      uploadPost() {
        this.uploadFile('post_bumper', event.target.files[0]);
      },
      playUrlFor(bumper) {
        if (!bumper) {
          return '';
        }
        const parts = bumper.split('/');
        const eid = parts[parts.length - 2];
        return `//${this.lCustomer}.streamon.fm/preview?event/${eid}`;
      },
      openModalFor(type, id) {
        switch (type) {
          case 'websites':
            this.smcId = null;
            this.smcTitle = '';
            if (this.iHeartAvailable) {
              this.smcUrl = this.iHeartRss[0].iheart_show_id;
            } else {
              this.smcUrl = '';
            }
            this.smcDefaultOnBrowser = 'no';
            this.smcDefaultOnPost = 'yes';
            this.openWebsiteEditor = true;
            break;

          case 'rss':
            this.smcId = null;
            this.smcTitle = '';
            this.smcUrl = '';
            this.smcDescription = '';
            this.smcExplicit = 'no';
            this.smcCategories = [];
            this.smcAuthor = '';
            this.smcSubtitle = '';
            this.smcEmail = '';
            this.smcAuthorization = '';
            this.smcIHeartId = 0;
            this.smcDefaultOnBrowser = 'no';
            this.smcDefaultOnPost = 'yes';
            this.openRSSEditor = true;
            break;

          case 'facebook':
            this.smcId = null;
            this.smcTitle = '';
            this.smcIheart = false;
            if (this.iHeartAvailable) {
              this.smcUrl = this.iHeartRss[0].iheart_show_id;
            } else {
              this.smcUrl = '';
            }
            this.smcDefaultOnBrowser = 'no';
            this.smcDefaultOnPost = 'yes';
            this.openFacebookEditor = true;
            break;

          case 'twitter':
            this.smcId = null;
            this.smcTitle = '';
            this.smcIheart = false;
            if (this.iHeartAvailable) {
              this.smcUrl = this.iHeartRss[0].iheart_show_id;
            } else {
              this.smcUrl = '';
            }
            this.smcDefaultOnBrowser = 'no';
            this.smcDefaultOnPost = 'yes';
            this.openTwitterEditor = true;
            break;

          case 'webembed':
            this.selectedZone = id;
            this.openWebEmbed = true;
            break;

          case 'rsslink':
            this.selectedRss = id;
            this.openRssLink = true;
            break;

          case 'preview':
            this.openPreview = true;
            break;

          default:
            break;
        }
      },
      createWebsiteAndClear() {
        if (this.validateTitle('webwidget')) {
          let iHeartFlag = false;
          let iHeartId = '';
          if (this.iHeartAvailable) {
            if (this.smcUrl !== '') {
              iHeartFlag = true;
              iHeartId = this.smcUrl;
            }
          }
          this.addSocialMediaConnection({ id: null,
                                          type: 'webwidget',
                                          title: this.smcTitle,
                                          url: this.smcUrl,
                                          iHeartMedia: iHeartFlag,
                                          iheart_show_id: iHeartId,
                                          default_on_browser: this.smcDefaultOnBrowser === 'yes',
                                          default_on_post: this.smcDefaultOnPost === 'yes' });
          this.smcId = null;
          this.smcTitle = '';
          this.smcUrl = '';
          this.smcDefaultOnPost = 'yes';
          this.smcDefaultOnBrowser = 'no';
        }
      },
      createRSSAndClear() {
        if (this.validateTitle('rss')) {
          const categoriesString = this.smcCategories.join(',');
          this.addSocialMediaConnection({ id: null,
                                          type: 'rss',
                                          title: this.smcTitle,
                                          url: this.smcUrl,
                                          name: this.smcTitle,
                                          description: this.smcDescription,
                                          rss_explicit: this.smcExplicit === 'yes',
                                          itunes_categories: categoriesString,
                                          author: this.smcAuthor,
                                          subtitle: this.smcSubtitle,
                                          email: this.smcEmail,
                                          default_on_browser: this.smcDefaultOnBrowser === 'yes',
                                          default_on_post: this.smcDefaultOnPost === 'yes',
                                          imageurl: this.rssImage,
                                          iheart_show_id: this.smcIHeartId === 0 ? '' :
                                            this.smcIHeartId.toString() });
          this.smcId = null;
          this.smcTitle = '';
          this.smcUrl = '';
          this.smcDescription = '';
          this.smcExplicit = 'no';
          this.smcCategories = [];
          this.smcAuthor = '';
          this.smcSubtitle = '';
          this.smcEmail = '';
          this.smcAuthotization = '';
          this.smcIHeartId = 0;
          this.smcDefaultOnPost = 'yes';
          this.smcDefaultOnBrowser = 'no';
        }
      },
      createFacebookAndClear() {
        const selectedPage = this.getSelectedPage();
        if (!selectedPage) {
          alert('You must select a facebook page to connect the account to!');
        } else {
          const id = selectedPage.id;
          const appToken = selectedPage.token;
          this.smcTitle = selectedPage.title;
          if (this.validateTitle('facebook')) {
            const data = { id: null,
                       type: 'facebook',
                       title: this.smcTitle,
                       iHeartMedia: this.smcUrl !== '',
                       url: this.smcUrl,
                       app_id: id,
                       token: appToken,
                       iheart_show_id: this.smcUrl,
                       default_on_browser: this.smcDefaultOnBrowser === 'yes',
                       default_on_post: this.smcDefaultOnPost === 'yes' };
            this.addSocialMediaConnection(data);
            this.smcId = null;
            this.smcTitle = '';
            this.smcDefaultOnPost = 'yes';
            this.smcDefaultOnBrowser = 'no';
          }
        }
      },
      createTwitterAndClear() {
        if (this.twitterGuid) {
          const data = { id: null,
                     type: 'twitter',
                     iHeartMedia: this.smcUrl !== '',
                     url: this.smcUrl,
                     name: this.twitterGuid,
                     iheart_show_id: this.smcUrl,
                     default_on_browser: this.smcDefaultOnBrowser === 'yes',
                     default_on_post: this.smcDefaultOnPost === 'yes' };
          this.addSocialMediaConnection(data);
          this.smcId = null;
          this.smcTitle = '';
          this.twitterGuid = null;
          this.smcDefaultOnPost = 'yes';
          this.smcDefaultOnBrowser = 'no';
        } else {
          alert('You must authorize access to a twitter account before saving!');
        }
      },
      editWebsite(id) {
        const conn = this.connectionById(id);
        if (conn) {
          this.smcId = conn.id;
          this.smcTitle = conn.title;
          this.smcUrl = conn.url;
        }
        if (conn.default_on_post) {
          this.smcDefaultOnPost = 'yes';
        } else {
          this.smcDefaultOnPost = 'no';
        }
        if (conn.default_on_browser) {
          this.smcDefaultOnBrowser = 'yes';
        } else {
          this.smcDefaultOnBrowser = 'no';
        }
      },
      editRSS(id) {
        const conn = this.connectionById(id);
        if (conn) {
          this.smcId = conn.id;
          this.smcTitle = conn.title;
          this.smcDescription = conn.description;
          this.smcCategories = conn.itunes_categories.split(',');
          this.smcAuthor = conn.author;
          this.smcSubtitle = conn.subtitle;
          this.smcEmail = conn.email;
          this.smcAuthorization = conn.itunes_auth;
          this.smcIHeartId = isNaN(conn.iheart_show_id) ? 0 : Number(conn.iheart_show_id);
          if (conn.rss_explicit) {
            this.smcExplicit = 'yes';
          } else {
            this.smcExplicit = 'no';
          }
          if (conn.default_on_post) {
            this.smcDefaultOnPost = 'yes';
          } else {
            this.smcDefaultOnPost = 'no';
          }
          this.setRSSImage(conn.imageurl);
          if (conn.default_on_browser) {
            this.smcDefaultOnBrowser = 'yes';
          } else {
            this.smcDefaultOnBrowser = 'no';
          }
        }
      },
      editFacebook(id) {
        const conn = this.connectionById(id);
        if (conn) {
          this.smcId = conn.id;
          this.smcTitle = conn.title;
          this.smcUrl = conn.url;
        }
        if (conn.default_on_post) {
          this.smcDefaultOnPost = 'yes';
        } else {
          this.smcDefaultOnPost = 'no';
        }
        if (conn.default_on_browser) {
          this.smcDefaultOnBrowser = 'yes';
        } else {
          this.smcDefaultOnBrowser = 'no';
        }
      },
      editTwitter(id) {
        const conn = this.connectionById(id);
        if (conn) {
          this.smcId = conn.id;
          this.smcTitle = conn.title;
          this.smcUrl = conn.url;
        }
        if (conn.default_on_post) {
          this.smcDefaultOnPost = 'yes';
        } else {
          this.smcDefaultOnPost = 'no';
        }
        if (conn.default_on_browser) {
          this.smcDefaultOnBrowser = 'yes';
        } else {
          this.smcDefaultOnBrowser = 'no';
        }
      },
      editWebsiteAndClear() {
        if (this.validateTitle('webwidget')) {
          let iHeartFlag = false;
          let iHeartId = '';
          if (this.iHeartAvailable) {
            if (this.smcUrl !== '') {
              iHeartFlag = true;
              iHeartId = this.smcUrl;
            }
          }
          this.editSocialMediaConnection({ id: this.smcId,
                                           type: 'webwidget',
                                           title: this.smcTitle,
                                           url: this.smcUrl,
                                           iHeartMedia: iHeartFlag,
                                           iheart_show_id: iHeartId,
                                           default_on_post: this.smcDefaultOnPost === 'yes',
                                           default_on_browser: this.smcDefaultOnBrowser === 'yes' });
          this.smcId = null;
          this.smcTitle = '';
          this.smcUrl = '';
          this.smcDefaultOnPost = 'yes';
          this.smcDefaultOnBrowser = 'no';
        }
      },
      editRSSAndClear() {
        if (this.validateTitle('rss')) {
          const categoriesString = this.smcCategories.join(',');
          this.editSocialMediaConnection({ id: this.smcId,
                                           type: 'rss',
                                           title: this.smcTitle,
                                           name: this.smcTitle,
                                           description: this.smcDescription,
                                           rss_explicit: this.smcExplicit === 'yes',
                                           itunes_categories: categoriesString,
                                           author: this.smcAuthor,
                                           subtitle: this.smcSubtitle,
                                           email: this.smcEmail,
                                           itunes_auth: this.smcAuthorization,
                                           default_on_post: this.smcDefaultOnPost === 'yes',
                                           default_on_browser: this.smcDefaultOnBrowser === 'yes',
                                           imageurl: this.rssImage,
                                           iheart_show_id: this.smcIHeartId === 0 ? '' :
                                             this.smcIHeartId.toString() });
          this.smcId = null;
          this.smcTitle = '';
          this.smcDescription = '';
          this.smcExplicit = 'no';
          this.smcCategories = [];
          this.smcAuthor = '';
          this.smcSubtitle = '';
          this.smcEmail = '';
          this.smcAuthorization = '';
          this.smcIHeartId = 0;
          this.smcDefaultOnPost = 'yes';
          this.smcDefaultOnBrowser = 'no';
        }
      },
      editFacebookAndClear() {
        const selectedPage = this.getSelectedPage();
        if (selectedPage) {
          const id = selectedPage.id;
          const appToken = selectedPage.token;
          this.smcTitle = selectedPage.title;
          if (this.validateTitle('facebook')) {
            const data = { id: this.smcId,
                       type: 'facebook',
                       title: this.smcTitle,
                       iHeartMedia: this.smcUrl !== '',
                       url: this.smcUrl,
                       app_id: id,
                       token: appToken,
                       iheart_show_id: this.smcUrl,
                       default_on_post: this.smcDefaultOnPost === 'yes',
                       default_on_browser: this.smcDefaultOnBrowser === 'yes' };
            this.editSocialMediaConnection(data);
            this.smcId = null;
            this.smcTitle = '';
            this.smcDefaultOnPost = 'yes';
            this.smcDefaultOnBrowser = 'no';
          }
        } else {
          // save without seting app_id and app_secret and title
          const data = { id: this.smcId,
                     type: 'facebook',
                     iHeartMedia: this.smcUrl !== '',
                     url: this.smcUrl,
                     iheart_show_id: this.smcUrl,
                     default_on_post: this.smcDefaultOnPost === 'yes',
                     default_on_browser: this.smcDefaultOnBrowser === 'yes' };
          this.editSocialMediaConnection(data);
          this.smcId = null;
          this.smcTitle = '';
          this.smcDefaultOnPost = 'yes';
          this.smcDefaultOnBrowser = 'no';
        }
      },
      editTwitterAndClear() {
        const data = { id: this.smcId,
                       type: 'twitter',
                       iHeartMedia: this.smcUrl !== '',
                       url: this.smcUrl,
                       iheart_show_id: this.smcUrl,
                       default_on_post: this.smcDefaultOnPost === 'yes',
                       default_on_browser: this.smcDefaultOnBrowser === 'yes' };
        if (this.twitterGuid) {
          data.name = this.twitterGuid;
        }
        this.editSocialMediaConnection(data);
        this.smcId = null;
        this.smcTitle = '';
        this.twitterGuid = null;
        this.smcDefaultOnPost = 'yes';
        this.smcDefaultOnBrowser = 'no';
      },
      deleteConn(id) {
        const conn = this.connectionById(id);
        if (conn) {
          this.deleteSocialMediaConnection(conn);
        }
      },
      copyReaction(event) {
        const successElement = event.target.querySelector('.copy-success');

        successElement.classList.remove('hidden');

        setTimeout(() => {
          successElement.classList.add('hidden');
        }, 1000);
      },
      switchShouldPaginate() {
        this.perPage = 0;
      },
      validateTitle(type) {
        if (this.smcTitle === '') {
          alert('Title field must not be blank, enter a title and try again!');
          return false;
        }
        for (const conn of this.socialMediaConnections) {
          if (conn.title === this.smcTitle && conn.tyoe === type && conn.id !== this.smcId) {
            alert('Connection already exists with that title, please modify and try again!');
            return false;
          }
        }
        return true;
      },
      getSelectedPage() {
        const iframe = document.getElementById('facebookPages');
        if (iframe) {
          const iframedoc = iframe.contentWindow ?
                            iframe.contentWindow.document : iframe.contentDocument;
          const list = iframedoc.getElementsByTagName('option');
          for (const page of list) {
            if (page.selected) {
              return ({ id: page.id, token: page.value, title: page.text });
            }
          }
        }
        return null;
      },
      getFacebookPages() {
        //eslint-disable-next-line
        this.facebookSrc = `https://post.futurimedia.com/get_facebook_pages/?station=${this.lCustomer}`;
      },
      openFacebookAuth() {
        //eslint-disable-next-line
        const url = `https://www.facebook.com/dialog/oauth?client_id=195398541189099&auth_type=rerequest&redirect_uri=https%3A%2F%2Fpost.futurimedia.com%2Fset_facebook_code%2F&state=${this.lCustomer}&scope=email%2Cmanage_pages%2Cpublish_pages%2Cpages_show_list`
        window.open(url, '_blank');
      },
      openTwitterAuth() {
        //eslint-disable-next-line
        this.twitterGuid = uuid.v1();
        const guid = this.twitterGuid;
        //eslint-disable-next-line
        window.open(`${window.location.protocol}//${window.location.host}/${this.lCustomer}/request_twitter_code/?guid=${guid}`, '_blank');
      },
      uploadSquareImage(e) {
        const inFile = e.target.files[0];
        this.uploadFile('rss_image', inFile);
        document.getElementById('squareUpload').value = null;
      },
      loadShowImage() {
        if (this.event.square_image && this.event.square_image !== '') {
          this.setRSSImage(this.event.square_image);
        }
      },
    },

    attached() {
      const ids = this.event.social_media_connections.map((c) => c.id);
      this.checkedSocialMediaConnections = ids;
    },

    ready() {
      // eslint-disable-next-line
      new ClipboardJS('.copy-button');
      this.setWizardStepValid(CURRENT_STEP);
    },
    vuex: {
      getters: {
        currentStep: (state) => state.wizardSteps.steps[CURRENT_STEP],
        socialMediaConnections: (state) => state.socialMediaConnections,
        event: (state) => state.wizardEvent,
        customer: (state) => state.settings.station_name,
        loadedRSSImage: (state) => state.loadedRSSImage,
      },
      actions: {
        updateSocialMediaConnections,
        setWizardStepValid,
        uploadFile,
        deletePreBumper,
        deletePostBumper,
        addSocialMediaConnection,
        editSocialMediaConnection,
        deleteSocialMediaConnection,
        setRSSImage,
      },
    },
    computed: {
      facebook() {
        return this.socialMediaConnections.filter((item) => item.type === 'facebook');
      },
      twitter() {
        return this.socialMediaConnections.filter((item) => item.type === 'twitter');
      },
      rss() {
        return this.socialMediaConnections.filter((item) => item.type === 'rss');
      },
      iHeartRss() {
        return this.socialMediaConnections.filter((item) => item.type === 'rss'
                                                   && item.iheart_show_id !== '');
      },
      iHeartAvailable() {
        return this.iHeartRss.length > 0;
      },
      webwidget() {
        return this.socialMediaConnections.filter((item) => item.type === 'webwidget');
      },
      prePlayUrl() {
        return this.playUrlFor(this.event.pre_bumper);
      },
      postPlayUrl() {
        return this.playUrlFor(this.event.post_bumper);
      },
      lCustomer() {
        if (this.customer) {
          return this.customer.toLowerCase();
        }
        return '';
      },
      rssImage() {
        return this.loadedRSSImage;
      },
      youtube() {
      },
    },
  };
</script>
<style lang="css">
.post-option-content {

    transition: all 0.25s;
    overflow: hidden;
    opacity: 1;
}
.post-option-title{
color: #000 !important;
text-align: center;
}
 .radio-container,.radio-container1,radio-container2,radio-container3 { 
            box-sizing: border-box; 
            font-family: ‘Open Sans’, sans-serif; 
            font-size: 13px; 
            line-height: 30px; 
            margin: 0; 
             outline: 0; 
            overflow: hidden; 
            padding: 0; 
            color:#000 !important;
            position: relative;
            left: 68px;
        }

radio-container input {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
    position: relative;
    top: 9px;
    vertical-align: top;
    color: #000 !important;
}

.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

</style>
<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .post-options {
    list-style: none;
    margin: 0 0 1rem;
  }

  .post-option {
    margin-bottom: 1rem;
    border:2px solid green;
  }

  .post-option-title {
    font-weight: 700;
    font-size: rem-calc(18);
    line-height: 1.4;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
    margin: 0;
    color: $white;
  }

  .post-option-content {
    transition: all 0.25s;
    overflow: hidden;
    opacity: 1;
  }

  .modal-text {
    color: $black;
  }

  .web-list {
    margin: 10px 0 0 0;
  }

  #facebookEditor {
    .modal-container {
      width: 90%;
      max-height: 90%;
      overflow-y: auto;
    }
    iframe {
      width: 100%;
    }
  }

  #rssEditor {
    #rssimage {
      display: block;
      max-width:300px;
      max-height:300px;
      width: auto;
      height: auto;
    }
    .modal-container {
      width: 75%;
      min-width: 600px;
      max-height: 90%;
      overflow-y: auto;
    }
    select {
      height: 30px;
      padding: 0 20px 0 5px;
    }
    select.multiselect {
      height: auto;
    }
    .modal-footer {
      display: none;
    }
    .row {
      margin-right: 20px;
    }
  }

  #twitterEditor {
    .modal-container {
      width: 60%;
      min-width: 400px;
      max-height: 90%;
      overflow-y: auto;
    }
  }

  #webwidgetEditor {
    .modal-container {
      width: 60%;
      min-width: 400px;
      max-height: 90%;
      overflow-y: auto;
    }
  }

  #rssLink {
    .modal-container {
      width: 500px;
    }
    .modal-footer {
      display: none;
    }
  }

  #webEmbed {
    .modal-container {
      max-height: 65vh;
      overflow-y: scroll;
      width: 600px;
    }
  }

  .space-above {
    margin-top: 20px;
  }

  .width-auto {
    width: auto;
  }

  .small-grey {
    font-size: 10px;
    color: $just-off-white;
  }

  .small-link {
    margin-left: 5px;
    font-size: 10px;
  }
</style>
