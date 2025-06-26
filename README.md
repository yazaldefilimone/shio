**Smart reactive cache hooks for react**

- automatic caching & revalidation
- dependency-aware invalidation
- zero-config, no providers
- lightweight and intuitive

## install

```bash
npm install shio
```

## usage

```tsx
import { make } from 'shio'
import { useshio } from 'shio/react'

const user = make({
  key: id => `user:${id}`,
  fetcher: id => fetch(`/api/user/${id}`).then(r => r.json()),
})

const { data } = useshio(user, 1)

<h1>{data.name}</h1>
<button onClick={() => user.invalidate(1)}>refresh</button>
```

## with dependencies

```tsx
const posts = make({
  key: id => `user:${id}:posts`,
  fetcher: id => fetch(`/api/user/${id}/posts`).then(r => r.json()),
  dependsOn: id => [user.key(id)],
  ttl: '5m+', // 5 minutes, resets on focus/mouse/keyboard
})

const { data } = useshio(posts, 1)

<ul>{data?.map(p => <li key={p.id}>{p.title}</li>)}</ul>
```

## features

- auto revalidation on focus or interaction
- propagate invalidation to dependent resources
- simple API: `key`, `fetcher`, `dependsOn`
- works out of the box — no context, no setup
