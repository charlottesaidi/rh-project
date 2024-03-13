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

    #[Route('/applications/{id}', name: 'api_applications_update')]
    public function update(Application $application, Request $request): JsonResponse
    {
        $data = \json_decode($request->getContent(), true);
        try {
            $applicationRepository = $this->doctrine->getRepository(Application::class);

            if ($data['status'] === Application::STATUS_CONTACTED) {
                $application->setStatus(Application::STATUS_REJECTED);
            }

            if ($data['status'] === Application::STATUS_REJECTED) {
                $application->setStatus(Application::STATUS_CONTACTED);
            }

            if ($data['status'] === Application::STATUS_INTERVIEWED) {
                $application->setStatus(Application::STATUS_ARCHIVED);
            }

            if ($data['status'] === Application::STATUS_ARCHIVED) {
                $application->setStatus(Application::STATUS_INTERVIEWED);
            }

            $applicationRepository->save($application, true);

            return $this->json($application);
        } catch(throwable $e) {
            return $this->json($e->getMessage());
        }
    }
}