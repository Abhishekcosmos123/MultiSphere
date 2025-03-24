import { ReactNode } from 'react';
import RootLayout, { metadata } from '../layout';

// Mock the next/font/google module
jest.mock('next/font/google', () => ({
  Geist: jest.fn(() => ({
    variable: 'mocked-geist-sans',
  })),
  Geist_Mono: jest.fn(() => ({
    variable: 'mocked-geist-mono',
  })),
}));

// Test the component's structure without actually rendering
describe('RootLayout', () => {
  it('returns the correct component structure', () => {
    const testChild = 'Test Child';
    const layout = RootLayout({ children: testChild } as { children: ReactNode });
    
    // Check if the returned element is an html element
    expect(layout.type).toBe('html');
    expect(layout.props.lang).toBe('en');
    
    // Check body element
    const body = layout.props.children;
    expect(body.type).toBe('body');
    expect(body.props.className).toContain('mocked-geist-sans');
    expect(body.props.className).toContain('mocked-geist-mono');
    expect(body.props.className).toContain('antialiased');
    
    // Check children
    expect(body.props.children).toBe(testChild);
  });
});

describe('Layout Metadata', () => {
  it('has correct metadata values', () => {
    expect(metadata).toEqual({
      title: 'MultiSphere',
      description: 'Generated by create next app',
    });
  });
});
