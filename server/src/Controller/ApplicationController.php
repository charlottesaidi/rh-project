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
        $response = new JsonResponse();

        try {
            $applicationRepository = $this->doctrine->getRepository(ApplicationPost::class);
            $applications = $applicationRepository->findAll();

            $response->setContent($this->api->handleCircularReference($applications)) ;
        } catch(throwable $e) {
            $response->setContent($e->getMessage());
        }

        return $response;
    }

    #[Route('/applications/{id}', name: 'api_applications_update')]
    public function update(Application $application, Request $request): JsonResponse
    {
        $data = \json_decode($request->getContent(), true);
        try {
            $applicationRepository = $this->doctrine->getRepository(Application::class);

            if ($data['status'] === Application::STATUS_CONTACTED) {
                $application->setStatus(Application::STATUS_REJECTED);
            } elseif ($data['status'] === Application::STATUS_REJECTED) {
                $application->setStatus(Application::STATUS_CONTACTED);
            } elseif ($data['status'] === Application::STATUS_INTERVIEWED) {
                $application->setStatus(Application::STATUS_ARCHIVED);
            } elseif ($data['status'] === Application::STATUS_ARCHIVED) {
                $application->setStatus(Application::STATUS_INTERVIEWED);
            } else {
                $application->setStatus($data['status']);
            }

            $applicationRepository->save($application, true);

            return $this->json($application);
        } catch(throwable $e) {
            return $this->json($e->getMessage());
        }
    }
}