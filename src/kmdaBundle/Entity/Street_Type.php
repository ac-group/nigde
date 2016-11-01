<?php

namespace kmdaBundle\Entity;

/**
 * Street_Type
 */
class Street_Type
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $itemid;

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $shortname;

    /**
     * @var string
     */
    private $name_ru;

    /**
     * @var string
     */
    private $shortname_ru;

    /**
     * @var string
     */
    private $name_en;

    /**
     * @var string
     */
    private $shortname_en;


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
     * Set itemid
     *
     * @param integer $itemid
     *
     * @return Street_Type
     */
    public function setItemid($itemid)
    {
        $this->itemid = $itemid;

        return $this;
    }

    /**
     * Get itemid
     *
     * @return integer
     */
    public function getItemid()
    {
        return $this->itemid;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Street_Type
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
     * Set shortname
     *
     * @param string $shortname
     *
     * @return Street_Type
     */
    public function setShortname($shortname)
    {
        $this->shortname = $shortname;

        return $this;
    }

    /**
     * Get shortname
     *
     * @return string
     */
    public function getShortname()
    {
        return $this->shortname;
    }

    /**
     * Set nameRu
     *
     * @param string $nameRu
     *
     * @return Street_Type
     */
    public function setNameRu($nameRu)
    {
        $this->name_ru = $nameRu;

        return $this;
    }

    /**
     * Get nameRu
     *
     * @return string
     */
    public function getNameRu()
    {
        return $this->name_ru;
    }

    /**
     * Set shortnameRu
     *
     * @param string $shortnameRu
     *
     * @return Street_Type
     */
    public function setShortnameRu($shortnameRu)
    {
        $this->shortname_ru = $shortnameRu;

        return $this;
    }

    /**
     * Get shortnameRu
     *
     * @return string
     */
    public function getShortnameRu()
    {
        return $this->shortname_ru;
    }

    /**
     * Set nameEn
     *
     * @param string $nameEn
     *
     * @return Street_Type
     */
    public function setNameEn($nameEn)
    {
        $this->name_en = $nameEn;

        return $this;
    }

    /**
     * Get nameEn
     *
     * @return string
     */
    public function getNameEn()
    {
        return $this->name_en;
    }

    /**
     * Set shortnameEn
     *
     * @param string $shortnameEn
     *
     * @return Street_Type
     */
    public function setShortnameEn($shortnameEn)
    {
        $this->shortname_en = $shortnameEn;

        return $this;
    }

    /**
     * Get shortnameEn
     *
     * @return string
     */
    public function getShortnameEn()
    {
        return $this->shortname_en;
    }
}
