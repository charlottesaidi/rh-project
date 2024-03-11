<?php

namespace App\Service;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

class ApiService 
{
    /**
     * Method handleCircularReference [convert an object to json handling endless loop between entities when related]
     * 
     * @param $data [objet concerné passé en paramètre pour la manipulation]
     *
     * @return mixed
     */
    public function handleCircularReference($data) {
        $encoder = new JsonEncoder();
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
        ];
        $normalizer = new ObjectNormalizer(null, null, null, null, null, null, $defaultContext);

        $serializer = new Serializer([new DateTimeNormalizer(), $normalizer], [$encoder]);

        return $serializer->serialize($data, 'json');
    }
}