<?php

namespace kmdaBundle\Entity;

/**
 * Documents
 */
class Documents
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $agreementNumber;

    /**
     * @var \DateTime
     */
    private $agreementDate;

    /**
     * @var \kmdaBundle\Entity\BalanceObject
     */
    private $idBalanceObject;

    /**
     * @var \kmdaBundle\Entity\DocType
     */
    private $idDocType;

    /**
     * @var \kmdaBundle\Entity\RentDocuments
     */
    private $idDocInformation;


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
     * Set agreementNumber
     *
     * @param string $agreementNumber
     *
     * @return Documents
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
     * Set agreementDate
     *
     * @param \DateTime $agreementDate
     *
     * @return Documents
     */
    public function setAgreementDate($agreementDate)
    {
        $this->agreementDate = $agreementDate;

        return $this;
    }

    /**
     * Get agreementDate
     *
     * @return \DateTime
     */
    public function getAgreementDate()
    {
        return $this->agreementDate;
    }

    /**
     * Set idBalanceObject
     *
     * @param \kmdaBundle\Entity\BalanceObject $idBalanceObject
     *
     * @return Documents
     */
    public function setIdBalanceObject(\kmdaBundle\Entity\BalanceObject $idBalanceObject = null)
    {
        $this->idBalanceObject = $idBalanceObject;

        return $this;
    }

    /**
     * Get idBalanceObject
     *
     * @return \kmdaBundle\Entity\BalanceObject
     */
    public function getIdBalanceObject()
    {
        return $this->idBalanceObject;
    }

    /**
     * Set idDocType
     *
     * @param \kmdaBundle\Entity\DocType $idDocType
     *
     * @return Documents
     */
    public function setIdDocType(\kmdaBundle\Entity\DocType $idDocType = null)
    {
        $this->idDocType = $idDocType;

        return $this;
    }

    /**
     * Get idDocType
     *
     * @return \kmdaBundle\Entity\DocType
     */
    public function getIdDocType()
    {
        return $this->idDocType;
    }

    /**
     * Set idDocInformation
     *
     * @param \kmdaBundle\Entity\RentDocuments $idDocInformation
     *
     * @return Documents
     */
    public function setIdDocInformation(\kmdaBundle\Entity\RentDocuments $idDocInformation = null)
    {
        $this->idDocInformation = $idDocInformation;

        return $this;
    }

    /**
     * Get idDocInformation
     *
     * @return \kmdaBundle\Entity\RentDocuments
     */
    public function getIdDocInformation()
    {
        return $this->idDocInformation;
    }
}
