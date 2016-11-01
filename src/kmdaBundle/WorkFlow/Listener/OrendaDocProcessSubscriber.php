<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace kmdaBundle\WorkFlow\Listener;
use Lexik\Bundle\WorkflowBundle\Event\StepEvent;
use Lexik\Bundle\WorkflowBundle\Event\ValidateStepEvent;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
class OrendaDocProcessSubscriber implements EventSubscriberInterface
{
    /**
     * {@inheritDoc}
     */
    public static function getSubscribedEvents()
    {
        return array(
            'orenda_agreement.agreement1.pre_validate' => array(
                'handleAccessValidationOrenda',
            ),
            'orenda_agreement.agreement1.pre_validation_fail' => array(
                'handleValidationFail',
            ),
        );
    }
    public function handleAccessValidationOrenda(ValidateStepEvent $event)
    {
        if ( $event->getModel()->getStatus() != \kmdaBundle\WorkFlow\Model\OrendaDocModel::STATUS_DRAFT) {
            $event->addViolation('error message');          
        }
    }

    public function handleValidationFail(StepEvent $event)
    {
         $modelState = $event->getModelState();
    }
}