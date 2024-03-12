<?php

namespace App\DataFixtures;

use App\Entity\Application;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PropertyAccess\PropertyAccess;

class ApplicationFixtures extends Fixture
{

    private $fakerFactory;

    public function __construct()
    {
        $this->fakerFactory = \Faker\Factory::create('en_FR');
    }

    public static function getGroups(): array
    {
        return ['application'];
    }

    public static function getApplicationReference(string $key): string
    {
        return Application::class . '_' . $key;
    }

    public function load(ObjectManager $manager): void
    {
        $i = 0;
        foreach ($this->getData() as $data) {
            $entity = $this->createApplication($data);
            $manager->persist($entity);
            $this->addReference(self::getApplicationReference((string)$i), $entity);
            $i++;
        }

        $manager->flush();
    }

    private function createApplication(array $data): Application
    {
        $entity = new Application();

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

    private function getData(): iterable
    {
        $faker = $this->fakerFactory;

        for ($i = 0; $i < 20; $i++) {
            $status = match ($i % 5) {
                0 => Application::STATUS_INTERVIEWED,
                3 => Application::STATUS_ARCHIVED,
                1 => Application::STATUS_CONTACTED,
                2 => Application::STATUS_REJECTED,
                4 => Application::STATUS_PENDING,
            };

            yield [
                'file' => $faker->md5 . '.pdf',
                'email' => $faker->email,
                'name' => $faker->name,
                'message' => $faker->paragraph(3),
                'status' => $status,
            ];
        }
    }
}