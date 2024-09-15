[**marksafe**](../README.md) • **Docs**

***

[marksafe](../globals.md) / Marksafe

# Class: Marksafe

The Marksafe singleton class for parsing marksafe text. Text should already be escaped 
and only contain markasfe tag specifies. Text should be the textContent of an 
element so we simply call [Marksafe.process](Marksafe.md#process) with the element to convert the 
textContent to innerHTML.

## Constructors

### new Marksafe()

> **new Marksafe**(): [`Marksafe`](Marksafe.md)

#### Returns

[`Marksafe`](Marksafe.md)

## Properties

### tags

> `static` **tags**: `Set`\<`string`\>

#### Defined in

[marksafe.ts:16](https://github.com/mksunny1/marksafe/blob/2f61835907eca2e5a815bd1c9cba30fd8cc000bf/marksafe.ts#L16)

## Methods

### a()

> `static` **a**(`links`): `void`

Special post-processing for links to set the href and link text.

#### Parameters

• **links**: `HTMLAnchorElement`[]

#### Returns

`void`

#### Defined in

[marksafe.ts:65](https://github.com/mksunny1/marksafe/blob/2f61835907eca2e5a815bd1c9cba30fd8cc000bf/marksafe.ts#L65)

***

### figure()

> `static` **figure**(`figures`): `void`

Special post-processing for images to set the src and optional alt 
and swap the figure elements for img elements.

#### Parameters

• **figures**: `HTMLElement`[]

#### Returns

`void`

#### Defined in

[marksafe.ts:78](https://github.com/mksunny1/marksafe/blob/2f61835907eca2e5a815bd1c9cba30fd8cc000bf/marksafe.ts#L78)

***

### process()

> `static` **process**(`element`): `Element`

Converts the marksafe-formated textContent of the element into HTML. Marksafe is 
simply HTML with no attributes, angle brackets (`< and >`) replaced with square brackets 
(`[ and ]`) and a set of permitted tags.

#### Parameters

• **element**: `Element`

#### Returns

`Element`

#### Example

```ts
import { Marksafe } from 'marksafe'
document.body.innerHTML = `
<main>
  [p]
     This is the first paragraph. &quot;p&quot; tag is allowed
  [/p]
  [p]
      Links like [a]https://github.com/mksunny1/marksafe|this[/a] can be present.
  [/p]
</main>
`
Marksafe.process(document.querySelector('main'));
console.log(document.querySelector('a').textContent);  // this
console.log(document.querySelector('a').href);         // https://github.com/mksunny1/marksafe
```

#### Defined in

[marksafe.ts:45](https://github.com/mksunny1/marksafe/blob/2f61835907eca2e5a815bd1c9cba30fd8cc000bf/marksafe.ts#L45)
