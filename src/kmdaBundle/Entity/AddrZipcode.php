<?php

namespace kmdaBundle\Entity;

/**
 * AddrZipcode
 */
class AddrZipcode
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $zipcode;


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
     * Set zipcode
     *
     * @param integer $zipcode
     *
     * @return AddrZipcode
     */
    public function setZipcode($zipcode)
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    /**
     * Get zipcode
     *
     * @return integer
     */
    public function getZipcode()
    {
        return $this->zipcode;
    }
}
