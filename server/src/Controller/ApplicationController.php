<?php

namespace App\Controller;

use App\Entity\Application;
use App\Entity\ApplicationPost;
use App\Service\ApiService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Throwable;

#[Route('api')]
class ApplicationController extends BaseController
{
    public function __construct(private ManagerRegistry $doctrine, private ApiService $api) {}

    #[Route('/applications', name: 'api_applications')]
    public function index(Request $request): JsonResponse
    {
        try {
            $applicationRepository = $this->doctrine->getRepository(ApplicationPost::class);
            $applications = $applicationRepository->findAll();

            return $this->json($applications);
        } catch(throwable $e) {
            return $this->json($e->getMessage());
        }
    }
}