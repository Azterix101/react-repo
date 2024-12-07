import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

global.fetch = jest.fn();
