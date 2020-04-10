<?php

namespace Drupal\ring_countdown\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Datetime\DrupalDateTime;

/**
 * Provides a 'CountdownBlock' block.
 *
 * @Block(
 *  id = "countdown_block",
 *  admin_label = @Translation("Ring Countdown"),
 * )
 */
class CountdownBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $et = $this->configuration['end_time'];
    $form['end_time'] = [
      '#type' => 'datetime',
      '#title' => $this->t('End time'),
      '#description' => $this->t('The zero time for the countdown'),
      '#default_value' => $et ? DrupalDateTime::createFromTimestamp($et) : NULL,
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $dt = $form_state->getValue('end_time');
    $this->configuration['end_time'] = $dt->format('U');
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['#theme'] = 'ring_countdown_block';
    $build['#end_time'] = $this->configuration['end_time'];
    $build['#attached']['library'][] = 'ring_countdown/timer';

    return $build;
  }

}
