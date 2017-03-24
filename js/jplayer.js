/**
 * @file
 * Backdrop behaviors for jPlayer.
 */

(function ($) {
  'use strict';
  Backdrop.jPlayer = Backdrop.jPlayer || {};

  Backdrop.behaviors.jPlayer = {
    settings: {},
    instances: {},

    attach: function(context, settings) {
      this.settings = Backdrop.settings.jPlayer;
      this.instances = Backdrop.settings.jplayerInstances;
      var self = this;
      // Set time format settings
      $.jPlayer.timeFormat.showHour = Backdrop.settings.jPlayer.showHour;
      $.jPlayer.timeFormat.showMin = Backdrop.settings.jPlayer.showMin;
      $.jPlayer.timeFormat.showSec = Backdrop.settings.jPlayer.showSec;

      $.jPlayer.timeFormat.padHour = Backdrop.settings.jPlayer.padHour;
      $.jPlayer.timeFormat.padMin = Backdrop.settings.jPlayer.padMin;
      $.jPlayer.timeFormat.padSec = Backdrop.settings.jPlayer.padSec;

      $.jPlayer.timeFormat.sepHour = Backdrop.settings.jPlayer.sepHour;
      $.jPlayer.timeFormat.sepMin = Backdrop.settings.jPlayer.sepMin;
      $.jPlayer.timeFormat.sepSec = Backdrop.settings.jPlayer.sepSec;

      // INITIALISE
      $('.jp-jplayer', context).once('jp-player--loaded', function() {
        var wrapper = this.parentNode;
        var player = this;
        var playerId = $(this).attr('id');
        var playerSettings = self.instances[playerId];
        var type = $(this).parent().attr('class');
        player.playerType = $(this).parent().attr('class');

        if (type == 'jp-type-single') {
          // Initialise single player
          $(player).jPlayer({
            ready: function() {
              Backdrop.jPlayer.setFiles(wrapper, player, 0, playerSettings.autoplay);
              // Make sure we pause other players on play
              $(player).bind($.jPlayer.event.play, function() {
                $(this).jPlayer("pauseOthers");
              });
              Backdrop.attachBehaviors(wrapper);

              // Repeat?
              if (playerSettings.repeat != 'none') {
                $(player).bind($.jPlayer.event.ended, function() {
                  $(this).jPlayer("play");
                });
              }

              // Autoplay?
              if (playerSettings.autoplay == true) {
                $(this).jPlayer("play");
              }
            },
            swfPath: self.settings.swfPath,
            cssSelectorAncestor: '#'+playerId+'_interface',
            solution: playerSettings.solution,
            supplied: playerSettings.supplied,
            preload: playerSettings.preload,
            volume: playerSettings.volume,
            muted: playerSettings.muted
          });
        }
        else {
          // Initialise playlist player
          $(player).jPlayer({
            ready: function() {
              Backdrop.jPlayer.setFiles(wrapper, player, 0, playerSettings.autoplay);

              // Pause other players on play
              $(player).bind($.jPlayer.event.play, function() {
                $(this).jPlayer("pauseOthers");
              });

              // Add playlist selection
              // TODO: make this a $playlist object for easier user below.
              $('#' + playerId + '_playlist').find('a').click(function(){
                var index = $(this).attr('id').split('_')[2];
                Backdrop.jPlayer.setFiles(wrapper, player, index, true);
                $(this).blur();
                return false;
              });

              Backdrop.attachBehaviors(wrapper);
              if (playerSettings.continuous == 1) {
                $(player).bind($.jPlayer.event.ended, function(e) {
                  // TODO: Combine all ended event in one location.
                  if(!$('li:last', $('#'+playerId+'_playlist')).hasClass('jp-playlist-current')) {
                    Backdrop.jPlayer.next(wrapper, player);
                    $(this).jPlayer("play");
                  }
                  else if($('li:last', $('#'+playerId+'_playlist')).hasClass('jp-playlist-current')) {
                    // We are at the end of the playlist, so move to the first
                    // track but stop playing if repeat is disabled.
                    Backdrop.jPlayer.next(wrapper, player);
                    if (playerSettings.repeat == 'none') {
                      $(this).jPlayer("pause");
                    }
                  }
                });
              }

              // Repeat a single track?
              if (playerSettings.repeat == 'single') {
                $(player).bind($.jPlayer.event.ended, function() {
                  $(this).jPlayer("play");
                });
              }
            },
            swfPath: self.settings.swfPath,
            cssSelectorAncestor: '#'+playerId+'_interface',
            solution: playerSettings.solution,
            supplied: playerSettings.supplied,
            preload: playerSettings.preload,
            volume: playerSettings.volume,
            muted: playerSettings.muted
          });

          // Next
          $(wrapper).find('.jp-next').click(function() {
            $(this).blur();
            Backdrop.jPlayer.next(wrapper, player);
            return false;
          });

          // Previous
          $(wrapper).find('.jp-previous').click(function() {
            $(this).blur();
            Backdrop.jPlayer.previous(wrapper, player);
            return false;
          });
        }
      });
    }
  };

  Backdrop.jPlayer.setFiles = function(wrapper, player, index, play) {
    var playerId = $(player).attr('id');
    var playerSettings = Backdrop.settings.jplayerInstances[playerId];
    var type = $(wrapper).parent().attr('class');

    $(wrapper).find('.jp-playlist-current').removeClass('jp-playlist-current');
    $('#'+playerId+'_item_'+index).parent().addClass('jp-playlist-current');
    $('#'+playerId+'_item_'+index).addClass('jp-playlist-current');
    $(player).jPlayer("setMedia", playerSettings.files[index]);
    var key ='';
    for (key in playerSettings.files[index]) {
      if (key != 'poster') {
        type = key;
      }
    }
    var kind = '';
    if (type in {'m4v':'', 'mp4':'','ogv':'','webmv':''}) {
      kind = 'video jp-video-360p';
    }
    else if (type in {'mp3':'', 'm4a':'','oga':'','webmv':'','wav':''}) {
      kind = 'audio';
    }

    if (kind == 'audio') {
      $(wrapper).find('img').remove();
    }
    if (play == true) {
      $(player).jPlayer('play');
    }
  };

  Backdrop.jPlayer.next = function(wrapper, player) {
    var playerId = $(player).attr('id');
    var playerSettings = Backdrop.settings.jplayerInstances[playerId];

    var current = Number($(wrapper).find('a.jp-playlist-current').attr('id').split('_')[2]);
    var index = (current + 1 < playerSettings.files.length) ? current + 1 : 0;

    Backdrop.jPlayer.setFiles(wrapper, player, index, true);
  };

  Backdrop.jPlayer.previous = function(wrapper, player) {
    var playerId = $(player).attr('id');
    var playerSettings = Backdrop.settings.jplayerInstances[playerId];

    var current = Number($(wrapper).find('a.jp-playlist-current').attr('id').split('_')[2]);
    var index = (current - 1 >= 0) ? current - 1 : playerSettings.files.length - 1;

    Backdrop.jPlayer.setFiles(wrapper, player, index, true);
  };

})(jQuery);

