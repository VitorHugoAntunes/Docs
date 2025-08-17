export function detectCodeLanguage(code: string): string {
  const trimmedCode = code.trim().toLowerCase();

  if (trimmedCode.startsWith('```java')) return 'java';
  if (trimmedCode.startsWith('```python')) return 'python';
  if (trimmedCode.startsWith('```javascript') || trimmedCode.startsWith('```js')) return 'javascript';
  if (trimmedCode.startsWith('```typescript') || trimmedCode.startsWith('```ts')) return 'typescript';
  if (trimmedCode.startsWith('```ruby')) return 'ruby';
  if (trimmedCode.startsWith('```php')) return 'php';
  if (trimmedCode.startsWith('```c') || trimmedCode.startsWith('```cpp') || trimmedCode.startsWith('```c++')) return 'cpp';

  return 'javascript';
}