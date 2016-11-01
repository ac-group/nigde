<?php

namespace kmdaBundle\Entity;

/**
 * OrendaResh
 */
class OrendaResh
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $note;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $orendadoc;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->orendadoc = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set note
     *
     * @param string $note
     *
     * @return OrendaResh
     */
    public function setNote($note)
    {
        $this->note = $note;

        return $this;
    }

    /**
     * Get note
     *
     * @return string
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Add orendadoc
     *
     * @param \kmdaBundle\Entity\OrendaDoc $orendadoc
     *
     * @return OrendaResh
     */
    public function addOrendadoc(\kmdaBundle\Entity\OrendaDoc $orendadoc)
    {
        $this->orendadoc[] = $orendadoc;
        
        return $this;
    }

    /**
     * Remove orendadoc
     *
     * @param \kmdaBundle\Entity\OrendaDoc $orendadoc
     */
    public function removeOrendadoc(\kmdaBundle\Entity\OrendaDoc $orendadoc)
    {
        $this->orendadoc->removeElement($orendadoc);
    }

    /**
     * Get orendadoc
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getOrendadoc()
    {
        return $this->orendadoc;
    }
    /**
     * @var string
     */
    private $title;

    /**
     * @var \DateTime
     */
    private $created;

    /**
     * @var \DateTime
     */
    private $updated;


    /**
     * Set title
     *
     * @param string $title
     *
     * @return OrendaResh
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return OrendaResh
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set updated
     *
     * @param \DateTime $updated
     *
     * @return OrendaResh
     */
    public function setUpdated($updated)
    {
        $this->updated = $updated;

        return $this;
    }

    /**
     * Get updated
     *
     * @return \DateTime
     */
    public function getUpdated()
    {
        return $this->updated;
    }
    /**
     * @var \DateTime
     */
    private $expected;


    /**
     * Set expected
     *
     * @param \DateTime $expected
     *
     * @return OrendaResh
     */
    public function setExpected($expected)
    {
        $this->expected = $expected;

        return $this;
    }

    /**
     * Get expected
     *
     * @return \DateTime
     */
    public function getExpected()
    {
        return $this->expected;
    }
        /**
     * @var \DateTime
     */
    private $closed;


    /**
 
     *
     * @return OrendaResh
     */
    public function setClosed($closed)
    {
        $this->closed = $closed;

        return $this;
    }

    /**
    
     *
     * @return \DateTime
     */
    public function getClosed()
    {
        return $this->closed;
    }
}
