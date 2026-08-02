import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render about section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('section#about')).toBeTruthy();
  });

  it('should display "Sobre mí" heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Sobre mí');
  });

  it('should display professional description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Técnico en Desarrollo y Gestión de Software');
    expect(compiled.textContent).toContain('Universidad Tecnológica de Panamá');
  });

  it('should display quick facts', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Proyectos publicados');
    expect(compiled.textContent).toContain('Tecnologías dominadas');
  });

  it('should display info card with personal data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Kevin Mena');
    expect(compiled.textContent).toContain('Full-Stack Developer');
    expect(compiled.textContent).toContain('San Carlos, Panamá');
    expect(compiled.textContent).toContain('UTP Coclé');
  });

  it('should display focus tags', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Web Dev');
    expect(compiled.textContent).toContain('Google Ads');
    expect(compiled.textContent).toContain('IA Security');
  });
});