<?php 

namespace App\Security\Voter;

use App\Entity\User;
use PHPStan\PhpDocParser\Parser\TokenIterator;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter extends Voter
{
    const READ = 'USER_READ';
    const UPDATE = 'USER_UPDATE';
    const DELETE = 'USER_DELETE';

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports(string $attribute, mixed $subject): bool
    {
        if(!in_array($attribute, [self::READ,self::UPDATE,self::DELETE])){
            return false;
        }
        if(!$subject instanceof User){
            return false;
        }
    }

    protected function voteOnAttribute($attribute, $article, TokenInterface $token): bool
    {
        $user = $token->getUser();
        if(!$user instanceof UserInterface)return false;

        if($this->security->isGranted('ROLE_ADMIN'))return true;

        switch($attribute){
            case self::READ:
                return $this->canRead();
                break;
            case self::UPDATE:
                return $this->canUpdate();
                break;
            case self::DELETE:
                return $this->canDelete();
                break;
        }
    }

    private function canRead(){
        return $this->security->isGranted('ROLE_USER');
    }
    private function canUpdate(){
        return $this->security->isGranted('ROLE_REDACTEUR');
    }
    private function canDelete(){
        return $this->security->isGranted('ROLE_ADMIN');
    }
}