<?php
namespace kmdaBundle\Entity;

use Doctrine\ORM\Mapping;
use JMS\Serializer\Annotation\Accessor;

/**
 * @ORM\Entity(repositoryClass="kmdaBundle\Repository\VotingDtpRepository")
 * @ORM\Table(name="voting_dtp")
 * @ORM\HasLifecycleCallbacks()
 */
class VotingDtp
{

    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $idTicketit;

    /**
     * @var boolean
     */
    private $voice;

    /**
     * @var string
     */
    private $ipUser;


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
     * Set idTicketit
     *
     * @param integer $idTicketit
     *
     * @return VotingDtp
     */
    public function setIdTicketit($idTicketit)
    {
        $this->idTicketit = $idTicketit;

        return $this;
    }

    /**
     * Get idTicketit
     *
     * @return integer
     */
    public function getIdTicketit()
    {
        return $this->idTicketit;
    }

    /**
     * Set voice
     *
     * @param boolean $voice
     *
     * @return VotingDtp
     */
    public function setVoice($voice)
    {
        $this->voice = $voice;

        return $this;
    }

    /**
     * Get voice
     *
     * @return boolean
     */
    public function getVoice()
    {
        return $this->voice;
    }

    /**
     * Set ipUser
     *
     * @param string $ipUser
     *
     * @return VotingDtp
     */
    public function setIpUser($ipUser)
    {
        $this->ipUser = $ipUser;

        return $this;
    }

    /**
     * Get ipUser
     *
     * @return string
     */
    public function getIpUser()
    {
        return $this->ipUser;
    }
}
