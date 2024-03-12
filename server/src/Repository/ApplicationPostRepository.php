<?php

namespace App\Repository;

use App\Entity\ApplicationPost;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ApplicationPost>
 *
 * @method ApplicationPost|null find($id, $lockMode = null, $lockVersion = null)
 * @method ApplicationPost|null findOneBy(array $criteria, array $orderBy = null)
 * @method ApplicationPost[]    findAll()
 * @method ApplicationPost[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ApplicationPostRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ApplicationPost::class);
    }

        /**
         * @return ApplicationPost[] Returns an array of ApplicationPost objects
         */
        public function findByApplicationStatus($value): array
        {
            return $this->createQueryBuilder('a')
                ->select('a, ap')
                ->innerJoin('a.application', 'ap')
                ->andWhere('ap.status = :val')
                ->setParameter('val', $value)
                ->orderBy('a.id', 'ASC')
                ->getQuery()
                ->getResult()
            ;
        }

    //    public function findOneBySomeField($value): ?ApplicationPost
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
