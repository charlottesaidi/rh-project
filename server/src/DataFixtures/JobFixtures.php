<?php

namespace App\DataFixtures;

use App\Entity\Job;
use App\Entity\Post;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PropertyAccess\PropertyAccess;

class JobFixtures extends Fixture implements DependentFixtureInterface, FixtureGroupInterface
{

    private $fakerFactory;

    public function __construct()
    {
        $this->fakerFactory = \Faker\Factory::create('fr_FR');
    }

    public function getDependencies(): array
    {
        return [
            PostFixtures::class
        ];
    }

    public static function getGroups(): array
    {
        return ['job, posts'];
    }

    public static function getJobReference(string $key): string
    {
        return Job::class . '_' . $key;
    }

    public function load(ObjectManager $manager): void
    {
        $i = 0;
        foreach ($this->getManagerData() as $data) {
            $entity = $this->createJob($data);
            $manager->persist($entity);
            $this->addReference(self::getJobReference((string)$i), $entity);
            /** @var Post $post */
            $post = $this->getReference(PostFixtures::getPostManagerReference($data['post_id']));
            $entity->setPost($post);
            $i++;
        }

        $y = 2;
        foreach ($this->getData() as $data) {
            $entity = $this->createJob($data);
            $manager->persist($entity);
            $this->addReference(self::getJobReference((string)$y), $entity);
            /** @var Post $post */
            $post = $this->getReference(PostFixtures::getPostReference($data['post_id']));
            $entity->setPost($post);
            $y++;
        }

        $x = 12;
        foreach ($this->getData() as $data) {
            $entity = $this->createJob($data);
            $manager->persist($entity);
            $this->addReference(self::getJobReference((string)$x), $entity);
            /** @var Post $post */
            $post = $this->getReference(PostFixtures::getPostReference($data['post_id']));
            $entity->setPost($post);
            $x++;
        }

        $manager->flush();
    }

    private function createJob(array $data): Job
    {
        $entity = new Job();

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
        $faker = $this->fakerFactory;

        yield [
            'title' => $faker->paragraph(1),
            'description' => $faker->paragraph(5),
            'start_date' => $faker->dateTimeBetween('-30 days', '+30 days'),
            'end_date' => $faker->dateTimeBetween('+30 days', '+5 years'),
            'post_id' => PostFixtures::DIRECTEUR_POSTE,
        ];

        yield [
            'title' => $faker->paragraph(1),
            'description' => $faker->paragraph(5),
            'start_date' => $faker->dateTimeBetween('-30 days', '+30 days'),
            'end_date' => $faker->dateTimeBetween('+30 days', '+5 years'),
            'post_id' => PostFixtures::RECRUTEUR_POSTE,
        ];
    }

    private function getData(): iterable
    {
        $faker = $this->fakerFactory;

        for ($i = 2; $i < 10; $i++) {
            yield [
                'title' => $faker->paragraph(1),
                'description' => $faker->paragraph(5),
                'start_date' => $faker->dateTimeBetween('-30 days', '+30 days'),
                'end_date' => $faker->dateTimeBetween('+30 days', '+5 years'),
                'post_id' => $i,
            ];
        }
    }
}