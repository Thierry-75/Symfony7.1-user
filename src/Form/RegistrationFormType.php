<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Event\PostSubmitEvent;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Regex;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Validator\Constraints\Sequentially;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class, [
                'attr' => ['class' => 'bg-gray-50 border border-gray-300 text-gray-900 text-xs 
                  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'],
                'label' => 'Email',
                'label_attr' => ['class' => 'block mb-1 text-xs font-light text-gray-500 dark:text-gray-400'],
                'constraints' => [
                    new Sequentially([
                        new NotBlank(message: "Please enter your email"),
                        new Length(['max' => 180, 'maxMessage' => 'Your email should be at least {{ limit }} characters']),
                        new Email(message: 'The email {{ value }} is not a valid email.')
                    ])
                ]
            ])
            ->add('pseudo', TextType::class, [
                'attr' => ['class' => 'bg-gray-50 border border-gray-300 text-gray-900 text-xs 
                  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'],
                'label' => 'Pseudo',
                'label_attr' => ['class' => 'block mb-1 text-xs font-light text-gray-500 dark:text-gray-400'],
                'constraints' => [
                    new Sequentially([
                        new NotBlank(message: 'Please enter your lastname'),
                        new Length(['min' => 2, 'max' => 25, 'minMessage' => 'min 2 characters', 'maxMessage' => 'max 30 characters']),
                        new Regex(
                            pattern: '/^[a-zA-Zéèêà]{3,20}#[0-9]{2,4}$/i',
                            htmlPattern: '^[a-zA-Zéèêà]{3,20}#[0-9]{2,4}$'
                        )
                    ])
                ]
            ])
            ->add('plainPassword', PasswordType::class, [
                // instead of being set onto the object directly,
                // this is read and encoded in the controller
                'mapped' => false,
                'attr' => [
                    'class' => 'bg-gray-50 border border-gray-300 text-gray-900 text-xs 
                  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                    'autocomplete' => 'new-password'
                ],
                'label' => 'Mot de passe',
                'label_attr' => ['class' => 'block mb-1 text-xs font-light text-gray-500 dark:text-gray-400'],
                'constraints' => [
                    new Sequentially([
                        new NotBlank(['message' => 'Please enter your password']),
                        new Length([
                            'min' => 10,
                            'max' => 15,
                            'minMessage' => 'Your password should be at least {{ limit }} characters',
                            'maxMessage' => 'Your password should be max {{ limit }} characters'
                        ]),
                        new Regex(
                            pattern: '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,12}$/i',
                            htmlPattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,12}$'
                        )
                    ])
                ],
            ])
            ->add('zip', TextType::class, [
                'attr' => ['class' => 'bg-gray-50 border border-gray-300 text-gray-900 text-xs 
                  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'],
                'label' => 'Code postal',
                'label_attr' => ['class' => 'block mb-1 text-xs font-light text-gray-500 dark:text-gray-400'],
                'constraints' => [
                    new Sequentially([
                        new NotBlank(message: 'Please enter your zip code'),
                        new Length(['min' => 5, 'max' => 5, 'minMessage' => 'min 5 characters', 'maxMessage' => 'max 5 characters']),
                        new Regex(
                            pattern: '/^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/i',
                            htmlPattern: '^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$'
                        )
                    ])
                ]
            ])
            ->add('city', TextType::class, [
                'attr' => ['class' => 'bg-gray-50 border border-gray-300 text-gray-900 text-xs 
                  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'],
                'label' => 'Ville',
                'label_attr' => ['class' => 'block mb-1 text-xs font-light text-gray-500 dark:text-gray-400 '],
                'constraints' => [
                    new Sequentially([
                        new NotBlank(message: 'Please enter your city'),
                        new Length(['min' => 2, 'max' => 30, 'minMessage' => 'min 2 characters', 'maxMessage' => 'max 25 characters']),
                        new Regex(
                            pattern: '/^[a-zA-Z\' éèêàç]{2,30}$/i',
                            htmlPattern: '^[a-zA-Z\' éèàêç]{2,30}$'

                        )
                    ])
                ]
            ])
            ->add('agreeTerms', CheckboxType::class, [
                'attr' => [
                    'class' => 'w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 
            dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800',

                ],
                'label' => 'Accepter les conditions générales',
                'label_attr' => ['class' => 'font-light text-gray-500 dark:text-gray-300 text-xs', 'id' => 'agreeSmall'],
                'mapped' => false,
                'constraints' => [
                    new IsTrue([
                        'message' => 'You should agree to our terms.',
                    ]),
                ],
            ])

            ->addEventListener(FormEvents::POST_SUBMIT, $this->addDate(...))
        ;
    }
    public function addDate(PostSubmitEvent $event)
    {
        $data = $event->getData();
        if (!($data instanceof User)) return;
        $data->setCreateAt(new \DateTimeImmutable());
    }
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
