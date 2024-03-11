<?php

namespace App\Entity;

interface DatedInterface
{
    public function getCreatedAt(): ?\DateTime;
    public function setCreatedAt(\DateTime $createdAt): void;
    public function getUpdatedAt(): ?\DateTime;
    public function setUpdatedAt(\DateTime $updatedAt): void;
}