<?php

namespace App\Entity;

use App\Repository\PostRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PostRepository::class)]
class Post implements DatedInterface
{
    use DatedTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'posts')]
    private ?Department $department = null;

    #[ORM\OneToMany(targetEntity: Job::class, mappedBy: 'post')]
    private Collection $jobs;

    #[ORM\OneToMany(targetEntity: ApplicationPost::class, mappedBy: 'post')]
    private Collection $applicationPosts;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->jobs = new ArrayCollection();
        $this->applicationPosts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDepartment(): ?Department
    {
        return $this->department;
    }

    public function setDepartment(?Department $department): static
    {
        $this->department = $department;

        return $this;
    }

    /**
     * @return Collection<int, ApplicationPost>
     */
    public function getApplicationPosts(): Collection
    {
        return $this->applicationPosts;
    }

    public function addApplicationPost(ApplicationPost $applicationPost): static
    {
        if (!$this->applicationPosts->contains($applicationPost)) {
            $this->applicationPosts->add($applicationPost);
            $applicationPost->setCreatedBy($this);
        }

        return $this;
    }

    public function removeApplicationPost(ApplicationPost $applicationPost): static
    {
        if ($this->applicationPosts->removeElement($applicationPost)) {
            // set the owning side to null (unless already changed)
            if ($applicationPost->getCreatedBy() === $this) {
                $applicationPost->setCreatedBy(null);
            }
        }

        return $this;
    }
}
