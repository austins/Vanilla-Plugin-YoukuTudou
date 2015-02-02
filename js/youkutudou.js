jQuery(document).ready(function($) {
   // Define variables for links and regex matching.
   var YoukuLink = 'v.youku.com/v_show/';
   var YoukuRegex1 = '/id_(.*).html';
   
   var TudouLink = 'tudou.com/';
   var TudouRegex1 = '/listplay/(.*)/';
   var TudouRegex2 = '/albumplay/(.*).html';
   var TudouRegex3 = '/albumplay/(.*)/';
   var TudouRegex4 = '/view/(.*)/';
   
   var AcFunLink = 'acfun.tv/v/';
   var AcFunRegex1 = '/ac(.*)';
   
   // Interval for timer in milliseconds.
   // This is important for the binds.
   // It is used on document load because it gives the page time to load up.
   var EmbedInterval = 1100;
   
   // Youku Embed
   // Replace link to video with embed.
   function YoukuEmbed() {
      setInterval(function() {
         $('.Message, .Excerpt, #PageBody').find('a[href*="' + YoukuLink + '"]').each(function() {
            var YoukuVideoID = $(this).attr('href').match(YoukuRegex1);
            if(YoukuVideoID != null)
               $(this).replaceWith('<div class="YoukuVideoWrap"><iframe class="YoukuVideoEmbed" width="640" height="400" src="http://player.youku.com/embed/' + YoukuVideoID[1] + '" allowfullscreen></iframe></div>');
         });
      }, EmbedInterval);
   }
   
   // Tudou Embed
   // Replace link to video with embed.
   function TudouEmbed() {
      setInterval(function() {
         $('.Message, .Excerpt, #PageBody').find('a[href*="' + TudouLink + '"]').each(function() {
            var TudouVideoID = $(this).attr('href').match(TudouRegex1);
            if(TudouVideoID == null)
               var TudouVideoID = $(this).attr('href').match(TudouRegex2);
            if(TudouVideoID == null)
               var TudouVideoID = $(this).attr('href').match(TudouRegex3);
            if(TudouVideoID == null)
               var TudouVideoID = $(this).attr('href').match(TudouRegex4);

            if(TudouVideoID != null)
               $(this).replaceWith('<div class="TudouVideoWrap"><iframe class="TudouVideoEmbed" width="640" height="368" src="http://www.tudou.com/programs/view/html5embed.action?code=' + TudouVideoID[1] + '" allowfullscreen></iframe></div>');
         });
      }, EmbedInterval);
   }
   
   // AcFun Embed
   // Replace link to video with embed.
   function AcFunEmbed() {
      setInterval(function() {
         $('.Message, .Excerpt, #PageBody').find('a[href*="' + AcFunLink + '"]').each(function() {
            var AcFunVideoLink = $(this).attr('href');
            var AcFunVideoID = AcFunVideoLink.match(AcFunRegex1);
            if(AcFunVideoID != null)
               $(this).replaceWith('<div class="AcFunVideoWrap"><object class="AcFunVideoEmbed" width="640" height="397" type="application/x-shockwave-flash" data="http://static.acfun.tv/player/ACFlashPlayer.out.swf?type=page&url=' + AcFunVideoLink + '"><param name="wmode" value="window"><param name="allowFullscreenInteractive" value="true"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="false"></object></div>');
         });
      }, EmbedInterval);
   }
   
   // Responsive video frames.
   // Adjusts height to aspect ratio accordingly.
   // Aspect ratio scales:
   // 16:9 => 9 / 16
   // 4:3 => 3 / 4
   var AspectRatio = (9 / 16);
   // Additional height variables to adjust for button bars in the video embed.
   var YoukuAddHeight = 40;
   var TudouAddHeight = 8;
   var AcFunAddHeight = 37;
   
   // Set interval to give page time to load up the video embed, so that
   // things like the preview and bind events get scaled by aspect ratio
   // for the responsive video frames.
   function setAspectRatio() {
      setInterval(function() {
         $('.YoukuVideoEmbed').each(function() {
            $(this).css('height', $(this).width() * AspectRatio + YoukuAddHeight);
         });

         $('.TudouVideoEmbed').each(function() {
            $(this).css('height', $(this).width() * AspectRatio + TudouAddHeight);
         });
         
         $('.AcFunVideoEmbed').each(function() {
            $(this).css('height', $(this).width() * AspectRatio + AcFunAddHeight);
         });
      }, EmbedInterval);
   }
   
   // Function to run all embed functions.
   function LoadAllEmbeds() {
	   YoukuEmbed();
	   TudouEmbed();
	   AcFunEmbed();
	   
	   setAspectRatio();
   }
   
   // Run functions on document load.
   LoadAllEmbeds();
   
   // Bind the setAspectRatio function to the resize event of the window.
   $(window).resize(setAspectRatio);
   
   // Bind functions to AJAX form submits for comments, activties, and previews.
   $(document).livequery('CommentEditingComplete CommentAdded PreviewLoaded', function() {
      LoadAllEmbeds();
   });
   
   // Bind to click event of these buttons.
   $('body.Vanilla.Post #Form_Preview, input#Form_Share').click(function() {
      LoadAllEmbeds();
   });
});
