<?php

namespace App\DataFixtures;

use App\Entity\Department;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PropertyAccess\PropertyAccess;

class DepartmentFixtures extends Fixture
{
    const DEP_RESSOURCES = 'Ressources humaines';
    const DEP_DIRECTION = 'Direction';

    private $fakerFactory;

    public function __construct()
    {
        $this->fakerFactory = \Faker\Factory::create('en_FR');
    }

    public static function getGroups(): array
    {
        return ['department'];
    }

    public static function getDepartmentReference(string $key): string
    {
        return Department::class . '_' . $key;
    }

    public static function getDepartmentManagerReference(string $key): string
    {
        return Department::class . '_Management_' . $key;
    }

    public function load(ObjectManager $manager): void
    {
        foreach ($this->getManagerData() as $data) {
            $entity = $this->createDepartment($data);
            $manager->persist($entity);
            $this->addReference(self::getDepartmentManagerReference($entity->getName()), $entity);
        }

        foreach ($this->getData() as $data) {
            $entity = $this->createDepartment($data);
            $manager->persist($entity);
            $this->addReference(self::getDepartmentReference($entity->getName()), $entity);
        }

        $manager->flush();
    }

    private function createDepartment(array $data): Department
    {
        $entity = new Department();

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
            'name' => self::DEP_DIRECTION
        ];
        yield [
            'name' => self::DEP_RESSOURCES
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