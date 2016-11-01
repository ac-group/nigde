<?php

namespace kmdaBundle\Entity;

/**
 * Street
 */
class Street
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var geometry
     */
    private $the_geom;

    /**
     * @var integer
     */
    private $itemid;

    /**
     * @var integer
     */
    private $code_obj;

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
     * @var integer
     */
    private $categ_code;

    /**
     * @var string
     */
    private $region_adm;

    /**
     * @var string
     */
    private $doctype;

    /**
     * @var string
     */
    private $docname;

    /**
     * @var \DateTime
     */
    private $docdate;

    /**
     * @var string
     */
    private $docnumber;

    /**
     * @var string
     */
    private $doclink;

    /**
     * @var string
     */
    private $placetype;

    /**
     * @var integer
     */
    private $status_vul;

    /**
     * @var integer
     */
    private $local_type;

    /**
     * @var integer
     */
    private $source_koo;

    /**
     * @var float
     */
    private $shp_leng;

    /**
     * @var string
     */
    private $sad_tov;

    /**
     * @var string
     */
    private $doccode;

    /**
     * @var float
     */
    private $shp_stle;

    /**
     * @var \DateTime
     */
    private $relisedate;

    /**
     * @var \DateTime
     */
    private $date_s;

    /**
     * @var \DateTime
     */
    private $date_e;

    /**
     * @var integer
     */
    private $status;

    /**
     * @var integer
     */
    private $id_region;

    /**
     * @var \kmdaBundle\Entity\Street_Type
     */
    private $Street_Type;


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
     * Set theGeom
     *
     * @param geometry $theGeom
     *
     * @return Street
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

    /**
     * Set itemid
     *
     * @param integer $itemid
     *
     * @return Street
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
     * Set codeObj
     *
     * @param integer $codeObj
     *
     * @return Street
     */
    public function setCodeObj($codeObj)
    {
        $this->code_obj = $codeObj;

        return $this;
    }

    /**
     * Get codeObj
     *
     * @return integer
     */
    public function getCodeObj()
    {
        return $this->code_obj;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Street
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
     * @return Street
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
     * @return Street
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
     * @return Street
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
     * @return Street
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
     * @return Street
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

    /**
     * Set categCode
     *
     * @param integer $categCode
     *
     * @return Street
     */
    public function setCategCode($categCode)
    {
        $this->categ_code = $categCode;

        return $this;
    }

    /**
     * Get categCode
     *
     * @return integer
     */
    public function getCategCode()
    {
        return $this->categ_code;
    }

    /**
     * Set regionAdm
     *
     * @param string $regionAdm
     *
     * @return Street
     */
    public function setRegionAdm($regionAdm)
    {
        $this->region_adm = $regionAdm;

        return $this;
    }

    /**
     * Get regionAdm
     *
     * @return string
     */
    public function getRegionAdm()
    {
        return $this->region_adm;
    }

    /**
     * Set doctype
     *
     * @param string $doctype
     *
     * @return Street
     */
    public function setDoctype($doctype)
    {
        $this->doctype = $doctype;

        return $this;
    }

    /**
     * Get doctype
     *
     * @return string
     */
    public function getDoctype()
    {
        return $this->doctype;
    }

    /**
     * Set docname
     *
     * @param string $docname
     *
     * @return Street
     */
    public function setDocname($docname)
    {
        $this->docname = $docname;

        return $this;
    }

    /**
     * Get docname
     *
     * @return string
     */
    public function getDocname()
    {
        return $this->docname;
    }

    /**
     * Set docdate
     *
     * @param \DateTime $docdate
     *
     * @return Street
     */
    public function setDocdate($docdate)
    {
        $this->docdate = $docdate;

        return $this;
    }

    /**
     * Get docdate
     *
     * @return \DateTime
     */
    public function getDocdate()
    {
        return $this->docdate;
    }

    /**
     * Set docnumber
     *
     * @param string $docnumber
     *
     * @return Street
     */
    public function setDocnumber($docnumber)
    {
        $this->docnumber = $docnumber;

        return $this;
    }

    /**
     * Get docnumber
     *
     * @return string
     */
    public function getDocnumber()
    {
        return $this->docnumber;
    }

    /**
     * Set doclink
     *
     * @param string $doclink
     *
     * @return Street
     */
    public function setDoclink($doclink)
    {
        $this->doclink = $doclink;

        return $this;
    }

    /**
     * Get doclink
     *
     * @return string
     */
    public function getDoclink()
    {
        return $this->doclink;
    }

    /**
     * Set placetype
     *
     * @param string $placetype
     *
     * @return Street
     */
    public function setPlacetype($placetype)
    {
        $this->placetype = $placetype;

        return $this;
    }

    /**
     * Get placetype
     *
     * @return string
     */
    public function getPlacetype()
    {
        return $this->placetype;
    }

    /**
     * Set statusVul
     *
     * @param integer $statusVul
     *
     * @return Street
     */
    public function setStatusVul($statusVul)
    {
        $this->status_vul = $statusVul;

        return $this;
    }

    /**
     * Get statusVul
     *
     * @return integer
     */
    public function getStatusVul()
    {
        return $this->status_vul;
    }

    /**
     * Set localType
     *
     * @param integer $localType
     *
     * @return Street
     */
    public function setLocalType($localType)
    {
        $this->local_type = $localType;

        return $this;
    }

    /**
     * Get localType
     *
     * @return integer
     */
    public function getLocalType()
    {
        return $this->local_type;
    }

    /**
     * Set sourceKoo
     *
     * @param integer $sourceKoo
     *
     * @return Street
     */
    public function setSourceKoo($sourceKoo)
    {
        $this->source_koo = $sourceKoo;

        return $this;
    }

    /**
     * Get sourceKoo
     *
     * @return integer
     */
    public function getSourceKoo()
    {
        return $this->source_koo;
    }

    /**
     * Set shpLeng
     *
     * @param float $shpLeng
     *
     * @return Street
     */
    public function setShpLeng($shpLeng)
    {
        $this->shp_leng = $shpLeng;

        return $this;
    }

    /**
     * Get shpLeng
     *
     * @return float
     */
    public function getShpLeng()
    {
        return $this->shp_leng;
    }

    /**
     * Set sadTov
     *
     * @param string $sadTov
     *
     * @return Street
     */
    public function setSadTov($sadTov)
    {
        $this->sad_tov = $sadTov;

        return $this;
    }

    /**
     * Get sadTov
     *
     * @return string
     */
    public function getSadTov()
    {
        return $this->sad_tov;
    }

    /**
     * Set doccode
     *
     * @param string $doccode
     *
     * @return Street
     */
    public function setDoccode($doccode)
    {
        $this->doccode = $doccode;

        return $this;
    }

    /**
     * Get doccode
     *
     * @return string
     */
    public function getDoccode()
    {
        return $this->doccode;
    }

    /**
     * Set shpStle
     *
     * @param float $shpStle
     *
     * @return Street
     */
    public function setShpStle($shpStle)
    {
        $this->shp_stle = $shpStle;

        return $this;
    }

    /**
     * Get shpStle
     *
     * @return float
     */
    public function getShpStle()
    {
        return $this->shp_stle;
    }

    /**
     * Set relisedate
     *
     * @param \DateTime $relisedate
     *
     * @return Street
     */
    public function setRelisedate($relisedate)
    {
        $this->relisedate = $relisedate;

        return $this;
    }

    /**
     * Get relisedate
     *
     * @return \DateTime
     */
    public function getRelisedate()
    {
        return $this->relisedate;
    }

    /**
     * Set dateS
     *
     * @param \DateTime $dateS
     *
     * @return Street
     */
    public function setDateS($dateS)
    {
        $this->date_s = $dateS;

        return $this;
    }

    /**
     * Get dateS
     *
     * @return \DateTime
     */
    public function getDateS()
    {
        return $this->date_s;
    }

    /**
     * Set dateE
     *
     * @param \DateTime $dateE
     *
     * @return Street
     */
    public function setDateE($dateE)
    {
        $this->date_e = $dateE;

        return $this;
    }

    /**
     * Get dateE
     *
     * @return \DateTime
     */
    public function getDateE()
    {
        return $this->date_e;
    }

    /**
     * Set status
     *
     * @param integer $status
     *
     * @return Street
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return integer
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set idRegion
     *
     * @param integer $idRegion
     *
     * @return Street
     */
    public function setIdRegion($idRegion)
    {
        $this->id_region = $idRegion;

        return $this;
    }

    /**
     * Get idRegion
     *
     * @return integer
     */
    public function getIdRegion()
    {
        return $this->id_region;
    }

    /**
     * Set streetType
     *
     * @param \kmdaBundle\Entity\Street_Type $streetType
     *
     * @return Street
     */
    public function setStreetType(\kmdaBundle\Entity\Street_Type $streetType = null)
    {
        $this->Street_Type = $streetType;

        return $this;
    }

    /**
     * Get streetType
     *
     * @return \kmdaBundle\Entity\Street_Type
     */
    public function getStreetType()
    {
        return $this->Street_Type;
    }
    

    /**
     * @var string
     */
    private $full_name;


    /**
     * Set fullName
     *
     * @param string $fullName
     *
     * @return Street
     */
    public function setFullName($fullName)
    {
        $this->full_name = $fullName;

        return $this;
    }

    /**
     * Get fullName
     *
     * @return string
     */
    public function getFullName()
    {
        return $this->full_name;
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $addrNumber;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->addrNumber = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add addrNumber
     *
     * @param \kmdaBundle\Entity\AddrNumber $addrNumber
     *
     * @return Street
     */
    public function addAddrNumber(\kmdaBundle\Entity\AddrNumber $addrNumber)
    {
        $this->addrNumber[] = $addrNumber;

        return $this;
    }

    /**
     * Remove addrNumber
     *
     * @param \kmdaBundle\Entity\AddrNumber $addrNumber
     */
    public function removeAddrNumber(\kmdaBundle\Entity\AddrNumber $addrNumber)
    {
        $this->addrNumber->removeElement($addrNumber);
    }

    /**
     * Get addrNumber
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAddrNumber()
    {
        return $this->addrNumber;
    }
    
    public function __toString() {
        return $this->getFullName();
    }
    /**
     * @var integer
     */
    private $street_id;


    /**
     * Set streetId
     *
     * @param integer $streetId
     *
     * @return Street
     */
    public function setStreetId($streetId)
    {
        $this->street_id = $streetId;

        return $this;
    }

    /**
     * Get streetId
     *
     * @return integer
     */
    public function getStreetId()
    {
        return $this->street_id;
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $addr_num;


    /**
     * Add addrNum
     *
     * @param \kmdaBundle\Entity\AddrNumber $addrNum
     *
     * @return Street
     */
    public function addAddrNum(\kmdaBundle\Entity\AddrNumber $addrNum)
    {
        $this->addr_num[] = $addrNum;

        return $this;
    }

    /**
     * Remove addrNum
     *
     * @param \kmdaBundle\Entity\AddrNumber $addrNum
     */
    public function removeAddrNum(\kmdaBundle\Entity\AddrNumber $addrNum)
    {
        $this->addr_num->removeElement($addrNum);
    }

    /**
     * Get addrNum
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAddrNum()
    {
        return $this->addr_num;
    }
}
