<?php

namespace App\DataFixtures;

use App\Entity\Department;
use App\Entity\Post;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PropertyAccess\PropertyAccess;

class PostFixtures extends Fixture implements DependentFixtureInterface, FixtureGroupInterface
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
        return ['post, department'];
    }

    public function getDependencies(): array
    {
        return [
            DepartmentFixtures::class,
        ];
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
            /** @var Department $department */
            $department = $this->getReference(DepartmentFixtures::getDepartmentManagerReference($data['department_id']));
            $entity->setDepartment($department);
        }

        $i = 2;
        foreach ($this->getData() as $data) {
            $entity = $this->createPost($data);
            $manager->persist($entity);
            $this->addReference(self::getPostReference((string)$i), $entity);
            /** @var Department $department */
            $department = $this->getReference(DepartmentFixtures::getDepartmentReference($data['department_id']));
            $entity->setDepartment($department);
            $i++;
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
            'name' => self::DIRECTEUR_POSTE,
            'department_id' => DepartmentFixtures::DEP_DIRECTION
        ];
        yield [
            'name' => self::RECRUTEUR_POSTE,
            'department_id' => DepartmentFixtures::DEP_RESSOURCES
        ];
    }

    private function getData(): iterable
    {
        $faker = $this->fakerFactory;
        for ($i = 2; $i < 10; $i++) {
            yield [
                'name' => $faker->jobTitle,
                'department_id' => $i
            ];
        }
    }
}