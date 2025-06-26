Smart and simple React hooks for data caching and revalidation.

Shio means "salt" in Japanese — small, essential, and powerful.
It provides automatic caching, reactivity, and data dependencies with a minimal API.

With just one hook, you can significantly simplify the data fetching logic in your project. And it also covered in all aspects of speed, correctness, and stability to help you build better experiences:

- **Fast**, **lightweight** and **reusable** data fetching
- Transport and protocol agnostic
- Built-in **cache** and request deduplication
- **Real-time** experience
- Revalidation on focus
- Revalidation on network recovery
- Polling
- Pagination and scroll position recovery
- No provider or config
- TTL with reset on user interaction
- Reactive dependency tracking
- Automatic caching

...and a lot more.

## Quick Start

```ts
import { make } from 'shio'
import { useShio } from 'shio/react'

const user = make({
  key: id => `user:${id}`,
  fetcher: id => fetch(`/api/user/${id}`).then(r => r.json()),
})

const { data } = useShio(user, 1)

<h1>{data.name}</h1>
<button onClick={() => user.invalidate(1)}>refresh</button>
```

## Dependencies

```ts
const posts = make({
  key: id => `user:${id}:posts`,
  fetcher: id => fetch(`/api/user/${id}/posts`).then(r => r.json()),
  dependsOn: id => [user.key(id)],
})

const { data } = useShio(posts, 1)

<ul>{data?.map(p => <li key={p.id}>{p.title}</li>)}</ul>
```

To manually refresh the user (and all resources depending on it):

```ts
user.invalidate(1);
```

TTL in Shio defines how long cached data stays fresh, with optional reset on user activity (+ suffix).

```ts
const user = make({
  key: (id) => `user:${id}`,
  fetcher: (id) => fetch(`/api/user/${id}`).then((r) => r.json()),
  ttl: "5m+", // cache for 5 minutes, reset if user interacts
});
```

TTL values:

- `'10s'` – 10 seconds
- `'5m+'` – 5 minutes, resets on click, focus, etc
- `0` – no cache
- `number` – milliseconds

## unified api for fetch and mutate

define fetching and mutating on same resource

```ts
const user = make({
  key: (id) => `user:${id}`,
  fetcher: (id) => fetch(`/api/user/${id}`).then((r) => r.json()),
  mutate: (id) => fetch(`/api/user/${id}`, { method: "DELETE" }),
  dependsOn: (id) => [user.key(id)],
});
```

inside react:

```tsx
function profile({ id }: { id: number }) {
  const { data, loading } = useShio(user, id);

  async function onDelete() {
    await user.mutate(id);
    user.invalidate(id);
  }

  if (loading) return <p>loading...</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <button onClick={onDelete}>delete</button>
    </div>
  );
}
```

outside react:

```ts
await user.fetch(5);
await user.mutate(5);
user.invalidate(5);
```

methods:

- `fetch(arg)` — fetch data and cache
- `mutate(arg)` — run mutation and invalidate cache
- `invalidate(arg)` — clear cache and revalidate
