<?php

namespace kmdaBundle\Entity;
use Gedmo\Mapping\Annotation as Gedmo;
/**
 * OrendaDoc
 */
class OrendaDoc
{
    const STATUS_DRAFT = 1;
    const STATUS_AGREEMENT1 = 2;
    const STATUS_AGREEMENT2 = 3;
    private $status;
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $note;

    public function setStatus($status)
    {
        $this->$status = $status;
    }

    public function getStatus()
    {
        return $this->status;
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
     * Set note
     *
     * @param string $note
     *
     * @return OrendaDoc
     */
    public function setNote($note)
    {
        $this->note = $note;

        return $this;
    }

    
    private $note2;
    /**
     * Get note
     *
     * @return string
     */
    public function getNote2()
    {
        return $this->note2;
    }

    public function setNote2($note2)
    {
        $this->note2 = $note2;

        return $this;
    }

    /**
     * Get note
     *
     * @return string
     */
    public function getNote()
    {
        return $this->note;
    }
    /**
     * @var \kmdaBundle\Entity\kmdaObject
     */
    private $kmdaobject;


    /**
     * Set kmdaobject
     *
     * @param \kmdaBundle\Entity\kmdaObject $kmdaobject
     *
     * @return OrendaDoc
     */
    public function setKmdaobject(\kmdaBundle\Entity\kmdaObject $kmdaobject = null)
    {
        $this->kmdaobject = $kmdaobject;

        return $this;
    }

    /**
     * Get kmdaobject
     *
     * @return \kmdaBundle\Entity\kmdaObject
     */
    public function getKmdaobject()
    {
        return $this->kmdaobject;
    }
    public function __toString() {
        return $this->getNote();
    }
    /**
     * @var boolean
     */
    private $agreem1 = false;

    /**
     * @var boolean
     */
    private $agreem2 = false;


    /**
     * Set agreem1
     *
     * @param boolean $agreem1
     *
     * @return OrendaDoc
     */
    public function setAgreem1($agreem1)
    {
        $this->agreem1 = $agreem1;

        return $this;
    }

    /**
     * Get agreem1
     *
     * @return boolean
     */
    public function getAgreem1()
    {
        return $this->agreem1;
    }

    /**
     * Set agreem2
     *
     * @param boolean $agreem2
     *
     * @return OrendaDoc
     */
    public function setAgreem2($agreem2)
    {
        $this->agreem2 = $agreem2;

        return $this;
    }

    /**
     * Get agreem2
     *
     * @return boolean
     */
    public function getAgreem2()
    {
        return $this->agreem2;
    }
    /**
     * @var integer
     */
    private $sqrrent;

    /**
     * @var integer
     */
    private $costrentagreement;

    
    private $organization;


    /**
     * Set sqrrent
     *
     * @param integer $sqrrent
     *
     * @return OrendaDoc
     */
    public function setSqrrent($sqrrent)
    {
        $this->sqrrent = $sqrrent;

        return $this;
    }

    /**
     * Get sqrrent
     *
     * @return integer
     */
    public function getSqrrent()
    {
        return $this->sqrrent;
    }

    /**
     * Set costrentagreement
     *
     * @param integer $costrentagreement
     *
     * @return OrendaDoc
     */
    public function setCostrentagreement($costrentagreement)
    {
        $this->costrentagreement = $costrentagreement;

        return $this;
    }

    /**
     * Get costrentagreement
     *
     * @return integer
     */
    public function getCostrentagreement()
    {
        return $this->costrentagreement;
    }

    /**
     * Set organization
     *
     * @param \kmdaBundle\Entity\Organization $organization
     *
     * @return OrendaDoc
     */
    public function setOrganization($organization)
    {
        $this->organization = $organization;

        return $this;
    }

    /**
     * Get organization
     *
     * @return \kmdaBundle\Entity\Organization
     */
    public function getOrganization()
    {
        return $this->organization;
    }
    /**
     * @var \DateTime
     */
    private $created;

    /**
     * @var \DateTime
     */
    private $updated;


    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return OrendaDoc
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set updated
     *
     * @param \DateTime $updated
     *
     * @return OrendaDoc
     */
    public function setUpdated($updated)
    {
        $this->updated = $updated;

        return $this;
    }

    /**
     * Get updated
     *
     * @return \DateTime
     */
    public function getUpdated()
    {
        return $this->updated;
    }
    
    private $tip;
    
    public function setTip($tip)
    {
        $this->tip = $tip;

        return $this;
    }

    /**
     * Get agreem1
     *
     * @return boolean
     */
    public function getTip()
    {
        return $this->tip;
    }
    private $solution;
    public function setSolution($solution) {
        $this->solution=$solution;
        return $this;
    }
    public function getSolution() {
        return $this->solution;
    }
    /**
     * @var string
     */
    private $agreementNumber;

    /**
     * @var string
     */
    private $incomeNumber;

    /**
     * @var string
     */
    private $outgoingNumber;

    /**
     * @var \DateTime
     */
    private $entryToLessorDate;

    /**
     * @var \DateTime
     */
    private $entryToCommisDate;

    /**
     * @var \DateTime
     */
    private $reviewDate;

    /**
     * @var \DateTime
     */
    private $announcementDate;

    /**
     * @var \DateTime
     */
    private $valuationDate;

    /**
     * @var string
     */
    private $valuationNumber;

    /**
     * @var string
     */
    private $valuator;

    /**
     * @var string
     */
    private $landLord;

    /**
     * @var string
     */
    private $balanceHolder;

    /**
     * @var string
     */
    private $edrpouOrganization;

    /**
     * @var string
     */
    private $houseKind;

    /**
     * @var string
     */
    private $propertyRentObject;

    /**
     * @var string
     */
    private $category;

    /**
     * @var integer
     */
    private $rentRatePercent;

    /**
     * @var integer
     */
    private $rentKind;

    /**
     * @var string
     */
    private $cost1month;

    /**
     * @var string
     */
    private $costObject;

    /**
     * @var string
     */
    private $leaseTerm;

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
     * Set agreementNumber
     *
     * @param string $agreementNumber
     *
     * @return OrendaDoc
     */
    public function setAgreementNumber($agreementNumber)
    {
        $this->agreementNumber = $agreementNumber;

        return $this;
    }

    /**
     * Get agreementNumber
     *
     * @return string
     */
    public function getAgreementNumber()
    {
        return $this->agreementNumber;
    }

    /**
     * Set incomeNumber
     *
     * @param string $incomeNumber
     *
     * @return OrendaDoc
     */
    public function setIncomeNumber($incomeNumber)
    {
        $this->incomeNumber = $incomeNumber;

        return $this;
    }

    /**
     * Get incomeNumber
     *
     * @return string
     */
    public function getIncomeNumber()
    {
        return $this->incomeNumber;
    }

    /**
     * Set outgoingNumber
     *
     * @param string $outgoingNumber
     *
     * @return OrendaDoc
     */
    public function setOutgoingNumber($outgoingNumber)
    {
        $this->outgoingNumber = $outgoingNumber;

        return $this;
    }

    /**
     * Get outgoingNumber
     *
     * @return string
     */
    public function getOutgoingNumber()
    {
        return $this->outgoingNumber;
    }

    /**
     * Set entryToLessorDate
     *
     * @param \DateTime $entryToLessorDate
     *
     * @return OrendaDoc
     */
    public function setEntryToLessorDate($entryToLessorDate)
    {
        $this->entryToLessorDate = $entryToLessorDate;

        return $this;
    }

    /**
     * Get entryToLessorDate
     *
     * @return \DateTime
     */
    public function getEntryToLessorDate()
    {
        return $this->entryToLessorDate;
    }

    /**
     * Set entryToCommisDate
     *
     * @param \DateTime $entryToCommisDate
     *
     * @return OrendaDoc
     */
    public function setEntryToCommisDate($entryToCommisDate)
    {
        $this->entryToCommisDate = $entryToCommisDate;

        return $this;
    }

    /**
     * Get entryToCommisDate
     *
     * @return \DateTime
     */
    public function getEntryToCommisDate()
    {
        return $this->entryToCommisDate;
    }

    /**
     * Set reviewDate
     *
     * @param \DateTime $reviewDate
     *
     * @return OrendaDoc
     */
    public function setReviewDate($reviewDate)
    {
        $this->reviewDate = $reviewDate;

        return $this;
    }

    /**
     * Get reviewDate
     *
     * @return \DateTime
     */
    public function getReviewDate()
    {
        return $this->reviewDate;
    }

    /**
     * Set announcementDate
     *
     * @param \DateTime $announcementDate
     *
     * @return OrendaDoc
     */
    public function setAnnouncementDate($announcementDate)
    {
        $this->announcementDate = $announcementDate;

        return $this;
    }

    /**
     * Get announcementDate
     *
     * @return \DateTime
     */
    public function getAnnouncementDate()
    {
        return $this->announcementDate;
    }

    /**
     * Set valuationDate
     *
     * @param \DateTime $valuationDate
     *
     * @return OrendaDoc
     */
    public function setValuationDate($valuationDate)
    {
        $this->valuationDate = $valuationDate;

        return $this;
    }

    /**
     * Get valuationDate
     *
     * @return \DateTime
     */
    public function getValuationDate()
    {
        return $this->valuationDate;
    }

    /**
     * Set valuationNumber
     *
     * @param string $valuationNumber
     *
     * @return OrendaDoc
     */
    public function setValuationNumber($valuationNumber)
    {
        $this->valuationNumber = $valuationNumber;

        return $this;
    }

    /**
     * Get valuationNumber
     *
     * @return string
     */
    public function getValuationNumber()
    {
        return $this->valuationNumber;
    }

    /**
     * Set valuator
     *
     * @param string $valuator
     *
     * @return OrendaDoc
     */
    public function setValuator($valuator)
    {
        $this->valuator = $valuator;

        return $this;
    }

    /**
     * Get valuator
     *
     * @return string
     */
    public function getValuator()
    {
        return $this->valuator;
    }

    /**
     * Set landLord
     *
     * @param string $landLord
     *
     * @return OrendaDoc
     */
    public function setLandLord($landLord)
    {
        $this->landLord = $landLord;

        return $this;
    }

    /**
     * Get landLord
     *
     * @return string
     */
    public function getLandLord()
    {
        return $this->landLord;
    }

    /**
     * Set balanceHolder
     *
     * @param string $balanceHolder
     *
     * @return OrendaDoc
     */
    public function setBalanceHolder($balanceHolder)
    {
        $this->balanceHolder = $balanceHolder;

        return $this;
    }

    /**
     * Get balanceHolder
     *
     * @return string
     */
    public function getBalanceHolder()
    {
        return $this->balanceHolder;
    }

    /**
     * Set edrpouOrganization
     *
     * @param string $edrpouOrganization
     *
     * @return OrendaDoc
     */
    public function setEdrpouOrganization($edrpouOrganization)
    {
        $this->edrpouOrganization = $edrpouOrganization;

        return $this;
    }

    /**
     * Get edrpouOrganization
     *
     * @return string
     */
    public function getEdrpouOrganization()
    {
        return $this->edrpouOrganization;
    }

    /**
     * Set houseKind
     *
     * @param string $houseKind
     *
     * @return OrendaDoc
     */
    public function setHouseKind($houseKind)
    {
        $this->houseKind = $houseKind;

        return $this;
    }

    /**
     * Get houseKind
     *
     * @return string
     */
    public function getHouseKind()
    {
        return $this->houseKind;
    }

    /**
     * Set propertyRentObject
     *
     * @param string $propertyRentObject
     *
     * @return OrendaDoc
     */
    public function setPropertyRentObject($propertyRentObject)
    {
        $this->propertyRentObject = $propertyRentObject;

        return $this;
    }

    /**
     * Get propertyRentObject
     *
     * @return string
     */
    public function getPropertyRentObject()
    {
        return $this->propertyRentObject;
    }

    /**
     * Set category
     *
     * @param string $category
     *
     * @return OrendaDoc
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return string
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set rentRatePercent
     *
     * @param integer $rentRatePercent
     *
     * @return OrendaDoc
     */
    public function setRentRatePercent($rentRatePercent)
    {
        $this->rentRatePercent = $rentRatePercent;

        return $this;
    }

    /**
     * Get rentRatePercent
     *
     * @return integer
     */
    public function getRentRatePercent()
    {
        return $this->rentRatePercent;
    }

    /**
     * Set rentKind
     *
     * @param integer $rentKind
     *
     * @return OrendaDoc
     */
    public function setRentKind($rentKind)
    {
        $this->rentKind = $rentKind;

        return $this;
    }

    /**
     * Get rentKind
     *
     * @return integer
     */
    public function getRentKind()
    {
        return $this->rentKind;
    }

    /**
     * Set cost1month
     *
     * @param string $cost1month
     *
     * @return OrendaDoc
     */
    public function setCost1month($cost1month)
    {
        $this->cost1month = $cost1month;

        return $this;
    }

    /**
     * Get cost1month
     *
     * @return string
     */
    public function getCost1month()
    {
        return $this->cost1month;
    }

    /**
     * Set costObject
     *
     * @param string $costObject
     *
     * @return OrendaDoc
     */
    public function setCostObject($costObject)
    {
        $this->costObject = $costObject;

        return $this;
    }

    /**
     * Get costObject
     *
     * @return string
     */
    public function getCostObject()
    {
        return $this->costObject;
    }

    /**
     * Set leaseTerm
     *
     * @param string $leaseTerm
     *
     * @return OrendaDoc
     */
    public function setLeaseTerm($leaseTerm)
    {
        $this->leaseTerm = $leaseTerm;

        return $this;
    }

    /**
     * Get leaseTerm
     *
     * @return string
     */
    public function getLeaseTerm()
    {
        return $this->leaseTerm;
    }

    /**
     * Add purpose
     *
     * @param \kmdaBundle\Entity\Purpose $purpose
     *
     * @return OrendaDoc
     */
    public function addPurpose(\kmdaBundle\Entity\Purpose $purpose)
    {
        $this->purpose[] = $purpose;

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
     * @var string
     */
    private $rentType;


    /**
     * Set rentType
     *
     * @param string $rentType
     *
     * @return OrendaDoc
     */
    public function setRentType($rentType)
    {
        $this->rentType = $rentType;

        return $this;
    }

    /**
     * Get rentType
     *
     * @return string
     */
    public function getRentType()
    {
        return $this->rentType;
    }

    /**
     * Set purpose
     *
     * @param string $purpose
     *
     * @return OrendaDoc
     */
    public function setPurpose($purpose)
    {
        $this->purpose = $purpose;

        return $this;
    }
}
