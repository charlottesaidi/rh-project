<?php

namespace App\DataFixtures;

use App\Entity\Application;
use App\Entity\ApplicationPost;
use App\Entity\Post;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PropertyAccess\PropertyAccess;

class ApplicationPostFixtures extends Fixture implements DependentFixtureInterface, FixtureGroupInterface
{

    public static function getGroups(): array
    {
        return ['application', 'post, applicationPost'];
    }

    public function getDependencies(): array
    {
        return [
            ApplicationFixtures::class,
            PostFixtures::class
        ];
    }

    public static function getApplicationPostReference(string $key): string
    {
        return ApplicationPost::class . '_' . $key;
    }

    public function load(ObjectManager $manager): void
    {
        $i = 0;
        foreach ($this->getManagerData() as $data) {
            $entity = $this->createApplicationPost($data);
            $manager->persist($entity);
            $this->addReference(self::getApplicationPostReference((string)$i), $entity);
            /** @var Post $post */
            $post = $this->getReference(PostFixtures::getPostManagerReference($data['post_id']));
            $entity->setPost($post);
            /** @var Application $application */
            $application = $this->getReference(ApplicationFixtures::getApplicationReference($data['application_id']));
            $entity->setApplication($application);
            $i++;
        }

        $y = 2;
        foreach ($this->getData() as $data) {
            $entity = $this->createApplicationPost($data);
            $manager->persist($entity);
            $this->addReference(self::getApplicationPostReference((string)$y), $entity);
            /** @var Post $post */
            $post = $this->getReference(PostFixtures::getPostReference($data['post_id']));
            $entity->setPost($post);
            /** @var Application $application */
            $application = $this->getReference(ApplicationFixtures::getApplicationReference($data['application_id']));
            $entity->setApplication($application);
            $y++;
        }

        $x = 12;
        foreach ($this->getData() as $data) {
            $entity = $this->createApplicationPost($data);
            $manager->persist($entity);
            $this->addReference(self::getApplicationPostReference((string)$x), $entity);
            /** @var Post $post */
            $post = $this->getReference(PostFixtures::getPostReference($data['post_id']));
            $entity->setPost($post);
            /** @var Application $application */
            $application = $this->getReference(ApplicationFixtures::getApplicationReference((string)$x));
            $entity->setApplication($application);
            $x++;
        }

        $manager->flush();
    }

    private function createApplicationPost(array $data): ApplicationPost
    {
        $entity = new ApplicationPost();

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

    private function getManagerData(): iterable {
        yield [
            'post_id' => PostFixtures::RECRUTEUR_POSTE,
            'application_id' => 0
        ];
        yield [
            'post_id' => PostFixtures::DIRECTEUR_POSTE,
            'application_id' => 1
        ];
    }

    private function getData(): iterable {
        for ($i = 2; $i < 10; $i++) {
            yield [
                'post_id' => $i,
                'application_id' => $i
            ];
        }
    }
}