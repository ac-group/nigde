<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace kmdaBundle\EventListener;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;

class PostgisListener implements EventSubscriber

{
    public function getSubscribedEvents()
    {
        return array(
            'postPersist',
            'postUpdate',
        );
    }

    public function postUpdate(LifecycleEventArgs $args)
    {
        $this->index($args);
    }

    public function postPersist(LifecycleEventArgs $args)
    {
        $this->index($args);
    }

    public function index(LifecycleEventArgs $args)
    {

            $entityManager = $args->getEntityManager();
            $entityManager->getEventManager()->addEventSubscriber(new ORMSchemaEventSubscriber());
            $connection = $args->getConnection();
            $connection->getEventManager()->addEventSubscriber(new DBALSchemaEventSubscriber());
    }
}