<?php

namespace App\Controller;

use App\Entity\Job;
use App\Service\ApiService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Throwable;

#[Route('api')]
class JobController extends BaseController
{
    public function __construct(private ManagerRegistry $doctrine, private ApiService $api) {}

    #[Route('/jobs', name: 'api_jobs')]
    public function index(Request $request): JsonResponse
    {
        try {
            $jobRepository = $this->doctrine->getRepository(Job::class);
            $jobs = $jobRepository->findAll();

            return $this->json($jobs);
        } catch(throwable $e) {
            return $this->json($e->getMessage());
        }
    }
}