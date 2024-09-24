<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Repository\UserRepository;
use App\Security\AppUserAuthenticator;
use App\Service\JWTService;
use App\Service\SendMailService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register', methods: ['GET', 'POST'])]
    public function register(
        Request $request,
        UserPasswordHasherInterface $userPasswordHasher,
        Security $security,
        EntityManagerInterface $entityManager,
        SendMailService $mail,
        JWTService $jwt
    ): Response {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // encode the plain password
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $form->get('plainPassword')->getData()
                )
            )->setRoles(['ROLE_USER']);

            $entityManager->persist($user);
            $entityManager->flush();

            //generate jwt
            $header = [
                'typ' => 'JWT',
                'alg' => 'HS256'
            ];
            $payload = [
                'user_id' => $user->getId()
            ];
            //token
            $token = $jwt->generate($header, $payload, $this->getParameter('app.jwtsecret'));

            //envoi du mail
            $mail->envoi(
                'no-reply@monblog.org',
                $user->getEmail(),
                'Activation de votrecompte sur notre site',
                'register',
                [
                    'user' => $user,
                    'token' => $token
                ]
            );

            return $security->login($user, AppUserAuthenticator::class, 'main');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form,
        ]);
    }

    #[Route('/verif/{token}', name: 'verify_user')]
    public function verifyUser($token, JWTService $jwt, UserRepository $userRepository, EntityManagerInterface $em): Response
    {
        // isValid && isExpired && check
        if ($jwt->isValid($token) && !$jwt->isExpired($token) && $jwt->check($token, $this->getParameter('app.jwtsecret'))) {
            $payload = $jwt->getPayload($token);
            $user  = $userRepository->find($payload['user_id']);
            if ($user && !$user->getIsVerified()) {
                $user->setIsVerified(true);
                $em->persist($user);
                $em->flush();
                $this->addFlash('alert-success', 'Votre compte a été activé !');
                return $this->redirectToRoute('app_main');  // changer la route  ? profile
            }
        }
        $this->addFlash('alert-danger', 'Le token est invalide !');
        return $this->redirectToRoute('app_login');
    }

    #[Route('/renvoiverif', name: 'resend_verif')]
    public function resendVerif(UserRepository $userRepository, JWTService $jwt, SendMailService $mail): Response
    {
        $user = $this->getUser();
        if (!$user) {
            $this->addFlash('alert-danger', 'Vous devez être connecté pour accéder à cette page !');
            return $this->redirectToRoute('app_login');
        }
        if ($user->getIsVerified()) {
            $this->addFlash('alert-warning', 'Ce compte est déjà activé !');
            return $this->redirectToRoute('app_main');  // redirect to profil
        }
        //generate jwt
        $header = [
            'typ' => 'JWT',
            'alg' => 'HS256'
        ];
        $payload = [
            'user_id' => $user->getId()
        ];
        //token
        $token = $jwt->generate($header, $payload, $this->getParameter('app.jwtsecret'));

        //envoi du mail
        $mail->envoi(
            'no-reply@monblog.org',
            $user->getEmail(),
            'Activation de votrecompte sur notre site',
            'register',
            [
                'user' => $user,
                'token' => $token
            ]
        );
        $this->addFlash('alert-success', 'Email de vérification envoyé !');
        return $this->redirectToRoute('app_main');
    }
}
