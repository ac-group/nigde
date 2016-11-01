<?php

namespace kmdaBundle\Entity;

/**
 * GeocodingPoint
 */
class GeocodingPoint
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $latitude;

    /**
     * @var string
     */
    private $longtitude;

    /**
     * @var point
     */
    private $theGeom900913;


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
     * Set latitude
     *
     * @param string $latitude
     *
     * @return GeocodingPoint
     */
    public function setLatitude($latitude)
    {
        $this->latitude = $latitude;

        return $this;
    }

    /**
     * Get latitude
     *
     * @return string
     */
    public function getLatitude()
    {
        return $this->latitude;
    }

    /**
     * Set longtitude
     *
     * @param string $longtitude
     *
     * @return GeocodingPoint
     */
    public function setLongtitude($longtitude)
    {
        $this->longtitude = $longtitude;

        return $this;
    }

    /**
     * Get longtitude
     *
     * @return string
     */
    public function getLongtitude()
    {
        return $this->longtitude;
    }

    /**
     * Set theGeom900913
     *
     * @param point $theGeom900913
     *
     * @return GeocodingPoint
     */
    public function setTheGeom900913($theGeom900913)
    {
        $this->theGeom900913 = $theGeom900913;

        return $this;
    }

    /**
     * Get theGeom900913
     *
     * @return point
     */
    public function getTheGeom900913()
    {
        return $this->theGeom900913;
    }
}
