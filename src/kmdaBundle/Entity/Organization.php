<?php

namespace kmdaBundle\Entity;

/**
 * Organization
 */
class Organization
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $addrCity;

    /**
     * @var string
     */
    private $addrStreet;

    /**
     * @var string
     */
    private $addrNumber;

    /**
     * @var string
     */
    private $addrDistrict;

    /**
     * @var string
     */
    private $fullName;

    /**
     * @var integer
     */
    private $zkpoCode;

    /**
     * @var string
     */
    private $shortName;

    /**
     * @var string
     */
    private $directorName;

    /**
     * @var string
     */
    private $directorPhone;

    /**
     * @var string
     */
    private $directorEmail;

    /**
     * @var string
     */
    private $accountantName;

    /**
     * @var string
     */
    private $accountantPhone;

    /**
     * @var string
     */
    private $accountantEmail;

    /**
     * @var string
     */
    private $directorPost;

    /**
     * @var \kmdaBundle\Entity\BuildingFormOwnership
     */
    private $idFormOwnership;

    /**
     * @var \kmdaBundle\Entity\OrgIndustry
     */
    private $orgIndustryid;

    /**
     * @var \kmdaBundle\Entity\OrgKved
     */
    private $idOrgKved;

    /**
     * @var \kmdaBundle\Entity\OrgOccupation
     */
    private $idOrgOccupation;

    /**
     * @var \kmdaBundle\Entity\FormFunding
     */
    private $idFormFunding;

    /**
     * @var \kmdaBundle\Entity\FormGosp
     */
    private $idFormGosp;

    /**
     * @var \kmdaBundle\Entity\AdminAuth
     */
    private $idAdminAuth;

    /**
     * @var \kmdaBundle\Entity\DepartmentSubord
     */
    private $idDepartmentSubord;
    
    public function __toString() {
    //    if($this->getFullName()==null) { return ''; }
        return $this->getFullName();
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
     * Set addrCity
     *
     * @param string $addrCity
     *
     * @return Organization
     */
    public function setAddrCity($addrCity)
    {
        $this->addrCity = $addrCity;

        return $this;
    }

    /**
     * Get addrCity
     *
     * @return string
     */
    public function getAddrCity()
    {
        return $this->addrCity;
    }

    /**
     * Set addrStreet
     *
     * @param string $addrStreet
     *
     * @return Organization
     */
    public function setAddrStreet($addrStreet)
    {
        $this->addrStreet = $addrStreet;

        return $this;
    }

    /**
     * Get addrStreet
     *
     * @return string
     */
    public function getAddrStreet()
    {
        return $this->addrStreet;
    }

    /**
     * Set addrNumber
     *
     * @param string $addrNumber
     *
     * @return Organization
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
     * Set addrDistrict
     *
     * @param string $addrDistrict
     *
     * @return Organization
     */
    public function setAddrDistrict($addrDistrict)
    {
        $this->addrDistrict = $addrDistrict;

        return $this;
    }

    /**
     * Get addrDistrict
     *
     * @return string
     */
    public function getAddrDistrict()
    {
        return $this->addrDistrict;
    }

    /**
     * Set fullName
     *
     * @param string $fullName
     *
     * @return Organization
     */
    public function setFullName($fullName)
    {
        $this->fullName = $fullName;

        return $this;
    }

    /**
     * Get fullName
     *
     * @return string
     */
    public function getFullName()
    {
        return $this->fullName;
    }

    /**
     * Set zkpoCode
     *
     * @param integer $zkpoCode
     *
     * @return Organization
     */
    public function setZkpoCode($zkpoCode)
    {
        $this->zkpoCode = $zkpoCode;

        return $this;
    }

    /**
     * Get zkpoCode
     *
     * @return integer
     */
    public function getZkpoCode()
    {
        return $this->zkpoCode;
    }

    /**
     * Set shortName
     *
     * @param string $shortName
     *
     * @return Organization
     */
    public function setShortName($shortName)
    {
        $this->shortName = $shortName;

        return $this;
    }

    /**
     * Get shortName
     *
     * @return string
     */
    public function getShortName()
    {
        return $this->shortName;
    }

    /**
     * Set directorName
     *
     * @param string $directorName
     *
     * @return Organization
     */
    public function setDirectorName($directorName)
    {
        $this->directorName = $directorName;

        return $this;
    }

    /**
     * Get directorName
     *
     * @return string
     */
    public function getDirectorName()
    {
        return $this->directorName;
    }

    /**
     * Set directorPhone
     *
     * @param string $directorPhone
     *
     * @return Organization
     */
    public function setDirectorPhone($directorPhone)
    {
        $this->directorPhone = $directorPhone;

        return $this;
    }

    /**
     * Get directorPhone
     *
     * @return string
     */
    public function getDirectorPhone()
    {
        return $this->directorPhone;
    }

    /**
     * Set directorEmail
     *
     * @param string $directorEmail
     *
     * @return Organization
     */
    public function setDirectorEmail($directorEmail)
    {
        $this->directorEmail = $directorEmail;

        return $this;
    }

    /**
     * Get directorEmail
     *
     * @return string
     */
    public function getDirectorEmail()
    {
        return $this->directorEmail;
    }

    /**
     * Set accountantName
     *
     * @param string $accountantName
     *
     * @return Organization
     */
    public function setAccountantName($accountantName)
    {
        $this->accountantName = $accountantName;

        return $this;
    }

    /**
     * Get accountantName
     *
     * @return string
     */
    public function getAccountantName()
    {
        return $this->accountantName;
    }

    /**
     * Set accountantPhone
     *
     * @param string $accountantPhone
     *
     * @return Organization
     */
    public function setAccountantPhone($accountantPhone)
    {
        $this->accountantPhone = $accountantPhone;

        return $this;
    }

    /**
     * Get accountantPhone
     *
     * @return string
     */
    public function getAccountantPhone()
    {
        return $this->accountantPhone;
    }

    /**
     * Set accountantEmail
     *
     * @param string $accountantEmail
     *
     * @return Organization
     */
    public function setAccountantEmail($accountantEmail)
    {
        $this->accountantEmail = $accountantEmail;

        return $this;
    }

    /**
     * Get accountantEmail
     *
     * @return string
     */
    public function getAccountantEmail()
    {
        return $this->accountantEmail;
    }

    /**
     * Set directorPost
     *
     * @param string $directorPost
     *
     * @return Organization
     */
    public function setDirectorPost($directorPost)
    {
        $this->directorPost = $directorPost;

        return $this;
    }

    /**
     * Get directorPost
     *
     * @return string
     */
    public function getDirectorPost()
    {
        return $this->directorPost;
    }

    /**
     * Set idFormOwnership
     *
     * @param \kmdaBundle\Entity\BuildingFormOwnership $idFormOwnership
     *
     * @return Organization
     */
    public function setIdFormOwnership(\kmdaBundle\Entity\BuildingFormOwnership $idFormOwnership = null)
    {
        $this->idFormOwnership = $idFormOwnership;

        return $this;
    }

    /**
     * Get idFormOwnership
     *
     * @return \kmdaBundle\Entity\BuildingFormOwnership
     */
    public function getIdFormOwnership()
    {
        return $this->idFormOwnership;
    }

    /**
     * Set orgIndustryid
     *
     * @param \kmdaBundle\Entity\OrgIndustry $orgIndustryid
     *
     * @return Organization
     */
    public function setOrgIndustryid(\kmdaBundle\Entity\OrgIndustry $orgIndustryid = null)
    {
        $this->orgIndustryid = $orgIndustryid;

        return $this;
    }

    /**
     * Get orgIndustryid
     *
     * @return \kmdaBundle\Entity\OrgIndustry
     */
    public function getOrgIndustryid()
    {
        return $this->orgIndustryid;
    }

    /**
     * Set idOrgKved
     *
     * @param \kmdaBundle\Entity\OrgKved $idOrgKved
     *
     * @return Organization
     */
    public function setIdOrgKved(\kmdaBundle\Entity\OrgKved $idOrgKved = null)
    {
        $this->idOrgKved = $idOrgKved;

        return $this;
    }

    /**
     * Get idOrgKved
     *
     * @return \kmdaBundle\Entity\OrgKved
     */
    public function getIdOrgKved()
    {
        return $this->idOrgKved;
    }

    /**
     * Set idOrgOccupation
     *
     * @param \kmdaBundle\Entity\OrgOccupation $idOrgOccupation
     *
     * @return Organization
     */
    public function setIdOrgOccupation(\kmdaBundle\Entity\OrgOccupation $idOrgOccupation = null)
    {
        $this->idOrgOccupation = $idOrgOccupation;

        return $this;
    }

    /**
     * Get idOrgOccupation
     *
     * @return \kmdaBundle\Entity\OrgOccupation
     */
    public function getIdOrgOccupation()
    {
        return $this->idOrgOccupation;
    }

    /**
     * Set idFormFunding
     *
     * @param \kmdaBundle\Entity\FormFunding $idFormFunding
     *
     * @return Organization
     */
    public function setIdFormFunding(\kmdaBundle\Entity\FormFunding $idFormFunding = null)
    {
        $this->idFormFunding = $idFormFunding;

        return $this;
    }

    /**
     * Get idFormFunding
     *
     * @return \kmdaBundle\Entity\FormFunding
     */
    public function getIdFormFunding()
    {
        return $this->idFormFunding;
    }

    /**
     * Set idFormGosp
     *
     * @param \kmdaBundle\Entity\FormGosp $idFormGosp
     *
     * @return Organization
     */
    public function setIdFormGosp(\kmdaBundle\Entity\FormGosp $idFormGosp = null)
    {
        $this->idFormGosp = $idFormGosp;

        return $this;
    }

    /**
     * Get idFormGosp
     *
     * @return \kmdaBundle\Entity\FormGosp
     */
    public function getIdFormGosp()
    {
        return $this->idFormGosp;
    }

    /**
     * Set idAdminAuth
     *
     * @param \kmdaBundle\Entity\AdminAuth $idAdminAuth
     *
     * @return Organization
     */
    public function setIdAdminAuth(\kmdaBundle\Entity\AdminAuth $idAdminAuth = null)
    {
        $this->idAdminAuth = $idAdminAuth;

        return $this;
    }

    /**
     * Get idAdminAuth
     *
     * @return \kmdaBundle\Entity\AdminAuth
     */
    public function getIdAdminAuth()
    {
        return $this->idAdminAuth;
    }

    /**
     * Set idDepartmentSubord
     *
     * @param \kmdaBundle\Entity\DepartmentSubord $idDepartmentSubord
     *
     * @return Organization
     */
    public function setIdDepartmentSubord(\kmdaBundle\Entity\DepartmentSubord $idDepartmentSubord = null)
    {
        $this->idDepartmentSubord = $idDepartmentSubord;

        return $this;
    }

    /**
     * Get idDepartmentSubord
     *
     * @return \kmdaBundle\Entity\DepartmentSubord
     */
    public function getIdDepartmentSubord()
    {
        return $this->idDepartmentSubord;
    }
}
