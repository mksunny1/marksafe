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

Get or set the list of allowed attribute names.

#### Defined in

[marksafe.ts:36](https://github.com/mksunny1/marksafe/blob/11798d2464ec205c737988e946d2d66d290e744b/marksafe.ts#L36)

***

### attrSep

> `static` **attrSep**: `string` = `',,'`

Separator for attributes. Also separates the last attribute from the text content.

#### Defined in

[marksafe.ts:48](https://github.com/mksunny1/marksafe/blob/11798d2464ec205c737988e946d2d66d290e744b/marksafe.ts#L48)

***

### selfTags

> `static` **selfTags**: `Set`\<`string`\>

Get or set the list of self-closing tags like `img` and `br`.

#### Defined in

[marksafe.ts:31](https://github.com/mksunny1/marksafe/blob/11798d2464ec205c737988e946d2d66d290e744b/marksafe.ts#L31)

***

### shorthands

> `static` **shorthands**: `object`

#### \[\*\]

> **\[\*\]**: `string` = `'[strong]'`

#### \[/\*\]

> **\[/\*\]**: `string` = `'[/strong]'`

#### \[/bq\]

> **\[/bq\]**: `string` = `'[/blockquote]'`

#### \[/oli\]

> **\[/oli\]**: `string` = `'[/li][/ol]'`

#### \[/uli\]

> **\[/uli\]**: `string` = `'[/li][/ul]'`

#### \[bq\]

> **\[bq\]**: `string` = `'[blockquote]'`

#### \[oli\]

> **\[oli\]**: `string` = `'[ol][li]'`

#### \[uli\]

> **\[uli\]**: `string` = `'[ul][li]'`

#### Defined in

[marksafe.ts:49](https://github.com/mksunny1/marksafe/blob/11798d2464ec205c737988e946d2d66d290e744b/marksafe.ts#L49)

***

### tags

> `static` **tags**: `Set`\<`string`\>

Get or set the list of allowed tag names.

#### Defined in

[marksafe.ts:22](https://github.com/mksunny1/marksafe/blob/11798d2464ec205c737988e946d2d66d290e744b/marksafe.ts#L22)

***

### tagSep

> `static` **tagSep**: `string` = `';;'`

Separator for consecutive elements of the same type.

#### Defined in

[marksafe.ts:43](https://github.com/mksunny1/marksafe/blob/11798d2464ec205c737988e946d2d66d290e744b/marksafe.ts#L43)

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

The element to process

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

[marksafe.ts:91](https://github.com/mksunny1/marksafe/blob/11798d2464ec205c737988e946d2d66d290e744b/marksafe.ts#L91)

***

### processAttrs()

> `static` **processAttrs**(`element`, `text`): `void`

Processes and xxtracts any attributes specified within the text content of the element.

#### Parameters

• **element**: `Element`

The element to process

• **text**: `string`

The input textContent of the element containing attributes and/or intended textContent.

#### Returns

`void`

#### Defined in

[marksafe.ts:163](https://github.com/mksunny1/marksafe/blob/11798d2464ec205c737988e946d2d66d290e744b/marksafe.ts#L163)

***

### processElement()

> `static` **processElement**(`element`, `top`): `void`

Runs final processing of the elements (recursively from the top down) first to replace any intermediate 
elements with their correct final elements and then to proccess all attributes and remove them from 
the text content where they are specified.

#### Parameters

• **element**: `Element`

The element to process

• **top**: `boolean` = `false`

Whether this is the top-level element.

#### Returns

`void`

#### Defined in

[marksafe.ts:126](https://github.com/mksunny1/marksafe/blob/11798d2464ec205c737988e946d2d66d290e744b/marksafe.ts#L126)

***

### replace()

> `static` **replace**(`text`, `tag`): `string`

Replaces the opening ([tag]) and closing ([/tag]) square brackets for the specified tag in the text 
with the angle brackets. This does not process attributes.

#### Parameters

• **text**: `string`

The raw or partially processed Marksafe text before the tag is processed

• **tag**: `string`

The tag to be processed (converted from Marksafe syntax to HTML syntax)

#### Returns

`string`

The same text with all instances of the tag converted from Marksafe Syntax to HTML syntax

#### Defined in

[marksafe.ts:114](https://github.com/mksunny1/marksafe/blob/11798d2464ec205c737988e946d2d66d290e744b/marksafe.ts#L114)
