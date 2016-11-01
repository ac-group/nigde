<?php

namespace kmdaBundle\Entity;

/**
 * BalanceObjectPhoto
 */
class BalanceObjectPhoto
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $long_id;

    /**
     * @var integer
     */
    private $sourceid;

    /**
     * @var string
     */
    private $filename;

    /**
     * @var string
     */
    private $fileext;

    /**
     * @var string
     */
    private $image;

    /**
     * @var \kmdaBundle\Entity\BalanceObject
     */
    private $balanceobject;


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
     * Set longId
     *
     * @param string $longId
     *
     * @return BalanceObjectPhoto
     */
    public function setLongId($longId)
    {
        $this->long_id = $longId;

        return $this;
    }

    /**
     * Get longId
     *
     * @return string
     */
    public function getLongId()
    {
        return $this->long_id;
    }

    /**
     * Set sourceid
     *
     * @param integer $sourceid
     *
     * @return BalanceObjectPhoto
     */
    public function setSourceid($sourceid)
    {
        $this->sourceid = $sourceid;

        return $this;
    }

    /**
     * Get sourceid
     *
     * @return integer
     */
    public function getSourceid()
    {
        return $this->sourceid;
    }

    /**
     * Set filename
     *
     * @param string $filename
     *
     * @return BalanceObjectPhoto
     */
    public function setFilename($filename)
    {
        $this->filename = $filename;

        return $this;
    }

    /**
     * Get filename
     *
     * @return string
     */
    public function getFilename()
    {
        return $this->filename;
    }

    /**
     * Set fileext
     *
     * @param string $fileext
     *
     * @return BalanceObjectPhoto
     */
    public function setFileext($fileext)
    {
        $this->fileext = $fileext;

        return $this;
    }

    /**
     * Get fileext
     *
     * @return string
     */
    public function getFileext()
    {
        return $this->fileext;
    }

    /**
     * Set image
     *
     * @param string $image
     *
     * @return BalanceObjectPhoto
     */
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image
     *
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set balanceobject
     *
     * @param \kmdaBundle\Entity\BalanceObject $balanceobject
     *
     * @return BalanceObjectPhoto
     */
    public function setBalanceobject(\kmdaBundle\Entity\BalanceObject $balanceobject = null)
    {
        $this->balanceobject = $balanceobject;

        return $this;
    }

    /**
     * Get balanceobject
     *
     * @return \kmdaBundle\Entity\BalanceObject
     */
    public function getBalanceobject()
    {
        return $this->balanceobject;
    }
    /**
     * @var string
     */
    private $createdate;

    /**
     * @var string
     */
    private $image_info;

    /**
     * @var integer
     */
    private $thumbnailheight;

    /**
     * @var integer
     */
    private $thumbnailwidth;


    /**
     * Set createdate
     *
     * @param string $createdate
     *
     * @return BalanceObjectPhoto
     */
    public function setCreatedate($createdate)
    {
        $this->createdate = $createdate;

        return $this;
    }

    /**
     * Get createdate
     *
     * @return string
     */
    public function getCreatedate()
    {
        return $this->createdate;
    }

    /**
     * Set imageInfo
     *
     * @param string $imageInfo
     *
     * @return BalanceObjectPhoto
     */
    public function setImageInfo($imageInfo)
    {
        $this->image_info = $imageInfo;

        return $this;
    }

    /**
     * Get imageInfo
     *
     * @return string
     */
    public function getImageInfo()
    {
        return $this->image_info;
    }

    /**
     * Set thumbnailheight
     *
     * @param integer $thumbnailheight
     *
     * @return BalanceObjectPhoto
     */
    public function setThumbnailheight($thumbnailheight)
    {
        $this->thumbnailheight = $thumbnailheight;

        return $this;
    }

    /**
     * Get thumbnailheight
     *
     * @return integer
     */
    public function getThumbnailheight()
    {
        return $this->thumbnailheight;
    }

    /**
     * Set thumbnailwidth
     *
     * @param integer $thumbnailwidth
     *
     * @return BalanceObjectPhoto
     */
    public function setThumbnailwidth($thumbnailwidth)
    {
        $this->thumbnailwidth = $thumbnailwidth;

        return $this;
    }

    /**
     * Get thumbnailwidth
     *
     * @return integer
     */
    public function getThumbnailwidth()
    {
        return $this->thumbnailwidth;
    }
    /**
     * @var integer
     */
    private $﻿id;

    /**
     * @var string
     */
    private $fileName;

    /**
     * @var string
     */
    private $fileExt;

    /**
     * @var \DateTime
     */
    private $fileCreateDate;

    /**
     * @var string
     */
    private $thumbnailHeight;

    /**
     * @var string
     */
    private $thumbnailWidth;

    /**
     * @var string
     */
    private $filePath;


    /**
     * Get ﻿id
     *
     * @return integer
     */
    public function get﻿id()
    {
        return $this->﻿id;
    }

    /**
     * Set fileCreateDate
     *
     * @param \DateTime $fileCreateDate
     *
     * @return BalanceObjectPhoto
     */
    public function setFileCreateDate($fileCreateDate)
    {
        $this->fileCreateDate = $fileCreateDate;

        return $this;
    }

    /**
     * Get fileCreateDate
     *
     * @return \DateTime
     */
    public function getFileCreateDate()
    {
        return $this->fileCreateDate;
    }

    /**
     * Set filePath
     *
     * @param string $filePath
     *
     * @return BalanceObjectPhoto
     */
    public function setFilePath($filePath)
    {
        $this->filePath = $filePath;

        return $this;
    }

    /**
     * Get filePath
     *
     * @return string
     */
    public function getFilePath()
    {
        return $this->filePath;
    }
}
