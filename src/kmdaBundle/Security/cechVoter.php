<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace kmdaBundle\Security;

use kmdaBundle\Entity\Cech;
use Application\Sonata\UserBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class cechVoter extends Voter
{
    // these strings are just invented: you can use anything
    const VIEW = 'view';
    const EDIT = 'edit';
    const DELETE = 'delete';
    
    protected function supports($attribute, $subject)
    {
        // if the attribute isn't one we support, return false
        if (!in_array($attribute, array(self::VIEW, self::EDIT, self::DELETE))) {
            return false;
        }

        // only vote on Post objects inside this voter
        if (!$subject instanceof Cech) {
            return false;
        }

        return true;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();

        if (!$user instanceof User) {
            // the user must be logged in; if not, deny access
            return false;
        }

        // you know $subject is a Post object, thanks to supports
        /** @var Post $post */
        $cech = $subject;

        switch($attribute) {
            case self::VIEW:
                return $this->canView($cech, $user);
            case self::EDIT:
                return $this->canEdit($cech, $user);
            case self::DELETE:
                return $this->canDelete($cech, $user);
        }

        throw new \LogicException('This code should not be reached!');
    
        return true;
    }

    private function canView(Cech $cech, User $user)
    {
        // if they can edit, they can view
        if ($this->canEdit($cech, $user)) {
            return true;
        }

        // the Post object could have, for example, a method isPrivate()
        // that checks a boolean $private property
        return false;
    }

    private function canEdit(Cech $cech, User $user)
    {
        // this assumes that the data object has a getOwner() method
        // to get the entity of the user who owns this data object
//        return $user->isSuperAdmin();
        return true;
    }

    private function canDelete(Cech $cech, User $user)
    {
        // this assumes that the data object has a getOwner() method
        // to get the entity of the user who owns this data object
        return $user->isSuperAdmin();
 //       return true;
    }
}

