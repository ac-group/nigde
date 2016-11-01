<?php

namespace kmdaBundle\Entity;

/**
 * AddrStreet
 */
class AddrStreet
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $name;

    /**
     * @var boolean
     */
    private $isActive;

    /**
     * @var linestring
     */
    private $theGeom900913;

    /**
     * @var integer
     */
    private $idDistrict;


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
     * @return AddrStreet
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
     * Set isActive
     *
     * @param boolean $isActive
     *
     * @return AddrStreet
     */
    public function setIsActive($isActive)
    {
        $this->isActive = $isActive;

        return $this;
    }

    /**
     * Get isActive
     *
     * @return boolean
     */
    public function getIsActive()
    {
        return $this->isActive;
    }

    /**
     * Set theGeom900913
     *
     * @param linestring $theGeom900913
     *
     * @return AddrStreet
     */
    public function setTheGeom900913($theGeom900913)
    {
        $this->theGeom900913 = $theGeom900913;

        return $this;
    }

    /**
     * Get theGeom900913
     *
     * @return linestring
     */
    public function getTheGeom900913()
    {
        return $this->theGeom900913;
    }

    /**
     * Set idDistrict
     *
     * @param integer $idDistrict
     *
     * @return AddrStreet
     */
    public function setIdDistrict($idDistrict)
    {
        $this->idDistrict = $idDistrict;

        return $this;
    }

    /**
     * Get idDistrict
     *
     * @return integer
     */
    public function getIdDistrict()
    {
        return $this->idDistrict;
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $addNumber;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->addNumber = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add addNumber
     *
     * @param \kmdaBundle\Entity\AddrNumber $addNumber
     *
     * @return AddrStreet
     */
    public function addAddNumber(\kmdaBundle\Entity\AddrNumber $addNumber)
    {
        $this->addNumber[] = $addNumber;

        return $this;
    }

    /**
     * Remove addNumber
     *
     * @param \kmdaBundle\Entity\AddrNumber $addNumber
     */
    public function removeAddNumber(\kmdaBundle\Entity\AddrNumber $addNumber)
    {
        $this->addNumber->removeElement($addNumber);
    }

    /**
     * Get addNumber
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAddNumber()
    {
        return $this->addNumber;
    }
}
