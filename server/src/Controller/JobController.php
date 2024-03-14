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
        $response = new JsonResponse();

        try {
            $jobRepository = $this->doctrine->getRepository(Job::class);
            $jobs = $jobRepository->findAll();

            $response->setContent($this->api->handleCircularReference($jobs)) ;
        } catch(throwable $e) {
            $response->setContent($e->getMessage());
        }

        return $response;
    }

    #[Route('/jobs/{id]/delete', name: 'api_jobs')]
    public function delete(Job $job, Request $request): JsonResponse
    {
        $response = new JsonResponse();

        try {
            $jobRepository = $this->doctrine->getRepository(Job::class);
            $jobRepository->remove($job, true);

            $response->setContent("Offre supprimée avec succès") ;
        } catch(throwable $e) {
            $response->setContent($e->getMessage());
        }

        return $response;
    }
}