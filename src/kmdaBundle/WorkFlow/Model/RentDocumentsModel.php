<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace kmdaBundle\WorkFlow\Model;

use Lexik\Bundle\WorkflowBundle\Model\ModelInterface;
use kmdaBundle\Entity\RentDocuments;

/**
 * This class is used to wrap a Post entity.
 * It's not required to do it like that, we could also implement ModelInterface in the Post entity .
 */
class RentDocumentsModel implements ModelInterface
{
    private $rentdocument;

    public function __construct(Post $post)
    {
        $this->rentdocument = $rentdocument;
    }

    public function getRentDocument()
    {
        return $this->rentdocument;
    }

    public function setStatus($status)
    {
        $this->rentdocument->setStatus($status);
    }

    public function getStatus()
    {
        return $this->rentdocument->getStatus();
    }

    /**
     * Returns an unique identifier.
     *
     * @return mixed
     */
    public function getWorkflowIdentifier()
    {
        return md5(get_class($this->rentdocument).'-'.$this->rentdocument->getId());
    }

    /**
     * Returns data to store in the ModelState.
     *
     * @return array
     */
    public function getWorkflowData()
    {
        return array(
            'rentdocument_id' => $this->rentdocument->getId(),
//            'content' => $this->post->getContent(),
            // ...
        );
    }

    /**
     * Returns the final object.
     * If your entity implements ModelInterface itself just return $this.
     *
     * @return object
     */
    public function getWorkflowObject()
    {
        return $this->rentdocument;
    }
}