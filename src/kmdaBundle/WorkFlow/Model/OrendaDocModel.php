<?php

namespace kmdaBundle\WorkFlow\Model;

use Lexik\Bundle\WorkflowBundle\Model\ModelInterface;
use Lexik\Bundle\WorkflowBundle\Model\ModelStateInterface;
use kmdaBundle\Entity\OrendaDoc;

/**
 * This class is used to wrap a Post entity.
 * It's not required to do it like that, we could also implement ModelInterface in the Post entity .
 */
class OrendaDocModel implements ModelInterface, ModelStateInterface
{
    private $OrendaDoc;
    const STATUS_DRAFT = 1;
    const STATUS_PUBLISHED = 2;
    const STATUS_AGREEMENT = 3;
    const STATUS_DELETED = 4;
    const STATUS_USED = 5;

    private $status;
    
    public function __construct(OrendaDoc $OrendaDoc)
    {
        $this->OrendaDoc = $OrendaDoc;
    }

    public function getOrendaDoc()
    {
        return $this->OrendaDoc->getStatus();
    }

    public function setStatus($status)
    {
        $this->OrendaDoc->setStatus($status);
    }

    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Returns an unique identifier.
     *
     * @return mixed
     */
    public function getWorkflowIdentifier()
    {
        return md5(get_class($this->OrendaDoc).'-'.$this->OrendaDoc->getId());
    }

    /**
     * Returns data to store in the ModelState.
     *
     * @return array
     */
    public function getWorkflowData()
    {
        return array(
            'OrendaDoc_id' => $this->OrendaDoc->getId(),
   //         'content' => $this->post->getContent(),
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
        return $this->OrendaDoc;
    }

    protected $states = array();

    public function addState(\Lexik\Bundle\WorkflowBundle\Entity\ModelState $modelState)
    {
        $this->states[] = $modelState;
        
        return $this;
    }

    public function getStates()
    {
        return $this->states;
    }
}