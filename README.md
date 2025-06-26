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
import { createResource } from 'shio'
import { useResource } from 'shio/react'

const user = createResource({
  key: id => `user:${id}`,
  fetcher: id => fetch(`/api/user/${id}`).then(r => r.json()),
})

const { data } = useResource(user, 1)

<h1>{data.name}</h1>
<button onClick={() => user.invalidate(1)}>refresh</button>
```

## with dependencies

```tsx
const posts = createResource({
  key: id => `user:${id}:posts`,
  fetcher: id => fetch(`/api/user/${id}/posts`).then(r => r.json()),
  dependsOn: id => [user.key(id)],
})

const { data } = useResource(posts, 1)

<ul>{data?.map(p => <li key={p.id}>{p.title}</li>)}</ul>
```

## features

- auto revalidation on focus or interaction
- propagate invalidation to dependent resources
- simple API: `key`, `fetcher`, `dependsOn`
- works out of the box — no context, no setup
