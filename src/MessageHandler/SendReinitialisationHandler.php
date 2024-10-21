<?php 

namespace App\MessageHandler;

use App\Message\SendReinitialisation;
use App\Service\SendMailService;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler()]
class SendReinitialisationHandler
{
    private $mailer;

    public function __construct(SendMailService $mailer)
    {
        $this->mailer =$mailer;
    }

    public function __invoke(SendReinitialisation $notification)
    {
        $this->mailer->envoi(
            $notification->getFrom(),
            $notification->getTo(),
            $notification->getSubject(),
            $notification->getTemplate(),
            $notification->getContext()
        );
    }
}