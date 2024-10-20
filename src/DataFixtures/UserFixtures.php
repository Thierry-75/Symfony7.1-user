<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use Faker\Generator;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    /**
     * @var Generator
     */
    private Generator $faker;

    public function __construct()
    {
        $this->faker = Factory::create('fr_FR');
    }

    public function load(ObjectManager $manager): void
    {
        for ($i = 0; $i < 3; $i++) {
            $user  = new User();
            $user->setEmail($this->faker->email())
                ->setRoles(['ROLE_USER'])
                ->setCreateAt(new \DateTimeImmutable())
                ->setPlainpassword('ArethiA75!')
                ->setZip(str_replace(' ', '', $this->faker->postcode()))
                ->setCity($this->faker->city())
                ->setPseudo(mt_rand(0, 1) === 1 ? $this->faker->firstNameFemale() . '-' . mt_rand(1, 99) : $this->faker->firstNameMale() . '-' . mt_rand(0, 99))
                ->setIsVerified(mt_rand(0, 1) === 1 ? true : false);
            $users[] = $user;
            $manager->persist($user);
        }
        $manager->flush();
    }
}
