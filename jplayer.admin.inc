<?php
/**
 * @file
 * Administrative pages for the jPlayer module.
 */

/**
 * Provides the jPlayer settings form.
 */
function jplayer_settings_form($form, &$form_state) {
  $form = array('#config' => 'jplayer.settings');
  $config = config('jplayer.settings');

  $form['timeformat'] = array(
    '#type' => 'fieldset',
    '#title' => t('Time Format'),
  );

  $form['timeformat']['hours'] = array(
    '#type' => 'fieldset',
    '#title' => t('Hours'),
    '#collapsible' => TRUE,
  );

  $form['timeformat']['hours']['showHour'] = array(
    '#title' => t('Display hours'),
    '#type' => 'select',
    '#options' => array(
      FALSE => t('No'),
      TRUE => t('Yes'),
    ),
    '#default_value' => $config->get('showHour'),
  );

  $form['timeformat']['hours']['padHour'] = array(
    '#title' => t('Zero-pad the hours'),
    '#type' => 'select',
    '#options' => array(
      FALSE => t('No'),
      TRUE => t('Yes'),
    ),
    '#default_value' => $config->get('padHour'),
    '#states' => array(
      'visible' => array(
        ':input[name="showHour"]' => array('value' => 1),
      ),
    ),
  );

  $form['timeformat']['hours']['sepHour'] = array(
    '#title' => t('Hours seperator'),
    '#type' => 'textfield',
    '#maxlength' => 32,
    '#default_value' => $config->get('sepHour'),
    '#states' => array(
      'visible' => array(
        ':input[name="showHour"]' => array('value' => 1),
      ),
    ),
  );

  $form['timeformat']['mins'] = array(
    '#type' => 'fieldset',
    '#title' => t('Minutes'),
    '#collapsible' => TRUE,
  );

  $form['timeformat']['mins']['showMin'] = array(
    '#title' => t('Display minutes'),
    '#type' => 'select',
    '#options' => array(
      FALSE => t('No'),
      TRUE => t('Yes'),
    ),
    '#default_value' => $config->get('showMin'),
  );

  $form['timeformat']['mins']['padMin'] = array(
    '#title' => t('Zero-pad the minutes'),
    '#type' => 'select',
    '#options' => array(
      FALSE => t('No'),
      TRUE => t('Yes'),
    ),
    '#default_value' => $config->get('padMin'),
    '#states' => array(
      'visible' => array(
        ':input[name="showMin"]' => array('value' => 1),
      ),
    ),
  );

  $form['timeformat']['mins']['sepMin'] = array(
    '#title' => t('Minutes seperator'),
    '#type' => 'textfield',
    '#maxlength' => 32,
    '#default_value' => $config->get('sepMin'),
    '#states' => array(
      'visible' => array(
        ':input[name="showMin"]' => array('value' => 1),
      ),
    ),
  );

  $form['timeformat']['secs'] = array(
    '#type' => 'fieldset',
    '#title' => t('Seconds'),
    '#collapsible' => TRUE,
  );

  $form['timeformat']['secs']['showSec'] = array(
    '#title' => t('Display seconds'),
    '#type' => 'select',
    '#options' => array(
      FALSE => t('No'),
      TRUE => t('Yes'),
    ),
    '#default_value' => $config->get('showSec'),
  );

  $form['timeformat']['secs']['padSec'] = array(
    '#title' => t('Zero-pad the seconds'),
    '#type' => 'select',
    '#options' => array(
      FALSE => t('No'),
      TRUE => t('Yes'),
    ),
    '#default_value' => $config->get('padSec'),
    '#states' => array(
      'visible' => array(
        ':input[name="showSec"]' => array('value' => 1),
      ),
    ),
  );

  $form['timeformat']['secs']['sepSec'] = array(
    '#title' => t('Seconds seperator'),
    '#type' => 'textfield',
    '#maxlength' => 32,
    '#default_value' => $config->get('sepSec'),
    '#states' => array(
      'visible' => array(
        ':input[name="showSec"]' => array('value' => 1),
      ),
    ),
  );

  return system_settings_form($form);
}
