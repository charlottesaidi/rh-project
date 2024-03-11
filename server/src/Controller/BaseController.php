<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class BaseController extends AbstractController
{
    public static function getSubscribedServices(): array
    {
        return array_merge(parent::getSubscribedServices(), [
            ManagerRegistry::class,
            TokenStorageInterface::class,
            JWTTokenManagerInterface::class,
            UserRepository::class
        ]);
    }

    protected function getRequest()
    {
        return $this->container->get('request_stack')->getCurrentRequest();
    }

    protected function getUser(): User
    {
        $decodedToken = $this->getJWTTokenManagerInterface()->decode($this->getTokenStorageInterface()->getToken());
        return $this->getManagerRegistry()->getRepository(User::class)->findOneBy(['email' => $decodedToken['username']]);
    }

    protected function getTokenStorageInterface(): TokenStorageInterface
    {
        if (!$this->container->has(TokenStorageInterface::class)) {
            throw new \LogicException('The TokenStorageInterface is not registered in your application.');
        }

        return $this->container->get(TokenStorageInterface::class);
    }

    protected function getJWTTokenManagerInterface(): JWTTokenManagerInterface
    {
        if (!$this->container->has(JWTTokenManagerInterface::class)) {
            throw new \LogicException('The JWTTokenManagerInterface is not registered in your application.');
        }

        return $this->container->get(JWTTokenManagerInterface::class);
    }

    protected function getManagerRegistry(): ManagerRegistry
    {
        if (!$this->container->has(ManagerRegistry::class)) {
            throw new \LogicException('The ManagerRegistry is not registered in your application.');
        }

        return $this->container->get(ManagerRegistry::class);
    }

    protected function getUserRepository(): UserRepository
    {
        if (!$this->container->has(UserRepository::class)) {
            throw new \LogicException('The UserRepository is not registered in your application.');
        }

        return $this->container->get(UserRepository::class);
    }
}
