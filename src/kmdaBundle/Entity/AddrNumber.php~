<?php

namespace kmdaBundle\Entity;

/**
 * AddrNumber
 */
class AddrNumber
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $addrNumber;

    /**
     * @var boolean
     */
    private $isActive;

    /**
     * @var \kmdaBundle\Entity\AddrStreet
     */
    private $idAddrStreet;

    /**
     * @var \kmdaBundle\Entity\AddrZipcode
     */
    private $idAddrZipcode;

    /**
     * @var \kmdaBundle\Entity\GeocodingPoint
     */
    private $idGeocodingPoint;

    public function __toString() {
        if($this->getAddrNumber()===null) { return ''; }
        return $this->addrNumber;
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
     * Set addrNumber
     *
     * @param string $addrNumber
     *
     * @return AddrNumber
     */
    public function setAddrNumber($addrNumber)
    {
        $this->addrNumber = $addrNumber;

        return $this;
    }

    /**
     * Get addrNumber
     *
     * @return string
     */
    public function getAddrNumber()
    {
        return $this->addrNumber;
    }

    /**
     * Set isActive
     *
     * @param boolean $isActive
     *
     * @return AddrNumber
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
     * Set idAddrStreet
     *
     * @param \kmdaBundle\Entity\AddrStreet $idAddrStreet
     *
     * @return AddrNumber
     */
    public function setIdAddrStreet(\kmdaBundle\Entity\AddrStreet $idAddrStreet = null)
    {
        $this->idAddrStreet = $idAddrStreet;

        return $this;
    }

    /**
     * Get idAddrStreet
     *
     * @return \kmdaBundle\Entity\AddrStreet
     */
    public function getIdAddrStreet()
    {
        return $this->idAddrStreet;
    }

    /**
     * Set idAddrZipcode
     *
     * @param \kmdaBundle\Entity\AddrZipcode $idAddrZipcode
     *
     * @return AddrNumber
     */
    public function setIdAddrZipcode(\kmdaBundle\Entity\AddrZipcode $idAddrZipcode = null)
    {
        $this->idAddrZipcode = $idAddrZipcode;

        return $this;
    }

    /**
     * Get idAddrZipcode
     *
     * @return \kmdaBundle\Entity\AddrZipcode
     */
    public function getIdAddrZipcode()
    {
        return $this->idAddrZipcode;
    }

    /**
     * Set idGeocodingPoint
     *
     * @param \kmdaBundle\Entity\GeocodingPoint $idGeocodingPoint
     *
     * @return AddrNumber
     */
    public function setIdGeocodingPoint(\kmdaBundle\Entity\GeocodingPoint $idGeocodingPoint = null)
    {
        $this->idGeocodingPoint = $idGeocodingPoint;

        return $this;
    }

    /**
     * Get idGeocodingPoint
     *
     * @return \kmdaBundle\Entity\GeocodingPoint
     */
    public function getIdGeocodingPoint()
    {
        return $this->idGeocodingPoint;
    }
    /**
     * @var \kmdaBundle\Entity\Street
     */
    private $Street;


    /**
     * Set street
     *
     * @param \kmdaBundle\Entity\Street $street
     *
     * @return AddrNumber
     */
    public function setStreet(\kmdaBundle\Entity\Street $street = null)
    {
        $this->Street = $street;

        return $this;
    }

    /**
     * Get street
     *
     * @return \kmdaBundle\Entity\Street
     */
    public function getStreet()
    {
        return $this->Street;
    }
    /**
     * @var geometry
     */
    private $the_geom;


    /**
     * Set theGeom
     *
     * @param geometry $theGeom
     *
     * @return AddrNumber
     */
    public function setTheGeom($theGeom)
    {
        $this->the_geom = $theGeom;

        return $this;
    }

    /**
     * Get theGeom
     *
     * @return geometry
     */
    public function getTheGeom()
    {
        return $this->the_geom;
    }
}
