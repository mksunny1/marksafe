[**marksafe**](../README.md) • **Docs**

***

[marksafe](../globals.md) / Marksafe

# Class: Marksafe

The Marksafe singleton class for parsing marksafe text. Text should already be escaped 
and only contain markasfe tag specifiers. Text should be the textContent of an 
element so we simply call [Marksafe.process](Marksafe.md#process) with the element to convert the 
textContent to innerHTML.

## Constructors

### new Marksafe()

> **new Marksafe**(): [`Marksafe`](Marksafe.md)

#### Returns

[`Marksafe`](Marksafe.md)

## Properties

### attrs

> `static` **attrs**: `Set`\<`string`\>

#### Defined in

[marksafe.ts:23](https://github.com/mksunny1/marksafe/blob/8e6319b249465de3cc0da1dcef32b91eb097d579/marksafe.ts#L23)

***

### attrSep

> `static` **attrSep**: `string` = `',,'`

#### Defined in

[marksafe.ts:27](https://github.com/mksunny1/marksafe/blob/8e6319b249465de3cc0da1dcef32b91eb097d579/marksafe.ts#L27)

***

### selfTags

> `static` **selfTags**: `Set`\<`string`\>

#### Defined in

[marksafe.ts:22](https://github.com/mksunny1/marksafe/blob/8e6319b249465de3cc0da1dcef32b91eb097d579/marksafe.ts#L22)

***

### tags

> `static` **tags**: `Set`\<`string`\>

#### Defined in

[marksafe.ts:16](https://github.com/mksunny1/marksafe/blob/8e6319b249465de3cc0da1dcef32b91eb097d579/marksafe.ts#L16)

***

### tagSep

> `static` **tagSep**: `string` = `';;'`

#### Defined in

[marksafe.ts:26](https://github.com/mksunny1/marksafe/blob/8e6319b249465de3cc0da1dcef32b91eb097d579/marksafe.ts#L26)

## Methods

### process()

> `static` **process**(`element`): `Element`

Converts the marksafe-formated textContent of the element into HTML. Marksafe is 
simply HTML with attributes specified within the content, angle 
brackets (`< and >`) replaced with square brackets 
(`[ and ]`) and only a set of permitted tags and attributes. 
It also features a tag separator to make the code more concise.

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
      Links like [a]href=https://github.com/mksunny1/marksafe2,,this[/a] can be present.
  ;;
      Yet another paragraph
  ;;
      class=bolder,,And another one with a class attribute...
  [/p]
  [img]
      src=https://images.com/first.png,,alt=First image,,width=100%,,height=200px,,
  [/img]
</main>
`
Marksafe.process(document.querySelector('main'));
console.log(document.querySelector('a').textContent);  // this
console.log(document.querySelector('a').href);         // https://github.com/mksunny1/marksafe2
```

#### Defined in

[marksafe.ts:60](https://github.com/mksunny1/marksafe/blob/8e6319b249465de3cc0da1dcef32b91eb097d579/marksafe.ts#L60)

***

### processAttrs()

> `static` **processAttrs**(`element`, `text`): `void`

#### Parameters

• **element**: `Element`

• **text**: `string`

#### Returns

`void`

#### Defined in

[marksafe.ts:107](https://github.com/mksunny1/marksafe/blob/8e6319b249465de3cc0da1dcef32b91eb097d579/marksafe.ts#L107)

***

### processElement()

> `static` **processElement**(`element`, `top`): `void`

#### Parameters

• **element**: `Element`

• **top**: `boolean` = `false`

#### Returns

`void`

#### Defined in

[marksafe.ts:76](https://github.com/mksunny1/marksafe/blob/8e6319b249465de3cc0da1dcef32b91eb097d579/marksafe.ts#L76)

***

### replace()

> `static` **replace**(`text`, `tag`): `string`

#### Parameters

• **text**: `string`

• **tag**: `string`

#### Returns

`string`

#### Defined in

[marksafe.ts:72](https://github.com/mksunny1/marksafe/blob/8e6319b249465de3cc0da1dcef32b91eb097d579/marksafe.ts#L72)
