<?php

namespace kmdaBundle\Entity;

/**
 * BalanceObject
 */
class BalanceObject
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $AddrStreet;

    /**
     * @var string
     */
    private $AddrNumber;

    /**
     * @var float
     */
    private $SqrTotal;

    /**
     * @var string
     */
    private $CostBalans;

    /**
     * @var string
     */
    private $ObjectName;


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
     * Set addrStreet
     *
     * @param string $addrStreet
     *
     * @return BalanceObject
     */
    public function setAddrStreet($addrStreet)
    {
        $this->AddrStreet = $addrStreet;

        return $this;
    }

    /**
     * Get addrStreet
     *
     * @return string
     */
    public function getAddrStreet()
    {
        return $this->AddrStreet;
    }

    /**
     * Set addrNumber
     *
     * @param string $addrNumber
     *
     * @return BalanceObject
     */
    public function setAddrNumber($addrNumber)
    {
        $this->AddrNumber = $addrNumber;

        return $this;
    }

    /**
     * Get addrNumber
     *
     * @return string
     */
    public function getAddrNumber()
    {
        return $this->AddrNumber;
    }

    /**
     * Set sqrTotal
     *
     * @param float $sqrTotal
     *
     * @return BalanceObject
     */
    public function setSqrTotal($sqrTotal)
    {
        $this->SqrTotal = $sqrTotal;

        return $this;
    }

    /**
     * Get sqrTotal
     *
     * @return float
     */
    public function getSqrTotal()
    {
        return $this->SqrTotal;
    }

    /**
     * Set costBalans
     *
     * @param string $costBalans
     *
     * @return BalanceObject
     */
    public function setCostBalans($costBalans)
    {
        $this->CostBalans = $costBalans;

        return $this;
    }

    /**
     * Get costBalans
     *
     * @return string
     */
    public function getCostBalans()
    {
        return $this->CostBalans;
    }

    /**
     * Set objectName
     *
     * @param string $objectName
     *
     * @return BalanceObject
     */
    public function setObjectName($objectName)
    {
        $this->ObjectName = $objectName;

        return $this;
    }

    /**
     * Get objectName
     *
     * @return string
     */
    public function getObjectName()
    {
        return $this->ObjectName;
    }
    /**
     * @var \kmdaBundle\Entity\GeoCoding
     */
    private $geocoding;


    /**
     * Set geocoding
     *
     * @param \kmdaBundle\Entity\GeoCoding $geocoding
     *
     * @return BalanceObject
     */
    public function setGeocoding(\kmdaBundle\Entity\GeoCoding $geocoding = null)
    {
        $this->geocoding = $geocoding;

        return $this;
    }

    /**
     * Get geocoding
     *
     * @return \kmdaBundle\Entity\GeoCoding
     */
    public function getGeocoding()
    {
        return $this->geocoding;
    }
    /**
     * @var \kmdaBundle\Entity\District
     */
    private $address;


    /**
     * Set address
     *
     * @param \kmdaBundle\Entity\District $address
     *
     * @return BalanceObject
     */
    public function setAddress(\kmdaBundle\Entity\District $address = null)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return \kmdaBundle\Entity\District
     */
    public function getAddress()
    {
        return $this->address;
    }
    /**
     * @var integer
     */
    private $BuildingId;

    /**
     * @var \kmdaBundle\Entity\District
     */
    private $District;

    /**
     * @var \kmdaBundle\Entity\Organization
     */
    private $OrgOwnership;

    /**
     * @var \kmdaBundle\Entity\BuildingTechState
     */
    private $BuildingTechState;

    /**
     * @var \kmdaBundle\Entity\BuildingType
     */
    private $BuildingType;

    /**
     * @var \kmdaBundle\Entity\BuildingKind
     */
    private $BuildingKind;


    /**
     * Set buildingId
     *
     * @param integer $buildingId
     *
     * @return BalanceObject
     */
    public function setBuildingId($buildingId)
    {
        $this->BuildingId = $buildingId;

        return $this;
    }

    /**
     * Get buildingId
     *
     * @return integer
     */
    public function getBuildingId()
    {
        return $this->BuildingId;
    }

    /**
     * Set district
     *
     * @param \kmdaBundle\Entity\District $district
     *
     * @return BalanceObject
     */
    public function setDistrict(\kmdaBundle\Entity\District $district = null)
    {
        $this->District = $district;

        return $this;
    }

    /**
     * Get district
     *
     * @return \kmdaBundle\Entity\District
     */
    public function getDistrict()
    {
        return $this->District;
    }

    /**
     * Set orgOwnership
     *
     * @param \kmdaBundle\Entity\Organization $orgOwnership
     *
     * @return BalanceObject
     */
    public function setOrgOwnership(\kmdaBundle\Entity\Organization $orgOwnership = null)
    {
        $this->OrgOwnership = $orgOwnership;

        return $this;
    }

    /**
     * Get orgOwnership
     *
     * @return \kmdaBundle\Entity\Organization
     */
    public function getOrgOwnership()
    {
        return $this->OrgOwnership;
    }

    /**
     * Set buildingTechState
     *
     * @param \kmdaBundle\Entity\BuildingTechState $buildingTechState
     *
     * @return BalanceObject
     */
    public function setBuildingTechState(\kmdaBundle\Entity\BuildingTechState $buildingTechState = null)
    {
        $this->BuildingTechState = $buildingTechState;

        return $this;
    }

    /**
     * Get buildingTechState
     *
     * @return \kmdaBundle\Entity\BuildingTechState
     */
    public function getBuildingTechState()
    {
        return $this->BuildingTechState;
    }

    /**
     * Set buildingType
     *
     * @param \kmdaBundle\Entity\BuildingType $buildingType
     *
     * @return BalanceObject
     */
    public function setBuildingType(\kmdaBundle\Entity\BuildingType $buildingType = null)
    {
        $this->BuildingType = $buildingType;

        return $this;
    }

    /**
     * Get buildingType
     *
     * @return \kmdaBundle\Entity\BuildingType
     */
    public function getBuildingType()
    {
        return $this->BuildingType;
    }

    /**
     * Set buildingKind
     *
     * @param \kmdaBundle\Entity\BuildingKind $buildingKind
     *
     * @return BalanceObject
     */
    public function setBuildingKind(\kmdaBundle\Entity\BuildingKind $buildingKind = null)
    {
        $this->BuildingKind = $buildingKind;

        return $this;
    }

    /**
     * Get buildingKind
     *
     * @return \kmdaBundle\Entity\BuildingKind
     */
    public function getBuildingKind()
    {
        return $this->BuildingKind;
    }
    /**
     * @var \kmdaBundle\Entity\Organization
     */
    private $Organization;


    /**
     * Set organization
     *
     * @param \kmdaBundle\Entity\Organization $organization
     *
     * @return BalanceObject
     */
    public function setOrganization(\kmdaBundle\Entity\Organization $organization = null)
    {
        $this->Organization = $organization;

        return $this;
    }

    /**
     * Get organization
     *
     * @return \kmdaBundle\Entity\Organization
     */
    public function getOrganization()
    {
        return $this->Organization;
    }
    
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $BalanceObjectPhoto;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->BalanceObjectPhoto = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add balanceObjectPhoto
     *
     * @param \kmdaBundle\Entity\BalanceObjectPhoto $balanceObjectPhoto
     *
     * @return BalanceObject
     */
    public function addBalanceObjectPhoto(\kmdaBundle\Entity\BalanceObjectPhoto $balanceObjectPhoto)
    {
        $this->BalanceObjectPhoto[] = $balanceObjectPhoto;

        return $this;
    }

    /**
     * Remove balanceObjectPhoto
     *
     * @param \kmdaBundle\Entity\BalanceObjectPhoto $balanceObjectPhoto
     */
    public function removeBalanceObjectPhoto(\kmdaBundle\Entity\BalanceObjectPhoto $balanceObjectPhoto)
    {
        $this->BalanceObjectPhoto->removeElement($balanceObjectPhoto);
    }

    /**
     * Get balanceObjectPhoto
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getBalanceObjectPhoto()
    {
        return $this->BalanceObjectPhoto;
    }
    /**
     * @var string
     */
    private $locationPremises;

    /**
     * @var integer
     */
    private $inventoryNumber;

    /**
     * @var string
     */
    private $sqrTotal;

    /**
     * @var string
     */
    private $sqrFree;

    /**
     * @var string
     */
    private $costBalans;

    /**
     * @var \kmdaBundle\Entity\BuildingKind
     */
    private $idBuildingKind;

    /**
     * @var \kmdaBundle\Entity\Building
     */
    private $idBuilding;

    /**
     * @var \kmdaBundle\Entity\BuildingType
     */
    private $idBuildingType;

    /**
     * @var \kmdaBundle\Entity\BuildingPurpose
     */
    private $idBuildingPurpose;

    /**
     * @var \kmdaBundle\Entity\BuildingFormOwnership
     */
    private $idFormOwnership;

    /**
     * @var \kmdaBundle\Entity\Organization
     */
    private $idBalanceHolder;

    /**
     * @var \kmdaBundle\Entity\BalanceObjectPhoto
     */
    private $idBalanceObjectPhoto;

    /**
     * @var \kmdaBundle\Entity\BuildingPurposeGroup
     */
    private $idBuildingPurposeGroup;

    /**
     * @var \kmdaBundle\Entity\BuildingCategory
     */
    private $idBuildingCategory;


    /**
     * Set locationPremises
     *
     * @param string $locationPremises
     *
     * @return BalanceObject
     */
    public function setLocationPremises($locationPremises)
    {
        $this->locationPremises = $locationPremises;

        return $this;
    }

    /**
     * Get locationPremises
     *
     * @return string
     */
    public function getLocationPremises()
    {
        return $this->locationPremises;
    }

    /**
     * Set inventoryNumber
     *
     * @param integer $inventoryNumber
     *
     * @return BalanceObject
     */
    public function setInventoryNumber($inventoryNumber)
    {
        $this->inventoryNumber = $inventoryNumber;

        return $this;
    }

    /**
     * Get inventoryNumber
     *
     * @return integer
     */
    public function getInventoryNumber()
    {
        return $this->inventoryNumber;
    }

    /**
     * Set sqrFree
     *
     * @param string $sqrFree
     *
     * @return BalanceObject
     */
    public function setSqrFree($sqrFree)
    {
        $this->sqrFree = $sqrFree;

        return $this;
    }

    /**
     * Get sqrFree
     *
     * @return string
     */
    public function getSqrFree()
    {
        return $this->sqrFree;
    }

    /**
     * Set idBuildingKind
     *
     * @param \kmdaBundle\Entity\BuildingKind $idBuildingKind
     *
     * @return BalanceObject
     */
    public function setIdBuildingKind(\kmdaBundle\Entity\BuildingKind $idBuildingKind = null)
    {
        $this->idBuildingKind = $idBuildingKind;

        return $this;
    }

    /**
     * Get idBuildingKind
     *
     * @return \kmdaBundle\Entity\BuildingKind
     */
    public function getIdBuildingKind()
    {
        return $this->idBuildingKind;
    }

    /**
     * Set idBuilding
     *
     * @param \kmdaBundle\Entity\Building $idBuilding
     *
     * @return BalanceObject
     */
    public function setIdBuilding(\kmdaBundle\Entity\Building $idBuilding = null)
    {
        $this->idBuilding = $idBuilding;

        return $this;
    }

    /**
     * Get idBuilding
     *
     * @return \kmdaBundle\Entity\Building
     */
    public function getIdBuilding()
    {
        return $this->idBuilding;
    }

    /**
     * Set idBuildingType
     *
     * @param \kmdaBundle\Entity\BuildingType $idBuildingType
     *
     * @return BalanceObject
     */
    public function setIdBuildingType(\kmdaBundle\Entity\BuildingType $idBuildingType = null)
    {
        $this->idBuildingType = $idBuildingType;

        return $this;
    }

    /**
     * Get idBuildingType
     *
     * @return \kmdaBundle\Entity\BuildingType
     */
    public function getIdBuildingType()
    {
        return $this->idBuildingType;
    }

    /**
     * Set idBuildingPurpose
     *
     * @param \kmdaBundle\Entity\BuildingPurpose $idBuildingPurpose
     *
     * @return BalanceObject
     */
    public function setIdBuildingPurpose(\kmdaBundle\Entity\BuildingPurpose $idBuildingPurpose = null)
    {
        $this->idBuildingPurpose = $idBuildingPurpose;

        return $this;
    }

    /**
     * Get idBuildingPurpose
     *
     * @return \kmdaBundle\Entity\BuildingPurpose
     */
    public function getIdBuildingPurpose()
    {
        return $this->idBuildingPurpose;
    }

    /**
     * Set idFormOwnership
     *
     * @param \kmdaBundle\Entity\BuildingFormOwnership $idFormOwnership
     *
     * @return BalanceObject
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
     * Set idBalanceHolder
     *
     * @param \kmdaBundle\Entity\Organization $idBalanceHolder
     *
     * @return BalanceObject
     */
    public function setIdBalanceHolder(\kmdaBundle\Entity\Organization $idBalanceHolder = null)
    {
        $this->idBalanceHolder = $idBalanceHolder;

        return $this;
    }

    /**
     * Get idBalanceHolder
     *
     * @return \kmdaBundle\Entity\Organization
     */
    public function getIdBalanceHolder()
    {
        return $this->idBalanceHolder;
    }

    /**
     * Set idBalanceObjectPhoto
     *
     * @param \kmdaBundle\Entity\BalanceObjectPhoto $idBalanceObjectPhoto
     *
     * @return BalanceObject
     */
    public function setIdBalanceObjectPhoto(\kmdaBundle\Entity\BalanceObjectPhoto $idBalanceObjectPhoto = null)
    {
        $this->idBalanceObjectPhoto = $idBalanceObjectPhoto;

        return $this;
    }

    /**
     * Get idBalanceObjectPhoto
     *
     * @return \kmdaBundle\Entity\BalanceObjectPhoto
     */
    public function getIdBalanceObjectPhoto()
    {
        return $this->idBalanceObjectPhoto;
    }

    /**
     * Set idBuildingPurposeGroup
     *
     * @param \kmdaBundle\Entity\BuildingPurposeGroup $idBuildingPurposeGroup
     *
     * @return BalanceObject
     */
    public function setIdBuildingPurposeGroup(\kmdaBundle\Entity\BuildingPurposeGroup $idBuildingPurposeGroup = null)
    {
        $this->idBuildingPurposeGroup = $idBuildingPurposeGroup;

        return $this;
    }

    /**
     * Get idBuildingPurposeGroup
     *
     * @return \kmdaBundle\Entity\BuildingPurposeGroup
     */
    public function getIdBuildingPurposeGroup()
    {
        return $this->idBuildingPurposeGroup;
    }

    /**
     * Set idBuildingCategory
     *
     * @param \kmdaBundle\Entity\BuildingCategory $idBuildingCategory
     *
     * @return BalanceObject
     */
    public function setIdBuildingCategory(\kmdaBundle\Entity\BuildingCategory $idBuildingCategory = null)
    {
        $this->idBuildingCategory = $idBuildingCategory;

        return $this;
    }

    /**
     * Get idBuildingCategory
     *
     * @return \kmdaBundle\Entity\BuildingCategory
     */
    public function getIdBuildingCategory()
    {
        return $this->idBuildingCategory;
    }
}
