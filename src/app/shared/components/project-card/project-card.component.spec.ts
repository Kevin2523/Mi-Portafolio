import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCardComponent } from './project-card.component';
import { Project } from '../../../core/models/project.model';
import { UiStateService } from '../../../core/services/ui-state.service';

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  shortDescription: 'A test project description',
  longDescription: 'A long description of the test project',
  technologies: ['Angular', 'TypeScript', 'Tailwind'],
  role: 'Full-Stack Developer',
  challenges: ['Challenge 1', 'Challenge 2'],
  metrics: [
    { label: 'Performance', value: '95', colorClass: 'text-emerald-600' }
  ],
  screenshots: ['/projects/test.png'],
  liveUrl: 'https://example.com',
  repoUrl: 'https://github.com/test',
  bentoClass: 'md:col-span-1',
  stats: [
    { label: 'Performance', value: '95', colorClass: 'text-emerald-600' }
  ],
  featured: false
};

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;
  let uiStateSpy: jasmine.SpyObj<UiStateService>;

  beforeEach(async () => {
    uiStateSpy = jasmine.createSpyObj('UiStateService', ['openModal']);
    
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
      providers: [
        { provide: UiStateService, useValue: uiStateSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', mockProject);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render project title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Project');
  });

  it('should render project short description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('A test project description');
  });

  it('should render technologies', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).toContain('TypeScript');
    expect(compiled.textContent).toContain('Tailwind');
  });

  it('should render stats', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Performance');
    expect(compiled.textContent).toContain('95');
  });

  it('should have "Ver proyecto" button when liveUrl exists', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Ver proyecto');
  });

  it('should call uiState.openModal when clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('div')!;
    card.click();
    expect(uiStateSpy.openModal).toHaveBeenCalledWith(mockProject);
  });

  it('should have cursor-pointer class', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('div')!;
    expect(card.classList.contains('cursor-pointer')).toBeTrue();
  });

  it('should be accessible with tabindex and role', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('div')!;
    expect(card.getAttribute('tabindex')).toBe('0');
    expect(card.getAttribute('role')).toBe('button');
  });

  it('should have aria-label', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('div')!;
    expect(card.getAttribute('aria-label')).toBe('Ver detalle de Test Project');
  });
});