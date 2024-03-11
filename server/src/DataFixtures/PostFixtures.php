<?php

namespace App\DataFixtures;

use App\Entity\Post;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PropertyAccess\PropertyAccess;

class PostFixtures extends Fixture implements FixtureGroupInterface
{
    const DIRECTEUR_POSTE = 'Directeur';
    const RECRUTEUR_POSTE = 'Recruteur';

    private $fakerFactory;

    public function __construct()
    {
        $this->fakerFactory = \Faker\Factory::create('fr_FR');
    }

    public static function getGroups(): array
    {
        return ['post'];
    }

    public static function getPostReference(string $key): string
    {
        return Post::class . '_' . $key;
    }

    public static function getPostManagerReference(string $key): string
    {
        return Post::class . '_Management_' . $key;
    }

    public function load(ObjectManager $manager): void
    {
        foreach ($this->getManagerData() as $data) {
            $entity = $this->createPost($data);
            $manager->persist($entity);
            $this->addReference(self::getPostManagerReference($entity->getName()), $entity);
        }

        foreach ($this->getData() as $data) {
            $entity = $this->createPost($data);
            $manager->persist($entity);
            $this->addReference(self::getPostReference($entity->getName()), $entity);
        }

        $manager->flush();
    }

    private function createPost(array $data): Post
    {
        $entity = new Post();

        $propertyAccessor = PropertyAccess::createPropertyAccessorBuilder()
            ->disableExceptionOnInvalidPropertyPath()
            ->getPropertyAccessor();

        foreach ($data as $key => $value) {
            if ($propertyAccessor->isWritable($entity, $key)) {
                $propertyAccessor->setValue($entity, $key, $value);
            }
        }

        return $entity;
    }

    private function getManagerData(): iterable
    {
        yield [
            'name' => self::DIRECTEUR_POSTE
        ];
        yield [
            'name' => self::RECRUTEUR_POSTE
        ];
    }

    private function getData(): iterable
    {
        $faker = $this->fakerFactory;
        for ($i = 2; $i < 10; $i++) {
            yield [
                'name' => $faker->company
            ];
        }
    }
}