import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-project',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  projects: PortfolioProject[] = [];
  profile: Profile | null = null;
  skills: Skill[] = [];

  readonly fallbackProfile: Profile = {
    name: 'Your Name',
    role: 'Frontend Developer',
    about:
      'I build clean, responsive, and modern web applications with Angular, TypeScript, and great UX in mind.',
  };

  // Simple contact form model (no backend yet)
  contactModel = {
    name: '',
    email: '',
    message: '',
  };

  constructor(
    private readonly projectService: PortfolioProjectService,
    private readonly profileService: ProfileService,
    private readonly skillsService: SkillsService,
  ) {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });

    this.profileService.getProfile().subscribe((profile) => {
      this.profile = profile ?? null;
    });

    this.skillsService.getSkills().subscribe((skills) => {
      this.skills = skills;
    });
  }

  get safeProfile(): Profile {
    return {
      ...this.fallbackProfile,
      ...(this.profile ?? {}),
    };
  }

  get profileInitial(): string {
    const name = this.safeProfile.name?.trim();
    return name ? name.charAt(0).toUpperCase() : 'P';
  }

  submitContactForm(): void {
    console.log('Contact form submitted', this.contactModel);
    alert('Thank you for reaching out! I will get back to you soon.');
    this.contactModel = {
      name: '',
      email: '',
      message: '',
    };
  }
}
