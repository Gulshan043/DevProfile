import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isDarkMode = false;

  profileData: any;
  experienceData: any;
  educationData: any;

  constructor(
    private http: HttpClient,
    private meta: Meta,
    private Title: Title
  ) {
    this.setMetaTags();
  }

  setMetaTags() {
    this.Title.setTitle('DevProfile');

    this.meta.updateTag({
      name: 'description',
      content:
        'Professional resume of Gulshan Sethi showcasing skills, experience, and projects.',
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'resume, web developer, Angular, frontend, portfolio',
    });

    this.meta.updateTag({
      name: 'author',
      content: 'Gulshan Sethi',
    });
  }

  ngOnInit() {
    this.http.get('assets/data.json').subscribe((data: any) => {
      this.profileData = data.profile;
      this.experienceData = data.experience;
      this.educationData = data.education;
    });

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      this.isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
    }
    this.applyTheme();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
