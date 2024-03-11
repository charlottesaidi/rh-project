<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

trait DatedTrait
{
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    protected ?\DateTime $createdAt = null;

    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTime $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    protected ?\DateTime $updatedAt = null;

    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTime $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }
}