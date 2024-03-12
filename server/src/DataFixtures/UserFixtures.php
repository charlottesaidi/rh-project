<?php

namespace App\DataFixtures;

use App\Entity\Post;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\PropertyAccess\PropertyAccess;

class UserFixtures extends Fixture implements DependentFixtureInterface, FixtureGroupInterface
{
    public const MICHEL_DIRECTEUR = 'directeur@nfs.school';
    public const MICHEL_RECRUTEUR = 'recruteur@nfs.school';

    public function __construct(private UserPasswordHasherInterface $passwordHasher) {}

    public static function getGroups(): array
    {
        return ['user', 'post'];
    }

    public function getDependencies(): array
    {
        return [
            PostFixtures::class,
        ];
    }

    public static function getUserReference(string $key): string
    {
        return User::class . '_' . $key;
    }

    public static function getUserMichelReference(string $email): string
    {
        return User::class . '_Michel_' . $email;
    }

    public function load(ObjectManager $manager): void
    {
        foreach ($this->getMichelData() as $data) {
            $entity = $this->createUser($data);
            $manager->persist($entity);
            $this->addReference(self::getUserMichelReference($entity->getEmail()), $entity);
            /** @var Post $post */
            $post = $this->getReference(PostFixtures::getPostManagerReference($data['post_id']));
            $entity->setPost($post);
        }

        $manager->flush();
    }

    public function createUser(array $data): User
    {
        $entity = new User();

        $propertyAccessor = PropertyAccess::createPropertyAccessorBuilder()
            ->disableExceptionOnInvalidPropertyPath()
            ->getPropertyAccessor();

        if ($plainPassword = $data['plainPassword'] ?? null) {
            $password = $this->passwordHasher->hashPassword($entity, $plainPassword);
            $data['password'] = $password;
            unset($data['plainPassword']);
        }

        foreach ($data as $key => $value) {
            if ($propertyAccessor->isWritable($entity, $key)) {
                $propertyAccessor->setValue($entity, $key, $value);
            }
        }

        return $entity;
    }

    private function getMichelData(): iterable
    {
        yield [
            'post_id' => PostFixtures::DIRECTEUR_POSTE,
            'email' => self::MICHEL_DIRECTEUR,
            'plainPassword' => self::MICHEL_DIRECTEUR,
            'firstname' => "Michel",
            'lastname' => "Directeur",
            'roles' => ['ROLE_ADMIN'],
            'phone' => '0000000000',
            'address' => '10 Rue du Général Sarrail, 76000 Rouen',
        ];
        yield [
            'post_id' => PostFixtures::RECRUTEUR_POSTE,
            'email' => self::MICHEL_RECRUTEUR,
            'plainPassword' => self::MICHEL_RECRUTEUR,
            'firstname' => "Michel",
            'lastname' => "Recruteur",
            'roles' => ['ROLE_USER'],
            'phone' => '0000000000',
            'address' => '10 Rue du Général Sarrail, 76000 Rouen',
        ];
    }
}
