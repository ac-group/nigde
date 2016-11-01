<?php

namespace kmdaBundle\Entity;

/**
 * kmdaObject
 */
class kmdaObject
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var geometry
     */
    private $geocoding;

    /**
     * @var string
     */
    private $objectname;

    /**
     * @var string
     */
    private $addrstreet;

    /**
     * @var string
     */
    private $addrnumber;

    /**
     * @var string
     */
    private $sqrTotal;

    /**
     * @var string
     */
    private $costBalans;

    public function __toString() {
        return $this->getObjectname();
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
     * Set geocoding
     *
     * @param geometry $geocoding
     *
     * @return kmdaObject
     */
    public function setGeocoding($geocoding)
    {
        $this->geocoding = $geocoding;

        return $this;
    }

    /**
     * Get geocoding
     *
     * @return geometry
     */
    public function getGeocoding()
    {
        return $this->geocoding;
    }

    /**
     * Set objectname
     *
     * @param string $objectname
     *
     * @return kmdaObject
     */
    public function setObjectname($objectname)
    {
        $this->objectname = $objectname;

        return $this;
    }

    /**
     * Get objectname
     *
     * @return string
     */
    public function getObjectname()
    {
        return $this->objectname;
    }

    /**
     * Set addrstreet
     *
     * @param string $addrstreet
     *
     * @return kmdaObject
     */
    public function setAddrstreet($addrstreet)
    {
        $this->addrstreet = $addrstreet;

        return $this;
    }

    /**
     * Get addrstreet
     *
     * @return string
     */
    public function getAddrstreet()
    {
        return $this->addrstreet;
    }

    /**
     * Set addrnumber
     *
     * @param string $addrnumber
     *
     * @return kmdaObject
     */
    public function setAddrnumber($addrnumber)
    {
        $this->addrnumber = $addrnumber;

        return $this;
    }

    /**
     * Get addrnumber
     *
     * @return string
     */
    public function getAddrnumber()
    {
        return $this->addrnumber;
    }

    /**
     * Set sqrTotal
     *
     * @param string $sqrTotal
     *
     * @return kmdaObject
     */
    public function setSqrTotal($sqrTotal)
    {
        $this->sqrTotal = $sqrTotal;

        return $this;
    }

    /**
     * Get sqrTotal
     *
     * @return string
     */
    public function getSqrTotal()
    {
        return $this->sqrTotal;
    }

    /**
     * Set costBalans
     *
     * @param string $costBalans
     *
     * @return kmdaObject
     */
    public function setCostBalans($costBalans)
    {
        $this->costBalans = $costBalans;

        return $this;
    }

    /**
     * Get costBalans
     *
     * @return string
     */
    public function getCostBalans()
    {
        return $this->costBalans;
    }
    /**
     * @var \kmdaBundle\Entity\BuildingKind
     */
    private $buildingKind;


    /**
     * Set buildingKind
     *
     * @param \kmdaBundle\Entity\BuildingKind $buildingKind
     *
     * @return kmdaObject
     */
    public function setBuildingKind(\kmdaBundle\Entity\BuildingKind $buildingKind = null)
    {
        $this->buildingKind = $buildingKind;

        return $this;
    }

    /**
     * Get buildingKind
     *
     * @return \kmdaBundle\Entity\BuildingKind
     */
    public function getBuildingKind()
    {
        return $this->buildingKind;
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $purpose;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->purpose = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add purpose
     *
     * @param \kmdaBundle\Entity\Purpose $purpose
     *
     * @return kmdaObject
     */
    public function addPurpose(\kmdaBundle\Entity\Purpose $purpose)
    {
        $this->purpose[] = $purpose;
        $purpose->setKmdaObject($this);
        return $this;
    }

    /**
     * Remove purpose
     *
     * @param \kmdaBundle\Entity\Purpose $purpose
     */
    public function removePurpose(\kmdaBundle\Entity\Purpose $purpose)
    {
        $this->purpose->removeElement($purpose);
    }

    /**
     * Get purpose
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPurpose()
    {
        return $this->purpose;
    }
    /**
     * @var \kmdaBundle\Entity\District
     */
    private $district;


    /**
     * Set district
     *
     * @param \kmdaBundle\Entity\District $district
     *
     * @return kmdaObject
     */
    public function setDistrict(\kmdaBundle\Entity\District $district = null)
    {
        $this->district = $district;

        return $this;
    }

    /**
     * Get district
     *
     * @return \kmdaBundle\Entity\District
     */
    public function getDistrict()
    {
        return $this->district;
    }
}
