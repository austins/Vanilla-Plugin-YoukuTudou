jQuery(document).ready(function ($) {
    // Interval for timer in milliseconds.
    // This is important for the binds.
    // It is used on document load because it gives the page time to load up.
    var EmbedInterval = 1100;

    // Youku Embed
    // Replace link to video with embed.
    var YoukuLink = 'v.youku.com/v_show/';
    var YoukuRegex1 = '/id_(.*).html';

    function YoukuEmbed() {
        setInterval(function () {
            $('.Message, .Excerpt, #PageBody').find('a[href*="' + YoukuLink + '"]').each(function () {
                var YoukuVideoID = $(this).attr('href').match(YoukuRegex1);
                if (YoukuVideoID != null)
                    $(this).replaceWith('<div class="YoukuVideoWrap"><iframe class="YoukuVideoEmbed" width="640" height="400" src="https://player.youku.com/embed/' + YoukuVideoID[1] + '" allowfullscreen></iframe></div>');
            });
        }, EmbedInterval);
    }

    // Tudou Embed
    // Replace link to video with embed.
    var TudouLink = 'tudou.com/';
    var TudouRegex1 = '/listplay/(.*)/';
    var TudouRegex2 = '/albumplay/(.*).html';
    var TudouRegex3 = '/albumplay/(.*)/';
    var TudouRegex4 = '/view/(.*)/';
    var TudouRegex5 = '/v/(.*).html';

    function TudouEmbed() {
        setInterval(function () {
            $('.Message, .Excerpt, #PageBody').find('a[href*="' + TudouLink + '"]').each(function () {
                var TudouVideoID = $(this).attr('href').match(TudouRegex1);
                if (TudouVideoID == null)
                    TudouVideoID = $(this).attr('href').match(TudouRegex2);
                if (TudouVideoID == null)
                    TudouVideoID = $(this).attr('href').match(TudouRegex3);
                if (TudouVideoID == null)
                    TudouVideoID = $(this).attr('href').match(TudouRegex4);
                if (TudouVideoID == null)
                    TudouVideoID = $(this).attr('href').match(TudouRegex5);

                if (TudouVideoID != null)
                    $(this).replaceWith('<div class="TudouVideoWrap"><iframe class="TudouVideoEmbed" width="640" height="368" src="https://www.tudou.com/programs/view/html5embed.action?code=' + TudouVideoID[1] + '" allowfullscreen></iframe></div>');
            });
        }, EmbedInterval);
    }

    // AcFun Embed
    // Replace link to video with embed.
    var AcFunLink1 = 'acfun.tv/v/';
    var AcFunRegex1 = '/ac(.*)';

    function ReplaceWithAcFunEmbed(linkElem) {
        var AcFunVideoLink = linkElem.attr('href');
        var AcFunVideoID = AcFunVideoLink.match(AcFunRegex1);
        if (AcFunVideoID != null)
            linkElem.replaceWith('<div class="AcFunVideoWrap"><object class="AcFunVideoEmbed" width="640" height="397" type="application/x-shockwave-flash" data="https://static.acfun.tv/player/ACFlashPlayer.out.swf?type=page&url=' + AcFunVideoLink + '"><param name="wmode" value="window"><param name="allowFullscreenInteractive" value="true"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="false"></object></div>');
    }

    function AcFunEmbed() {
        setInterval(function () {
            $('.Message, .Excerpt, #PageBody').find('a[href*="' + AcFunLink1 + '"]').each(function () {
                ReplaceWithAcFunEmbed($(this));
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
        setInterval(function () {
            $('.YoukuVideoEmbed').each(function () {
                $(this).css('height', $(this).width() * AspectRatio + YoukuAddHeight);
            });

            $('.TudouVideoEmbed').each(function () {
                $(this).css('height', $(this).width() * AspectRatio + TudouAddHeight);
            });

            $('.AcFunVideoEmbed').each(function () {
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
    $(document).livequery('CommentEditingComplete CommentAdded PreviewLoaded', function () {
        LoadAllEmbeds();
    });

    // Bind to click event of these buttons.
    $('body.Vanilla.Post #Form_Preview, input#Form_Share').click(function () {
        LoadAllEmbeds();
    });
});
