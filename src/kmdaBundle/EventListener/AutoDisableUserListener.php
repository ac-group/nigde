<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace kmdaBundle\EventListener;

use FOS\UserBundle\FOSUserEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use FOS\UserBundle\Event\UserEvent;
use FOS\UserBundle\Model\UserInterface;

class AutoDisableUserListener implements EventSubscriberInterface
{
  public static function getSubscribedEvents()
  {
    return [ FOSUserEvents::REGISTRATION_INITIALIZE => 'onRegistrationInitialise' ];
  }

  public function onRegistrationInitialise( UserEvent $event )
  {
    $user = $event->getUser();
    $user->setActive(false);

    // what do
  }
}