<?php

namespace kmdaBundle\Entity;

/**
 * District
 */
class District
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
     * @return District
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
     * @var \kmdaBundle\Entity\City
     */
    private $idCity;


    /**
     * Set idCity
     *
     * @param \kmdaBundle\Entity\City $idCity
     *
     * @return District
     */
    public function setIdCity(\kmdaBundle\Entity\City $idCity = null)
    {
        $this->idCity = $idCity;

        return $this;
    }

    /**
     * Get idCity
     *
     * @return \kmdaBundle\Entity\City
     */
    public function getIdCity()
    {
        return $this->idCity;
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
     * @return District
     */
    public function addKmdaObject(\kmdaBundle\Entity\kmdaObject $kmdaObject)
    {
        $this->kmdaObject[] = $kmdaObject;

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
