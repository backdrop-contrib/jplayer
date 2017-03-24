<?php
/**
 * @file
 * Views module hooks for the jPlayer module.
 */

/**
 * Implements hook_views_plugins().
 */
function jplayer_views_plugins() {
  $path = backdrop_get_path('module', 'jplayer');

  return array(
    'style' => array(
      'jplayer' => array(
        'title' => t('jPlayer'),
        'help' => t('Display audio files from different nodes as a jPlayer playlist.'),
        'handler' => 'jplayer_style_plugin',
        'path' => "$path/views",
        'uses row plugin' => TRUE,
        'uses options' => TRUE,
        'uses grouping' => FALSE,
        'type' => 'normal',
      ),
    ),
  );
}
