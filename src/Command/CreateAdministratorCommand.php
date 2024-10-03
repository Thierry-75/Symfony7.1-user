<?php


namespace App\Command;


use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Style\SymfonyStyle;


class CreateAdministratorCommand extends Command
{

    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct('app:create-administrator');
        $this->em = $em;
    }

    protected function configure(): void
    {
        $this
            ->addArgument('email', InputArgument::OPTIONAL, 'Email - obligatoire')
            ->addArgument('password', InputArgument::OPTIONAL, 'Mot de passe obligatoire')
            ->addArgument('pseudo', InputArgument::OPTIONAL, 'Pseudonyme - obligaoire')
            ->addArgument('zip', InputArgument::OPTIONAL, 'Code postal')
            ->addArgument('city', InputArgument::OPTIONAL, 'Ville');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $helper = $this->getHelper('question');
        $io = new SymfonyStyle($input, $output);
        $email = $input->getArgument('email');
        if (!$email) {
            $question = new Question('Quel est l\'adresse courriel ?');
            $email = $helper->ask($input, $output, $question);
        }
        $plainPassword = $input->getArgument('password');
        if (!$plainPassword) {
            $question = new Question('Quesl est le mot de passe ?');
            $plainPassword = $helper->ask($input, $output, $question);
        }
        $pseudo = $input->getArgument('pseudo');
        if (!$pseudo) {
            $question = new Question('Quel est votre pseudo ?');
            $pseudo = $helper->ask($input, $output, $question);
        }
        $city = $input->getArgument('city');
        if (!$city) {
            $question = new Question('Quel est votre lieu de résidence ?');
            $city = $helper->ask($input, $output, $question);
        }
        $zip = $input->getArgument('zip');
        if (!$zip) {
            $question = new Question('Quel est votre code postal ?');
            $zip = $helper->ask($input, $output, $question);
        }


        $user = (new User())->setEmail($email)
            ->setPlainpassword($plainPassword)
            ->setPseudo($pseudo)
            ->setRoles(['ROLE_USER', 'ROLE_ADMIN'])
            ->setZip($zip)
            ->setCity($city)
            ->setCreateAt(new \DateTimeImmutable())
            ->setIsVerified(true);
        $this->em->persist($user);
        $this->em->flush();
        $io->success('l\'administrateur a été créé !');
        return Command::SUCCESS;
    }
}
