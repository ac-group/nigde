<?php

namespace kmdaBundle\Entity;

/**
 * JoinDistrictAddrStreet
 */
class JoinDistrictAddrStreet
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var \kmdaBundle\Entity\AddrStreet
     */
    private $idAddrStreet;

    /**
     * @var \kmdaBundle\Entity\District
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
     * Set idAddrStreet
     *
     * @param \kmdaBundle\Entity\AddrStreet $idAddrStreet
     *
     * @return JoinDistrictAddrStreet
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
     * Set idDistrict
     *
     * @param \kmdaBundle\Entity\District $idDistrict
     *
     * @return JoinDistrictAddrStreet
     */
    public function setIdDistrict(\kmdaBundle\Entity\District $idDistrict = null)
    {
        $this->idDistrict = $idDistrict;

        return $this;
    }

    /**
     * Get idDistrict
     *
     * @return \kmdaBundle\Entity\District
     */
    public function getIdDistrict()
    {
        return $this->idDistrict;
    }
}
