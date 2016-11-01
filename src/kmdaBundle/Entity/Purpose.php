<?php

namespace kmdaBundle\Entity;

/**
 * Purpose
 */
class Purpose
{
    /**
     * @var string
     */
    private $title;

    /**
     * @var \kmdaBundle\Entity\OrendaDoc
     */
    private $orendadoc;


    /**
     * Set title
     *
     * @param string $title
     *
     * @return Purpose
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
     * Set orendadoc
     *
     * @param \kmdaBundle\Entity\OrendaDoc $orendadoc
     *
     * @return Purpose
     */
    public function setOrendadoc(\kmdaBundle\Entity\OrendaDoc $orendadoc = null)
    {
        $this->orendadoc = $orendadoc;

        return $this;
    }

    /**
     * Get orendadoc
     *
     * @return \kmdaBundle\Entity\OrendaDoc
     */
    public function getOrendadoc()
    {
        return $this->orendadoc;
    }
    /**
     * @var integer
     */
    private $id;


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
     * @var \kmdaBundle\Entity\kmdaObject
     */
    private $kmdaObject;


    /**
     * Set kmdaObject
     *
     * @param \kmdaBundle\Entity\kmdaObject $kmdaObject
     *
     * @return Purpose
     */
    public function setKmdaObject(\kmdaBundle\Entity\kmdaObject $kmdaObject = null)
    {
        $this->kmdaObject = $kmdaObject;

        return $this;
    }

    /**
     * Get kmdaObject
     *
     * @return \kmdaBundle\Entity\kmdaObject
     */
    public function getKmdaObject()
    {
        return $this->kmdaObject;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->kmdaObject = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add kmdaObject
     *
     * @param \kmdaBundle\Entity\kmdaObject $kmdaObject
     *
     * @return Purpose
     */
    public function addKmdaObject(\kmdaBundle\Entity\kmdaObject $kmdaObject)
    {
        $this->kmdaObject[] = $kmdaObject;
        $kmdaObject->addPurpose($this);
        return $this;
    }

    /**
     * Remove kmdaObject
     *
     * @param \kmdaBundle\Entity\kmdaObject $kmdaObject
     */
    public function removeKmdaObject(\kmdaBundle\Entity\kmdaObject $kmdaObject)
    {
        $this->kmdaObject->removeElement($kmdaObject);
    }
}
