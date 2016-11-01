<?php

namespace kmdaBundle\Entity;

/**
 * BuildingKind
 */
class BuildingKind
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $name;
    public function __toString() {
        return $this->name;
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
     * Set name
     *
     * @param string $name
     *
     * @return BuildingKind
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $kmdaObject;

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
     * @return BuildingKind
     */
    public function addKmdaObject(\kmdaBundle\Entity\kmdaObject $kmdaObject)
    {
        $this->kmdaObject[] = $kmdaObject;
        $kmdaObject->setBuildingKind($this);
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

    /**
     * Get kmdaObject
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getKmdaObject()
    {
        return $this->kmdaObject;
    }
}
