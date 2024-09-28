<?php

namespace App\Controller;

use App\Form\ResetPasswordFormType;
use App\Service\SendMailService;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Form\ResetPasswordRequestFormType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;

class SecurityController extends AbstractController
{
    #[Route(path: '/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();
        // there
        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    #[Route(path: '/logout', name: 'app_logout', methods: ['GET', 'POST'])]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    #[Route('/forget-pass', name: 'forgotten_password')]

    public function forgotttenPassword(
        Request $request,
        ValidatorInterface $validator,
        UserRepository $userRepository,
        TokenGeneratorInterface $tokenGeneratorInterface,
        EntityManagerInterface $em,
        SendMailService $mail
    ): Response {
        $form = $this->createForm(ResetPasswordRequestFormType::class);
        $form->handleRequest($request);
        if ($request->isMethod('POST')) {
            $error = $validator->validate($request);
            if (count($error) > 0) {
                return $this->render('security/reset_password_request.html.twig', ['requestPassForm' => $form->createView(), 'error' => $error]);
            }
            if ($form->isSubmitted() && $form->isValid()) {
                $user = $userRepository->findOneByEmail($form->get('email')->getData());
                if (isset($user)) {
                    //token
                    $token = $tokenGeneratorInterface->generateToken();
                    // try cacth
                    $user->setResetToken($token);
                    $em->persist($user);
                    $em->flush();
                    // end try catch
                    //link init
                    $url = $this->generateUrl('reset_pass', ['token' => $token], UrlGeneratorInterface::ABSOLUTE_URL);
                    //email
                    $context = ['url' => $url, 'user' => $user];
                    $mail->envoi(
                        'no-reply@mon-blog.org',
                        $user->getEmail(),
                        'Réinitialisation du password',
                        'password_reset',  // template
                        $context
                    );
                    $this->addFlash('alert-success', 'email envoyé !');
                    return $this->redirectToRoute('app_main');
                }
                $this->addFlash('alert-danger', 'Un problème est survenue');
                return $this->redirectToRoute('app_login');
            }
        }
        return $this->render('security/reset_password_request.html.twig', ['form' => $form->createView()]);
    }

    #[Route('/reset-pass/{token}', name: 'reset_pass')]
    public function resetPass(
        string $token,
        Request $request,
        UserRepository $usersRepository,
        ValidatorInterface $validator,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher
    ): Response {
        //ckeck jeton
        $user = $usersRepository->findOneByResetToken($token);
        if (isset($user)) {
            $form_reset = $this->createForm(ResetPasswordFormType::class);
            $form_reset->handleRequest($request);
            if ($request->isMethod('POST')) {
                $error = $validator->validate($request);
                if (count($error) > 0) {
                    return $this->render('security/reset_password.html.twig', ['form_request_password' => $form_reset->createView(), 'error' => $error]);
                }
                if ($form_reset->isSubmitted() && $form_reset->isValid()) {
                    $user->setResetToken('');
                    $user->setPassword(
                        $passwordHasher->hashPassword($user, $form_reset->get('password')->getData())
                    );
                    // try catch
                    $em->persist($user);
                    $em->flush();
                    // end try catch
                    $this->addFlash('alert-success', 'Mot de passe changé avec succès');
                    return $this->redirectToRoute('app_login');
                }
            }
            return $this->render('security/reset_password.html.twig', ['form_reset' => $form_reset->createView()]);
        }
        $this->addFlash('danger', 'Jeton invalide');
        return $this->redirectToRoute('app_login');
    }
}
