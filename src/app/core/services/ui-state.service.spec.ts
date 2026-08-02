import { TestBed } from '@angular/core/testing';
import { UiStateService } from './ui-state.service';

describe('UiStateService', () => {
  let service: UiStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiStateService]
    });
    service = TestBed.inject(UiStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default dark mode true', () => {
    expect(service.isDarkMode()).toBe(true);
  });

  it('should toggle theme', () => {
    const initial = service.isDarkMode();
    service.toggleTheme();
    expect(service.isDarkMode()).toBe(!initial);
  });

  it('should toggle mobile nav', () => {
    expect(service.isMobileNavOpen()).toBe(false);
    service.toggleMobileNav();
    expect(service.isMobileNavOpen()).toBe(true);
    service.toggleMobileNav();
    expect(service.isMobileNavOpen()).toBe(false);
  });

  it('should close mobile nav', () => {
    service.toggleMobileNav();
    service.closeMobileNav();
    expect(service.isMobileNavOpen()).toBe(false);
  });

  it('should set active section', () => {
    service.setActiveSection('projects');
    expect(service.activeSection()).toBe('projects');
  });

  it('should open and close modal', () => {
    const mockProject = { id: 'test' } as any;
    expect(service.isModalOpen()).toBe(false);
    service.openModal(mockProject);
    expect(service.isModalOpen()).toBe(true);
    expect(service.activeModalProject()).toBe(mockProject);
    service.closeModal();
    expect(service.isModalOpen()).toBe(false);
  });

  it('should manage terminal logs', () => {
    expect(service.terminalLogs()).toEqual([]);
    service.addTerminalLog('test log');
    expect(service.terminalLogs()).toEqual(['test log']);
    service.clearTerminal();
    expect(service.terminalLogs()).toEqual([]);
  });

  it('should manage terminal status', () => {
    expect(service.terminalStatus()).toBe('idle');
    service.setTerminalStatus('sending');
    expect(service.terminalStatus()).toBe('sending');
    expect(service.isTerminalSending()).toBe(true);
    service.setTerminalStatus('success');
    expect(service.terminalStatus()).toBe('success');
    expect(service.isTerminalSuccess()).toBe(true);
  });

  it('should have correct theme label', () => {
    expect(service.themeLabel()).toBe('DARK_MODE');
    service.toggleTheme();
    expect(service.themeLabel()).toBe('LIGHT_MODE');
  });
});