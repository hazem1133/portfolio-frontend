import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  PortfolioProjectService,
  PortfolioProject,
} from '../services/portfolio-project.service';
import {
  ProfileService,
  Profile,
} from '../services/profile.service';
import {
  SkillsService,
  Skill,
} from '../services/skills.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  projects: PortfolioProject[] = [];
  profileModel: Profile = {
    name: '',
    role: '',
    about: '',
  };
  skills: Skill[] = [];
  newSkillName = '';

  constructor(
    private readonly projectService: PortfolioProjectService,
    private readonly profileService: ProfileService,
    private readonly skillsService: SkillsService,
  ) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });

    this.profileService.getProfile().subscribe((profile) => {
      if (profile) {
        this.profileModel = {
          name: profile.name ?? '',
          role: profile.role ?? 'Frontend Developer',
          about: profile.about ?? '',
        };
      } else {
        // Default profile if none exists yet
        this.profileModel = {
          name: 'Your Name',
          role: 'Frontend Developer',
          about:
            'I am a passionate frontend developer focused on building interactive, user‑friendly web applications. I enjoy turning complex problems into simple, beautiful interfaces and learning new tools along the way.',
        };
      }
    });

    this.skillsService.getSkills().subscribe((skills) => {
      this.skills = skills;
    });
  }

  saveProfile(): void {
    this.profileService.saveProfile(this.profileModel).subscribe((saved) => {
      this.profileModel = saved;
    });
  }

  addSkill(): void {
    if (!this.newSkillName.trim()) {
      return;
    }

    this.skillsService.addSkill(this.newSkillName).subscribe((skill) => {
      this.skills = [skill, ...this.skills];
      this.newSkillName = '';
    });
  }

  deleteSkill(id?: string): void {
    if (!id) {
      return;
    }

    this.skillsService.deleteSkill(id).subscribe(() => {
      this.skills = this.skills.filter((s) => s._id !== id);
    });
  }

  addProject(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const value = form.value;
    this.projectService
      .addProject({
        title: value.title,
        image: value.image,
        description: value.desc,
        link: value.demo,
      })
      .subscribe((project) => {
        this.projects = [project, ...this.projects];
        form.resetForm();
      });
  }

  deleteProject(id?: string): void {
    if (!id) {
      return;
    }

    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter((p) => p._id !== id);
    });
  }
}
